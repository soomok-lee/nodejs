var express = require('express')
var app = express()
var router = express.Router(); // execute Router 
var path = require('path') // 상대 경로
var main = require('./main/main') // router
var email = require('./email/email') // router

// URL routing
router.get('/', function(req, res) { // root
    console.log("index.js loaded")
    res.sendFile(path.join(__dirname, "../public/main.html"))
});

router.use('/main', main)
router.use('/email', email)

module.exports = router; 