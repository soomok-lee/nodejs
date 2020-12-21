var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로

// main page는 login이 될 때(즉 세션 정보가 있을 때) 접근이 가능.
// routing
router.get('/', function(req, res) {
    // get user from session
    var id;
    var email;
    
    if(req.user) {
        id = req.user.id;
        email = req.user.email;
    }  
    // res.sendFile(path.join(__dirname ,"../../public/main.html"))
    console.log('main.ejs loaded')
    res.render('main.ejs', {'id': id, 'email': email});
    
});

// export
module.exports = router;