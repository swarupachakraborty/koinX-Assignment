const express = require('express')
const { default: mongoose } = require('mongoose')
const router = require('./src/routers/router')
const port = process.env.PORT || 3000

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://firstDB:zwPu7dwJG0RCXU9f@cluster0.kgij2.mongodb.net/koinx')
    .then(o => console.log('✅ Mongoose, MongoDb connected successfully!'))
    .catch(e => console.log('⚠️ ', e.message))

app.use('/', router)

app.listen(port, (e) => {
    if (e) return console.log('⚠️ ', e.message)
    return console.log('✅ Server connected successfully!')
})

