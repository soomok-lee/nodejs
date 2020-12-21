var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로

// main page는 login이 될 때(즉 세션 정보가 있을 때) 접근이 가능.
// routing
router.get('/', function(req, res) {
    // get user from session
    console.log('main.js loaded', req.user)
    if(!req.user)
        res.render('login.ejs');

    var id = req.user.id;
    var email = req.user.email;
    
    // res.sendFile(path.join(__dirname ,"../../public/main.html"))
    res.render('main.ejs', {'id': id, 'email': email});
});

// export
module.exports = router;