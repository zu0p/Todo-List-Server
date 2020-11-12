var uuid = require("uuid4")
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

    // jwt으로 토큰 발급
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

router.post("/kakao", async (req, res, next) => {  
  /*
      url         : ~/user/kakao
      method      : post
      input       : header-access-token,refresh-token, body-id,name,email,profileUrl
      output      : success,data / err
      description : 카카오 로그인
     */
  const body = req.body
  const accessToken = "kakao_"+req.headers['access-token']
  const refreshToken = "kakao_"+req.headers['refresh-token']
  const kakao_id = body.id
  const kakao_pw = uuid()

  try{
    const dupRes = await models.user.findAndCountAll({
      where: {user_id: body.id}
    })
    
    if(dupRes.count!=1){  // 새로운 아이디이면
      try{
        const createRes = await models.user.create({   // user create
          user_id: kakao_id,
          user_pw: kakao_pw
        })    
      }catch(err){
        res.json(err)
      }
    }    
    res.json(util.successTrue(accessToken))
  } catch(err){
    res.json(err)
    console.log(err)
  }
});

module.exports = router;
