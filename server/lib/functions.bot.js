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
        const token = await jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1m'})
        return token
    } catch(e) {
        return null
    }
}

const verifyToken = token => {
    let dataUser = null
    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if(err) dataUser = 'SessionExpired'
            else {
                dataUser = data
            }
        })
    } catch(e) {
        dataUser = null
    }
    return dataUser
}


const getUsers = async (query="") => {
    if(query === "") {
        const users = await UserModel.find().exec()
        return users
    } else {
        const user = await UserModel.findOne({ email: query, role: 'Admin' }).exec()
        return user
    }
}

const sendMessageToAdmins = msg => {
    try {
        const accessToken = require('../accessToke.bot.json')
        if(accessToken.length !== 0) {
            accessToken.forEach(({token}) => {
                const from = verifyToken(token).userFrom
                sendMessage(from, msg)
            })
        }
    } catch(e) {
        console.log('Error')
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

const generateAccessCode = async data => {
    let role, workAreas
    const roles = {admin: 'Admin', user: 'User'}
    const workAreasArr = [
        'Office',
        'SecretaryToTheDirector', 
        'Schoolchildren', 
        'PromotionAndLiaison', 
        'AdministrativeResources', 
        'Injunction', 
        'Prefecture', 
        'SocialWork', 
        'TechnicalTraining', 
        'Library', 
        'Quality', 
        'Infrastructure', 
        'Computing',
    ]
    const dataArr= data.split(' ')
    dataArr.shift()
    try {
        if(dataArr.length === 2) {
            const index = parseInt(dataArr[0])
            if(index <= 0 || index >= 14 || isNaN(index)) return 'workAreaInvalid'
            workAreas = [workAreasArr[(index - 1)]]
            if(roles[dataArr[1].toLowerCase()] === undefined) return 'roleInvalid'
            role = roles[dataArr[1].toLowerCase()]
            if(role === 'Admin') workAreas.push('Users')
        } else if(dataArr.length === 3) {
            const index1 = parseInt(dataArr[0])
            const index2 = parseInt(dataArr[1])
            if(index1 <= 0 || index1 >= 14 || isNaN(index1) || index2 <= 0 || index2 >= 14 || isNaN(index2)) return 'workAreaInvalid'
            workAreas = [workAreasArr[(index1 - 1)], workAreasArr[(index2 - 1)]]
            if(roles[dataArr[2].toLowerCase()] === undefined) return 'roleInvalid'
            role = roles[dataArr[2].toLowerCase()]
            if(role === 'Admin') workAreas.push('Users')
        } else return 'commandInvalid'
        console.log(workAreas, role)
        const accessCode = await jwt.sign({workAreas, role}, process.env.SECRET_KEY, {expiresIn: '1d'})
        const urlAccessCode = `http://localhost:3000/auth?accessCode=${accessCode}`
        return [accessCode, urlAccessCode]
    }  catch(e) {
        return 'commandInvalid'
    }
}

module.exports = {
    generateToken,
    verifyToken,
    getUsers,
    sendMessage,
    sendMessageMedia,
    sendMessageToAdmins,
    saveUsers,
    generateAccessCode
}