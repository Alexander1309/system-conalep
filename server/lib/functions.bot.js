const { MessageMedia } = require('whatsapp-web.js')
const client = require('../bot.setting')
const fs = require('fs')
const excel = require('exceljs')
const jwt = require('jsonwebtoken')
const path = require('path')
const UserModel = require('../model/User.model')
require('dotenv').config()

const generateToken = async data => {
    try {
        const token = await jwt.sign(data, process.env.SECRET_KEY)
        return token
    } catch(e) {
        return null
    }
}

const verifyToken = token => {
    let dataUser = null
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if(err) dataUser = null
            else {
                dataUser = data
            }
        })
    } catch(e) {
        dataUser = null
    }
    return dataUser
}


const getUsers = async (query = "") => {
    if(query === "") {
        const users = await UserModel.find().exec()
        return users
    } else {
        const user = await UserModel.findOne({ email: query, role: 'Admin' }).exec()
        return user
    }
}

const sendMessage = (from, msg) => {
    client.sendMessage(from, msg)
}

const sendMessageMedia = async (from, nameFile) => {
    client.sendMessage(from, `*Cargando...*
Esto podria tardar unos minutos🕖`)
    const filePath = path.join(__dirname, '../assets', 'archives', nameFile)
    setTimeout( async () => {
        if(fs.existsSync(filePath)){
            const media = await MessageMedia.fromFilePath(filePath)
            client.sendMessage(from, media)
        } else console.log('file no existe')
    }, 1000)
}

const saveUsers = users => {
    const pathUsers = path.join(__dirname, '../assets', 'archives', `users.xlsx`)
    const workbook = new excel.Workbook()

    if(fs.existsSync(pathUsers)){
       fs.unlinkSync(pathUsers)
    }
    const worksheet = workbook.addWorksheet('Users')
        worksheet.columns = [
            {header:'Id User', key: 'id'},
            {header:'Name', key: 'name'},
            {header:'Last Name', key: 'lastName'},
            {header:'Email', key: 'email'},
            {header:'Role', key: 'role'},
        ]

        users.map(user => worksheet.addRow({id: user._id, name: user.name, lastName: user.lastName, email: user.email, role: user.role}))
        workbook.xlsx.writeFile(pathUsers)
        .then(() => {
            console.log('Users save')
        })
        .catch(() => {
            console.log('Users not save')
        })
}

module.exports = {
    generateToken,
    verifyToken,
    getUsers,
    sendMessage,
    sendMessageMedia,
    saveUsers
}