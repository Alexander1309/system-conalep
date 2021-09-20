const fs = require('fs')
const path = require('path')
const qrCode = require('qrcode-terminal')
const { Client } = require('whatsapp-web.js')

const SESSION_FILE_PATH = path.join(__dirname, 'session.bot.json')
let sessionData

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH) 
}

const client = new Client({
    puppeteer: {
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    },
    session: sessionData
})

client.on('qr', qr => qrCode.generate(qr, { small: true }))

client.on('authenticated', session => {
    sessionData = session
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), err => err ? console.log(err) : '')
})

client.on('auth_failure', err => console.log(err))

client.on('ready', () => console.log('Bot is ready!'))

client.initialize()

module.exports = client