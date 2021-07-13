const express = require('express')
const Mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT
const connection = Mongoose.connection
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

Mongoose.connect(process.env.DB_CONEXION, { useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
connection.on('error', () => console.log('An error occurred while connecting the database...'))
connection.once('open', () => console.log('Donnected database...'))

app.get('/', (req, res) => {
    res.send(`Server run on port -> ${port}`)
})

app.listen(port, () => console.log(`Server run on port -> ${port}`))