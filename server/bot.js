const client = require('./bot.setting')
const fs = require('fs')
const { verifyPassword } = require('./lib/functions')
const { sendMessage, sendMessageMedia, getUsers, saveUsers, generateToken, verifyToken, generateAccessCode } = require('./lib/functions.bot')
const { msgNotSession, msgStart, msgCountUsers, msgGenAccessCode } = require('./messages.bot')

const ACCESS_TOKEN = './accessToke.bot.json'
let sessions = require(ACCESS_TOKEN)

const verifyIsAuth = (key, from) => {
    const existUser = sessions.find(session => session.key === key)
    if(existUser === undefined) return null
    const data = verifyToken(existUser.token)
    if(data === null) return null
    else if(data === 'SessionExpired') {
        const index = sessions.findIndex(session => session.key === key)
        sessions.splice(index, 1)
        fs.writeFile(ACCESS_TOKEN, JSON.stringify(sessions), err => {
            if(err) console.log('Error al guardar la session')
        })
        sessions = require(ACCESS_TOKEN)
        sendMessage(from, '*⚠ Sesion expirada, por favor inicie sesion de nuevo*')
        return null
    }
    return data
}

client.on('message', async msg => {
    const { from, body } = msg
    const key = from.split('@')[0].substr(8, 4)
    let isAuth = verifyIsAuth(key, from) !== null ? true : false
    switch(body.split(' ')[0]) {
        case '/signIn':
            if(!isAuth) {
                const user = await getUsers(body.split(' ')[1])
                if(user !== null){
                    if(!user.block) {
                        const verifyPass = await verifyPassword(body.split(' ')[2], user.password)
                        if(verifyPass) {
                            const data = { ...user._doc, userFrom: from }
                            const token = await generateToken(data)
                            if(token !== null) {
                                const sessionData = { key, token }
                                sessions.push(sessionData)
                                fs.writeFile(ACCESS_TOKEN, JSON.stringify(sessions), err => {
                                    if(err) console.log('Error al guardar la session')
                                })
                                isAuth = verifyIsAuth(key) !== null ? true : false
                                sendMessage(from, '*✅ Sesion iniciada con exito*')
                                setTimeout(() => {
                                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                                }, 3000)
                            } else {
                                sendMessage(from, '*Servidor no responde intentelo mas tarde😢*')
                                setTimeout(() => {
                                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                                }, 3000)
                            }
                        } else {
                            sendMessage(from, '*❌ Correo o Contraseña invalida intente de nuevo*')
                            setTimeout(() => {
                                sendMessage(from, isAuth ? msgStart : msgNotSession)
                            }, 3000)
                        }
                    } else {
                        sendMessage(from, '*⚠ Usuario bloqueado, si crees que es un error comuniquese con otro administrador*')
                        setTimeout(() => {
                            sendMessage(from, isAuth ? msgStart : msgNotSession)
                        }, 3000)
                    }
                } else {
                    sendMessage(from, '*❌ Correo o Contraseña invalida intente de nuevo*')
                    setTimeout(() => {
                        sendMessage(from, isAuth ? msgStart : msgNotSession)
                    }, 3000)
                }
            } else {
                sendMessage(from, '*Ya haz iniciado sesion😊*')
                setTimeout(() => {
                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                }, 3000)
            }
        break

        case '/getUsers':
            if(isAuth) {
                const users = await getUsers()
                await saveUsers(users)
                await sendMessageMedia(from, 'users.xlsx')
            } else {
                sendMessage(from, '*⚠ No haz iniciado sesion*')
                setTimeout(() => {
                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                }, 3000)
            }
        break

        case '/countUsers': 
            if(isAuth) {
                const users = await getUsers()
                if(users !== null) {
                   sendMessage(from, msgCountUsers(users))
                } else {
                    sendMessage(from, '*No hay usuarios registrados😟 *')
                    setTimeout(() => {
                        sendMessage(from, isAuth ? msgStart : msgNotSession)
                    }, 3000)
                }
            } else {
                sendMessage(from, '*⚠ No haz iniciado sesion*')
                setTimeout(() => {
                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                }, 3000)
            }
        break

        case '/genAccessCode':
            if(isAuth) {
                if(body.split(' ').length === 1){
                    sendMessage(from, msgGenAccessCode)
                } else {
                    const token = await generateAccessCode(body)
                    if(token === 'workAreaInvalid') sendMessage(from, '❌ Areas de trabajo invalida')
                    else if(token === 'roleInvalid') sendMessage(from, '❌ Rol invalido *"user"* o *"admin"*')
                    else if(token === 'commandInvalid') sendMessage(from, '❌ Comando invalido por favor verifique el comando')
                    else {
                        sendMessage(from, `*Generando AccessCode...*
                        Esto podria tardar unos minutos🕖`)
                        sendMessage(from, '*Access Code*')
                        sendMessage(from, token[0])
                        sendMessage(from, '*Url Access Code*')
                        sendMessage(from, token[1])
                    }
                }
            } else {
                sendMessage(from, '*⚠ No haz iniciado sesion*')
                setTimeout(() => {
                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                }, 3000)
            }
        break

        case '/logOut':
            if(isAuth) {
                const index = sessions.findIndex(session => session.key === key)
                sessions.splice(index, 1)
                fs.writeFile(ACCESS_TOKEN, JSON.stringify(sessions), err => {
                    if(err) console.log('Error al guardar la session')
                })
                sessions = require(ACCESS_TOKEN)
                isAuth = verifyIsAuth(key) !== null ? true : false
                sendMessage(from, '*✅ Sesion cerrada con exito*')
                setTimeout(() => {
                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                }, 3000)
            } else {
                sendMessage(from, '*⚠ No haz iniciado sesion*')
                setTimeout(() => {
                    sendMessage(from, isAuth ? msgStart : msgNotSession)
                }, 3000)
            }
        break

        default: 
            sendMessage(from, isAuth ? msgStart : msgNotSession)
        break
    }
})