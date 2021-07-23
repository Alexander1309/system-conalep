const { Schema, model } = require('mongoose')

const UserModel = new model('Users', new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workArea: { type: String, required: true },
    role: { type: String, required: true },
    registeredOn: { type: Date, default: Date.now, required: true }
}))

module.exports = UserModel