const { Schema, model } = require('mongoose')

const PostModel = new model('posts', new Schema({
    title: { type: String, required: true },
    workArea:{ type: String, required: true },
    urlFile: { type: String, required: true },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
    fileSize: { type: String, required: true },
    description: { type: String, required: true },
    created_on: { type: Date, default: Date.now, required: true }
}))

module.exports = PostModel