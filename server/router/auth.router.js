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
            try {
                const token = await jwt.sign({user}, process.env.SECRET_KEY)
                res.json({
                    server: 'UserExist',
                    token,
                    dataUser: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                })
            } catch(e) {
                res.json({server: 'UserNotExist'}).status(200)
            }
        } else res.json({server: 'UserNotExist'}).status(200)
    } else res.json({server: 'UserNotExist'}).status(200)
    
})

router.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body
    const newUser = new UserModel({name, email, password: await encryptPassword(password)})
    try {
        await newUser.save()
        res.json({server: 'UserCreated'}).status(200)
    } catch(e) {
        res.json({server: 'UserNotCreated'}).status(200)
    }
})

module.exports = router