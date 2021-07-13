const bcryptjs = require('bcryptjs')
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

module.exports = functions