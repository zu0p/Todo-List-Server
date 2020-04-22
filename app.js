var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var userRouter = require('./route/user.js');
var todoRouter = require('./route/todo.js');
var mypageRouter = require('./route/mypage.js');

app.use(express.json());    //request body를 사용하기 위ㅏㅁ
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.use('/mypage', mypageRouter);

app.listen(8282, function(){
    console.log("Server starting with 8282");
});