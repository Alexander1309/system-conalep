const router = require('express').Router()
const UserModel = require('../model/User.model')
const jwt = require('jsonwebtoken')
const { encryptPassword, verifyPassword } = require('../lib/functions')
require('dotenv').config()

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email }).exec()
    if(user !== null) {
        const verifyPass = await verifyPassword(password, user.password)
        if(verifyPass) {
                if(!user.block) {
                    try {
                        const token = await jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '1d'})
                        res.json({
                            server: 'UserExist',
                            token,
                            dataUser: {
                                id: user._id,
                                name: `${user.name} ${user.lastName}`,
                                email: user.email,
                                workArea: user.workArea,
                                role: user.role,
                                profilePicture: user.profilePicture,
                                registeredOn: user.registeredOn
                            }
                        })
                    } catch(e) {
                        res.json({server: 'UserNotExist'}).status(200)
                    }
                } else res.json({server: 'BlockedUser'}).status(200)
            } else res.json({server: 'UserNotExist'}).status(200)
    } else res.json({server: 'UserNotExist'}).status(200)
    
})

router.post('/signUp', async (req, res) => {
    const { name, lastName, email, password, accessCode } = req.body
    try {
        const { workArea, role } = await jwt.verify(accessCode, process.env.SECRET_KEY)
        if(workArea !== undefined && role !== undefined) {
            const newUser = new UserModel({
                name,
                lastName,
                email,
                password: await encryptPassword(password),
                workArea,
                role,
            })
            try {
                await newUser.save()
                res.json({server: 'UserCreated'}).status(200)
            } catch(e) {
                res.json({server: 'UserNotCreated'}).status(200)
            }
        } else res.json({server: 'InvalidCode'}).status(200)
    } catch(e) {
        res.json({server: 'InvalidCode'}).status(200)
    }
})

module.exports = router