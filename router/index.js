var express = require('express')
var app = express()
var router = express.Router() // execute Router 
var path = require('path') // 상대 경로
var main = require('./main/main') // router
var email = require('./email/email') // router
var join = require('./join/join') // router
var login = require('./login/login')
var logout = require('./logout/logout')

// URL routing
router.get('/', function(req, res) { // root
    // console.log("main.html loaded")
    res.sendFile(path.join(__dirname, "../public/main.html"))
    // res.render('main.ejs', {
    //     id: id,
    //     email: email
    // })
});

router.use('/main', main)
router.use('/email', email)
router.use('/join', join)
router.use('/login', login)
router.use('/logout', logout)

module.exports = router;