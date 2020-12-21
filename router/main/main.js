var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로

// routing
router.get('/', function(req, res) {
    console.log('main.js loaded', req.user)
    var id = req.user.id;
    var email = req.user.email;
    // res.sendFile(path.join(__dirname ,"../../public/main.html"))
    res.render('main.ejs', {'id': id, 'email': email});
});

// export
module.exports = router;