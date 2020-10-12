var express = require('express');
var router = express.Router();

//mysql 연결
var connection = require('../share/db.js');

//todo list 목록 불러오기
router.post('/show_todo_list', function(req, res){
    var user_id = req.body.id;

    connection.query("SELECT todo_id, contents, is_completed, is_deleted FROM todo WHERE user_id = '"+user_id+"'",
        function (err, result, fields) {
            if (err)
                res.send('err: ' + err);
            else {
                res.status(200).send(result);
            }
        });
});

//todo 추가
router.post('/create_todo', function(req, res){
    var contents = req.body.contents; 
    var user_id = req.body.id;
        
    connection.query("INSERT INTO todo (contents, user_id, is_completed, is_deleted) VALUES('"+contents+"', '"+user_id+"', 0, 0)",
        function (err, result, fields) {
            if (err)
                res.send('err: ' + err);
            else {
                console.log(result);
                res.status(200).send('success');
            }
    });
});

//todo 휴지통으로 이동
router.post('/goto_garbage', function(req, res){
    var todo_id = req.body.id;

    connection.query("UPDATE todo SET is_deleted = 1 WHERE todo_id = "+todo_id+"",
        function(err, result, fields){
            if(err)
                res.send('err: ' + err);
            else {
                res.status(200);
            }
        });
});

//todo 내용 수정
router.post('/update_todo', function(req, res){
    var todo_id = req.body.id;
    var contents = req.body.input;

    connection.query("UPDATE todo SET contents = '"+contents+"' WHERE todo_id = "+todo_id+"",
        function(err, result, fields){
            if(err)
                res.send('err: ' + err);
            else {
                console.log(result);
                res.status(200).send('success');
            }
        });
});

//todo 완료
router.post('/complete_todo', function(req, res){
    var todo_id = req.body.id;

    connection.query("UPDATE todo SET is_completed = 1 WHERE todo_id = "+todo_id+"",
        function(err, result, fields){
            if(err)
                res.send('err: ' + err);
            else {
                console.log(result);
                res.status(200).send('success');
            }
        });
});

//todo 완료 취소
router.post('/uncomplete_todo', function(req, res){
    var todo_id = req.body.id; 
    
    connection.query("UPDATE todo SET is_completed = 0 WHERE todo_id = "+ todo_id +"",
        function (err, result, fields) {
            if (err)
                res.send('err: ' + err);
            else {
                res.status(200).send('success');
            }
    });
});

//휴지통 - hidden list 보기
router.post('/show_hidden_list', function(req, res){
    var user_id = req.body.id;

    connection.query("SELECT todo_id, contents FROM todo WHERE user_id = '"+user_id+"' AND is_deleted = 1",
        function(err, result, fields){
            if(err)
                res.send('err: ' + err);
            else {
                console.log(result);
                res.status(200).send(result);
            }
    });
});

//휴지통 - todo 지우기
router.post('/delete_todo', function(req, res){
    var todo_id = req.body.id; 
    
    connection.query("UPDATE todo SET is_deleted = 1 WHERE todo_id = "+ todo_id +"",
        function (err, result, fields) {
            if (err)
                res.send('err: ' + err);
            else {
                res.status(200).send('success');
                console.log("success")
            }
    });
});

//휴지통 - todo 복구
router.post('/recover_todo', function(req, res){
    var todo_id = req.body.selected; 
    
    connection.query("UPDATE todo SET is_deleted = 0 WHERE todo_id = "+ todo_id +"",
        function (err, result, fields) {
            if (err)
                res.send('err: ' + err);
            else {
                res.status(200).send('success');
            }
    });
});

module.exports = router;