// npm init
// npm install express --save
// npm install nodemon --save // 자동으로 파일의 변화 감지하여 재시작
// --save(project) vs -g(global)
// node app.js
// nodemon app.js
// nodejs 비동기 방식으로 작동
// npm install ejs --save // view engine ejs

// 인증 관련 모듈 설치
// npm install passport passport-local express-session connect-flash --save-dev

var express = require('express')
var app = express()
var bodyParser = require('body-parser'); // body-parser
var router = require('./router/index') // router 
var passport = require('passport') // passport
var LocalStrategy = require('passport-local').Strategy // passport-local 
var session = require('express-session') // express-session
var flash = require('connect-flash') // connect-flash

app.listen(3000, function() {
    console.log("start! express server on port 3000")
});

app.use(express.static('public')); // setting static directory
app.use(bodyParser.json()) // body parser // json
app.use(bodyParser.urlencoded({extended:true})) // body parser
app.set('view engine', 'ejs') // view engine ejs

// passportjs.org/docs/overview
// middleware setting
app.use(session({
    secret: 'keyboard cat', // secret key
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(router) // router
