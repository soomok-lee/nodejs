// REST API
var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로
var mydb = require('../../mydb');

// 1. GET users
router.get('/', function(req,res){
    var responseData = {};

    var query = mydb.query('select * from users', function(err, rows) {
        if(err) throw err;
        if(rows.length) {
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = 0;
        }
        res.json(responseData);
    })
});

// 2. GET user
router.get('/:id', function(req,res){
    var id = req.params.id;
    console.log('id', id);

    var responseData = {};

    var query = mydb.query('select * from users where id=?', [id], function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = 0;
        }
        res.json(responseData);
    })
});

// 3. POST
router.post('/', function(req, res) { 
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    // console.log(email, name, password);

    var sql = {email: email, name: name, password: password};
    var query = mydb.query('insert into users set ?', sql, function(err, rows){
        if(err) throw err;
        
        res.json({'result': 1});
    })
});

// 4. UPDATE 
router.put('/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;

    var sql = [name, id];
    var query = mydb.query('update users set name=? where id=?', sql, function(err, rows){
        if(err) throw err;
        console.log(rows);
        
        res.json({'result': 1});
    })
});

// 5. DELETE
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    console.log('id', id);
    
    var responseData = {};

    var query = mydb.query('delete from users where id=?', [id], function(err, rows) {
        if(err) throw err;
        if(rows.affectedRows > 0) {
            responseData.result = 1;
            responseData.data = id;
        } else {
            responseData.result = 0;
        }
        res.json(responseData);
    })
});

module.exports = router;