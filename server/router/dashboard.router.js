const router = require('express').Router()
const { verifyToken } = require('../lib/functions')
const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer')
const { v4: uuid } = require('uuid')
const { unlink } = require('fs-extra')
const UserModel = require('../model/User.model')
const PostModel = require('../model/Post.model')

const storageProfilePicture = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets', 'profilePicture'))
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}.jpg`)
    },
})

const storagePosts = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets', 'postFiles'))
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}.${file.originalname.split('.').reverse()[0]}`)
    }
})

const uploadPictureProfile = multer({ storage: storageProfilePicture })
const uploadPosts = multer({ storage: storagePosts })

router.get('/posts/:workArea', async (req, res) => {
    const workArea = req.params.workArea
    const posts = await PostModel.find({ workArea }).exec()
    res.json(posts)
})

router.get('/users', async (req, res) => {
    const users = await UserModel.find().exec()
    res.json(users)
})

router.get('/postFile/:file', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets', 'postFiles', `${req.params.file}`))
})

router.post('/newPost', verifyToken, uploadPosts.single('fileObj'), async (req, res) => {
    const { title, workArea, description, fileName, fileSize } = req.body
    const newPost = new PostModel({
        title,
        workArea,
        urlFile: `http://localhost:3007/dashboard/postFile/${req.file.filename}`,
        filePath: req.file.path,
        fileName,
        fileSize,
        description
    })
    try {
        await newPost.save()
        res.json({server: 'PostCreated'}).status(200)
    } catch(e) {
        res.json({server: 'PostNotCreated'}).status(200)
    }
})

router.delete('/deletePostFile/:id', verifyToken, async (req, res) => {
    const id = req.params.id
    const filePath = await (await PostModel.findOne({_id: id}).exec()).filePath
    await unlink(filePath)
    const deleteUser = await PostModel.deleteOne({_id: id}).exec()
    if(deleteUser.ok === 1) res.json({server: 'PostDeleted'}).status(200)
    else res.json({server: 'PostNotDeleted'}).status(200)
})

router.get('/profilePicture/:img', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets', 'profilePicture', `${req.params.img}`))
})

router.put('/updatePhoto/:id', verifyToken, uploadPictureProfile.single('profilePicture'), async (req, res) => {
    const userId = req.params.id
    const exp = /jpg|jpeg|png|ico/
    const type = req.file.originalname.split('.')[1]
    if(exp.test(type)){
        const user = await UserModel.findOne({_id: userId}).exec()
            if(user !== null) {
                if(user.profilePicture !== 'icon' && user.pathProfilePicture !== 'icon') await unlink(user.pathProfilePicture)
                try {
                    const update = await UserModel.update({_id: userId}, { profilePicture: `http://localhost:3007/dashboard/profilePicture/${req.file.filename}`, pathProfilePicture: req.file.path }).exec()
                    if(update.ok === 1) res.json({server: 'profilePictureUpdate', url: `http://localhost:3007/dashboard/profilePicture/${req.file.filename}`}).status(200)
                    else res.json({server: 'profilePictureNotUpdate'}).status(200)
                } catch(e) {
                    res.json({server: 'profilePictureNotUpdate'}).status(200)
                }
            }
    } else res.json({server: 'profilePictureNotValid'}).status(200)
})

router.put('/blockUser/:id', verifyToken, async (req, res) => {
    const { block } = req.body 
    const id = req.params.id
    const update = await UserModel.update({ _id: id }, { block: block }).exec()
    if(update.ok === 1) res.json({server: 'BlockUser'}).status(200)
    else res.json({server: 'BlockNotUser'}).status(200)
})

router.delete('/deleteUser/:id', verifyToken, async (req, res) => {
    const id = req.params.id
    const path = await (await UserModel.findOne({_id: id}).exec()).pathProfilePicture
    if(path !== 'icon') await unlink(path)
    const deleteUser = await UserModel.deleteOne({_id: id}).exec()
    if(deleteUser.ok === 1) res.json({server: 'UserDeleted'}).status(200)
    else res.json({server: 'UserNotDeleted'}).status(200)
})

router.post('/accessCode', async (req, res) => {
    const { workArea, twoWorkArea, role } = req.body
    let worksArea = [workArea]
    if(twoWorkArea !== "") worksArea = [workArea, twoWorkArea]
    if(role === "Admin") worksArea.push("Users")
    try {
        const accessCode = await jwt.sign({worksArea, role}, process.env.SECRET_KEY, {expiresIn: '1d'})
        res.json({server: 'AccessCodeCreate', accessCode, worksArea}).status(200)
    } catch(e) {
        res.json({server: 'AccessCodeNotCreate'}).status(200)
    }
})


module.exports = router