var express = require('express');
var router = express.Router();

//mysql 연결
var connection = require('../database/db.js');

//회원가입
router.post('/signin', function(req, res){
    var user_id = req.body.id;
    var user_pw = req.body.pw;

    if(user_id && user_pw){
        connection.query("INSERT INTO user (user_id, user_pw) VALUES('"+user_id+"', '"+user_pw+"')",
            function(err, result, fields){
                if(err)
                    res.send('err: ' + err);
                else{
                    console.log(user_id+', '+user_pw);
                    res.status(200).send('success create user name: '+user_id+' pw: '+user_pw);
                }
            });
    }
});

//아이디 중복 확인
router.post('/check_id_duplication', function(req, res){
    var user_id = req.body.id;

    connection.query("SELECT COUNT (user_id) AS count FROM user WHERE user_id = '"+user_id+"'",
        function(err, result, fields){
            if(err)
                res.send('err: ', err);
            else {
                if(result[0].count == 0)
                    res.status(200).send('yes');
                else
                    res.status(401);

                //프론트에서 result==0인 경우에만 아이디 사용 가능
            }
        });
});

//로그인
router.post('/login', function(req, res){
    var user_id = req.body.id;
    var user_pw = req.body.pw;
    var user = {
        id: user_id,
        pw: user_pw,
        isLogged: 0
    };

    connection.query("SELECT COUNT (user_id) AS count FROM user WHERE user_id = '"+user_id+"' AND user_pw = '"+user_pw+"'",
        function(err, result, fidleds){
            if(err)
                res.send('err: ' + err);
            else {                
                console.log(result[0].count);
                console.log(result);

                if(result[0].count == 1){
                    res.send('success');
                    user.isLogged = 1;
                    res.json(user);
                    // res.end(JSON.stringify(user));
                }
                else    
                    res.send('fail');
            }
        });
});

module.exports = router;