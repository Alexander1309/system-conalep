const express = require('express')
const Mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const authRouter = require('./router/auth.router')

require('dotenv').config()
const port = process.env.PORT || 3007
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

app.use('/auth/', authRouter)

app.listen(port, () => console.log(`Server run on port -> ${port}`))