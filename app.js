var cors = require('cors');
var createError = require('http-errors')
var express = require('express')
var bodyParser = require('body-parser');
var path = require('path')
var morgan = require('morgan')

const model = require('./models/index')

model.sequelize.sync().then(() => {
    console.log("success connect DB")
}).catch( err => {
    console.log("fail connect DB")
    console.log(err)
})

var app = express()

// 미들웨어 
app.use(cors())
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

var userRouter = require('./route/user')
var todoRouter = require('./route/todo')

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.listen(8282, () => {
    console.log('Server running with 8282')
})