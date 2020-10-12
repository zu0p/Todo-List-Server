var express = require('express');
var router = express.Router();

//mysql 연결
var connection = require('../share/db.js');

//아이디와 비밀번호가 일치하는지
router.post('/authentication', function(req, res){
    var user_id = req.body.id;
    var user_pw = req.body.pw;

    connection.query("SELECT COUNT (user_id) AS collect FROM user WHERE user_id = '"+user_id+"' AND user_pw = '"+user_pw+"'",
        function(err, result, fields){
            if(err)
                res.send('err: ' + err);
            else{
                console.log(result);
                if(result[0].collect == 1)
                    res.status(200).send('authentication');
                else
                    res.status(401).send('not collect');
            }
        });
});

//회원정보 수정
router.post('/update_user_info', function(req, res){
    var user_id = req.body.id;
    var user_pw = req.body.pw;

    connection.query("UPDATE user SET user_pw = '"+user_pw+"' WHERE user_id = '"+user_id+"'",
        function(err, result, fields){
            if(err)
                res.send('err: '+ err);
            else {
                res.status(200).send('success');
            }
        });
});

//회원 탈퇴
router.post('/delete_user_info', function(req, res){
    var user_id = req.body.id;

    connection.query("DELETE FROM user WHERE user_id = '"+user_id+"'",
        function(err, result, fields){
            if(err)
                res.send('err: '+ err);
            else {
                res.status(200).send('success');
            }
        });
});

module.exports = router;