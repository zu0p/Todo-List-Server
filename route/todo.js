var express = require("express")
var router = express.Router()
var models = require("../models")
var util = require("../util")
var jwt = require("jsonwebtoken")

router.get('/show_todo_list', function(req, res, next){
    /*
      url         : ~/todo/show_todo_list
      method      : get
      input       : -
      output      : todo list
      description : todo list 목록 불러오기
    */

    var token = req.headers['x-access-token'] || req.query.token
    var result_jwt = util.verifyJWT(token)
    var decord = ''

    if(result_jwt.success){
        decord = result_jwt.result;
    }
    else{
        return res.json(util.successFalse(result_jwt.result, 'token 검증 실패'))
    }

    models.todo.findAll({
        attributes: [ 'id', 'user_id', 'contents', 'is_completed', 'is_deleted'],
        where: {user_id: decode.user_id}
    })
    .then(result => {
        res.json(util.successTrue(result))
    })
    .catch(err => {
        res.json(util.successFalse(err))
    })
});

router.put('/create_todo', function(req, res){
    /*
      url         : ~/todo/create_todo
      method      : put
      input       : body - contents(todo 내용)
      output      : success / err
      description : 할일 추가
    */

    var token = req.headers['x-access-token'] || req.query.token
    var result_jwt = util.verifyJWT(token)
    var decord = ''

    if(result_jwt.success){
        decord = result_jwt.result
    }
    else {
        return res.json(util.successFalse(result_jwt.result, 'token 검증 실패'))
    }

    var body = req.body

    models.todo.create({
        user_id: decode.user_id,
        contents: body.contents,
        is_completed: 0,
        is_deleted: 0
    })
    .then(result => {
        res.json(util.successTrue())
    })
    .then(err => {
        res.json(util.successFalse(err))
    })
});

router.post('/update_todo', function(req, res, next){
    /*
      url         : ~/todo/update_todo
      method      : post
      input       : body - contents(todo 수정 내용), todo의 id
      output      : success / err
      description : 할일 수정
    */
    var token = req.headers['x-access-token'] || req.query.token
    var result_jwt = util.verifyJWT(token)
    var decord = ''

    if(result_jwt.success){
        decord = result_jwt.result
    }
    else {
        return res.json(util.successFalse(result_jwt.result, 'token 검증 실패'))
    }

    var body = req.body

    models.todo.update({
        contents: body.contents
    },{
        where: {
            user_id: decode.user_id,
            id: body.id
        }
    })
    .then(result => {
        res.json(util.successTrue())
    })
    .then(err => {
        res.json(util.successFalse(err))
    })
});

router.post('/complete_todo', function(req, res){
    /*
      url         : ~/todo/complete_todo
      method      : post
      input       : body - id(todo_id)
      output      : success / err
      description : todos table에 id가 id인 것을 완료체크
    */
   var token = req.headers['x-access-token'] || req.query.token
   var result_jwt = util.verifyJWT(token)
   var decord = ''

   if(result_jwt.success){
       decord = result_jwt.result
   }
   else {
       return res.json(util.successFalse(result_jwt.result, 'token 검증 실패'))
   }

   models.todo.update({
       is_completed: 1
   },{
       where: {
           user_id: decode.user_id,
           id: req.body.id
        }
   })
   .then(result => {
       res.json(util.successTrue())
   })
   .then(err => {
       res.json(util.successFalse(err))
   })
});

//todo 완료 취소
router.post('/uncomplete_todo', function(req, res){
    /*
      url         : ~/todo/uncomplete_todo
      method      : post
      input       : body - id(todo_id)
      output      : success / err
      description : todos table에 id가 id인 것을 완료체크 해제
    */
   var token = req.headers['x-access-token'] || req.query.token
   var result_jwt = util.verifyJWT(token)
   var decord = ''

   if(result_jwt.success){
       decord = result_jwt.result
   }
   else {
       return res.json(util.successFalse(result_jwt.result, 'token 검증 실패'))
   }

   models.todo.update({
       is_completed: 0
   },{
       where: {
           user_id: decode.user_id,
           id: req.body.id
        }
   })
   .then(result => {
       res.json(util.successTrue())
   })
   .then(err => {
       res.json(util.successFalse(err))
   })
});

//todo 지우기
router.post('/delete_todo', function(req, res){
    /*
      url         : ~/todo/delete_todo
      method      : post
      input       : body - id(todo_id)
      output      : success / err
      description : todos table에 id가 id인 것을 삭제(체크만)
    */
   var token = req.headers['x-access-token'] || req.query.token
   var result_jwt = util.verifyJWT(token)
   var decord = ''

   if(result_jwt.success){
       decord = result_jwt.result
   }
   else {
       return res.json(util.successFalse(result_jwt.result, 'token 검증 실패'))
   }

   models.todo.update({
       is_deleted: 1
   },{
       where: {
           user_id: decode.user_id,
           id: req.body.id
        }
   })
   .then(result => {
       res.json(util.successTrue())
   })
   .then(err => {
       res.json(util.successFalse(err))
   })
});

module.exports = router;