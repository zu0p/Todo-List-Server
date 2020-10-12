var express = require("express")
var router = express.Router()
var models = require("../models")
var util = require("../util")
var jwt = require("jsonwebtoken")

router.post("/signup", (req, res, next)=>{
    /*
      url         : ~/user/signup
      method      : post
      input       : body  - id(userid), pw(user pw)
      output      : success / err
      description : 회원 가입
     */

    var body = req.body

    models.user.create({
      user_id: body.id,
      user_pw: body.pw
    })
    .then( result => {
      res.json(util.successTrue())
    })
    .catch( err => {
      res.json(util.successFalse(err))
    })
});


router.post("/check_id_duplication", (req, res, next)=>{
    /*
      url         : ~/user/check_id_duplication
      method      : post
      input       : body  - id(userid)
      output      : success / err
      description : 아이디 중복 확인 - 사용가능한 아이디일경우 success
     */

    var id = req.body.id

    models.user.findAndCountAll({
      where: {user_id: id}
    })
    .then( result => {
      if(result.count != 1){
        res.json(util.successTrue())
      }
      else{
        res.json(util.successFalse())
      }
    })
    .catch( err => {
      console.log(err)
    })
});


router.post("/login", (req, res, next)=>{  
  /*
      url         : ~/user/login
      method      : post
      input       : body  - id(user id), pw(user pw)
      output      : success / err
      description : 로그인 - 성공 시 token 반환
     */

  var body = req.body
  
  models.user.findAll({
    where:{
      user_id: body.id,
      user_pw: body.pw
    }
  })
  .then( result => {
    var payload = {
      user_id: result[0].user_id
    }
    const secret = util.secret
    var option = {
      issuer: 'zu0',
      subject: 'todo_list_service_token'
    }

    jwt.sign(payload, secret, option, function(err, token){
      if(err){
        res.json(util.successFalse(err.message, '아이디 혹은 비밀번호가 틀립니다.'))
      }
      else{
        res.json(util.successTrue(token))
      }
    })
  })
  .catch( err => {
    res.json(util.successFalse(err.message))
  })
});

module.exports = router;
