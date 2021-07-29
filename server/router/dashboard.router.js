const router = require('express').Router()
const { verifyToken } = require('../lib/functions')
const path = require('path')
const multer = require('multer')
const { v4: uuid } = require('uuid')
const { unlink } = require('fs-extra')
const UserModel = require('../model/User.model')

router.get('/:img', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets', 'img', 'profilePicture', `${req.params.img}`))
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets', 'img', 'profilePicture'))
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}.jpg`)
    },
})

const upload = multer({ storage: storage })

router.put('/updatePhoto/:id', verifyToken, upload.single('profilePicture'), async (req, res) => {
    const userId = req.params.id
    const exp = /jpg|jpeg|png|ico/
    const type = req.file.originalname.split('.')[1]
    if(exp.test(type)){
        const user = await UserModel.findOne({_id: userId}).exec()
            if(user !== null) {
                if(user.profilePicture !== 'icon' && user.pathProfilePicture !== 'icon'){
                   try {
                        await unlink(user.pathProfilePicture)
                        const update = await UserModel.update({_id: userId}, { profilePicture: `http://localhost:3007/dashboard/${req.file.filename}`, pathProfilePicture: req.file.path }).exec()
                        if(update.ok === 1) res.json({server: 'profilePictureUpdate', url: `http://localhost:3007/dashboard/${req.file.filename}`}).status(200)
                        else res.json({server: 'profilePictureNotUpdate'}).status(200)
                   } catch(e) {
                        res.json({server: 'profilePictureNotUpdate'}).status(200)
                   }
                } else {
                    const update = await UserModel.update({_id: userId}, { profilePicture: `http://localhost:3007/dashboard/${req.file.filename}`, pathProfilePicture: req.file.path }).exec()
                    if(update.ok === 1) res.json({server: 'profilePictureUpdate', url: `http://localhost:3007/dashboard/${req.file.filename}`}).status(200)
                    else res.json({server: 'profilePictureNotUpdate'}).status(200)
                }
            } else res.json({server: 'UserNotExist'}).status(200)
    } else res.json({server: 'profilePictureNotValid'}).status(200)
})

// 

module.exports = router