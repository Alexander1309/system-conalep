const client = require('./bot.setting')
const fs = require('fs')
const { sendMessage, sendMessageMedia, getUsers, saveUsers, generateToken, verifyToken } = require('./lib/functions.bot')

const ACCESS_TOKEN = './accessToke.bot.json'
let sessions = require(ACCESS_TOKEN)

const verifyIsAuth = query => {
    const existUser = sessions.find(session => session.key === query)
    if(existUser === undefined) return null
    const data = verifyToken(existUser.token)
    if(data === null) return null
    return data
}

const sendMsgStart = (from, session=false) => {
    const msgNotSession = `-----------------------------------------------------------
                            *Sign In* 
-----------------------------------------------------------
1: /signIng <correo>
-----------------------------------------------------------
*⚠¡Advertencia por favor escriba los comando tal y como se muestran en las opciones!⚠*
`

    const msgStart = `-----------------------------------------------------------
                        *Comandos* 
-----------------------------------------------------------
1: /getUsers
2: /getBlockedUsers
3: /getCountUsers
4: /getPosts
5: /getCountPosts
6: /logOut
-----------------------------------------------------------
*⚠¡Advertencia por favor escriba los comando tal y como se muestran en las opciones!⚠*
`
sendMessage(from, session ? msgStart : msgNotSession)
}

client.on('message', async msg => {
    const { from, body } = msg
    const key = from.split('@')[0].substr(8, 4)
    let isAuth = verifyIsAuth(key) !== null ? true : false
    switch(body.split(' ')[0]) {
        case '/signIn':
            if(!isAuth) {
                const user = await getUsers(body.split(' ')[1])
                if(user !== null){
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
                            sendMsgStart(from, isAuth)
                        }, 3000)
                    } else {
                        sendMessage(from, '*Servidor no responde intentelo mas tarde😢*')
                        setTimeout(() => {
                            sendMsgStart(from, isAuth)
                        }, 3000)
                    }
                } else {
                    sendMessage(from, '*❌ Correo invalido intente con otro*')
                    setTimeout(() => {
                        sendMsgStart(from, isAuth)
                    }, 3000)
                }
            } else {
                sendMessage(from, '*Ya haz iniciado sesion😊*')
                setTimeout(() => {
                    sendMsgStart(from, isAuth)
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
                    sendMsgStart(from, isAuth)
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
                    sendMsgStart(from, isAuth)
                }, 3000)
            } else {
                sendMessage(from, '*⚠ No haz iniciado sesion*')
                setTimeout(() => {
                    sendMsgStart(from, isAuth)
                }, 3000)
            }
        break

        default: 
            sendMsgStart(from, isAuth)
        break
    }
})