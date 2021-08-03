const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const functions = {}

functions.encryptPassword = async password => {
    try {
        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(password, salt)
        return hash
    } catch(e) {
        console.log('Error encrypt password...')
    }
}

functions.verifyPassword = async (password, hash) => {
    try {
        const verifyPass = await bcryptjs.compare(password, hash)
        return verifyPass
    } catch(e) {
        console.log('Error encrypt password...')
    }
}

functions.verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1]
        if(token !== undefined){
            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if(err) res.json({server: 'SessionExpired'}).status(403)
                else {
                    req.dataUser = data.user
                    next()
                }
            })
        } else {
            res.json({server: 'SessionExpired'}).status(409)
        }
    } catch(e) {
        res.senStatus(409)
    }
}

functions.getDate = () =>{
    try {
        const newDate = new Date()
        const day = newDate.getDay() + 7
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        const date = `${day}-${month}-${year}`
        return date
    } catch(e) {
        console.log(e)
    }
}

module.exports = functions