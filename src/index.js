const dotenv = require('dotenv')

const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const app = express()

dotenv.config()

console.log(process.env.MONGO_URL)

//Database setup
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function(err){
    if(err) console.log('connection error: ', err)
    else{ console.log("mongodb connection successful")}
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(require('./routes'))

app.listen(process.env.PORT || 3001)