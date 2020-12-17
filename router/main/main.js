var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로

// routing
router.get('/', function(req, res) {
    console.log('main.js loaded')
    res.sendFile(path.join(__dirname ,"../public/main.html"))
});

// export
module.exports = router;