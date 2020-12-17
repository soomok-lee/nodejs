var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로
var mydb = require('../../mydb');

// POST
router.post('/form', function(req, res) { 
    // body-parser
    // npm install body-parser --save
    // console.log(req.body.email)
    // res.send("<h1>welcome! " + req.body.email + "</h1>")

    console.log(req.body)
    // ejs
    // res.render('email.ejs', {'email' : req.body.email})
    res.render('email.ejs', req.body)
});

router.post('/ajax', function(req, res) {
    // console.log(req.body.email)
    // var responseData = {'result': 'ok', 'email' : req.body.email}
    
    var email = req.body.email;
    console.log(email)
    var responseData = {};
    var query = mydb.query('select name from users where email="'+ email + '"', function(err, rows) {
        if(err) throw err;
        if(rows[0]) {
            // console.log(rows[0].name)
            responseData.result = "ok";
            responseData.name = rows[0].name;
        } else {
            // console.log('none : ' + rows[0])
            responseData.result = "none";
            responseData.name = "";
        }
        res.json(responseData)
    })
    
});

module.exports = router;