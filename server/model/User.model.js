const { Schema, model } = require('mongoose')

const UserModel = new model('Users', new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    workArea: { type: [String], required: true },
    role: { type: String, required: true },
    profilePicture: { type: String, default: 'icon' },
    pathProfilePicture: { type: String, default: 'icon'},
    block: { type: Boolean, default: false },
    registeredOn: { type: Date, default: Date.now, required: true }
}))

module.exports = UserModel