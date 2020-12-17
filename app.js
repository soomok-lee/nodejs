// npm init
// npm install express --save
// npm install nodemon --save // 자동으로 파일의 변화 감지하여 재시작
// --save(project) vs -g(global)
// node app.js
// nodemon app.js
// nodejs 비동기 방식으로 작동
// npm install ejs --save // view engine ejs

var express = require('express')
var app = express()
var bodyParser = require('body-parser'); // body-parser
var router = require('./router/index') // router 

app.listen(3000, function() {
    console.log("start! express server on port 3000")
});

app.use(express.static('public')); // setting static directory
app.use(bodyParser.json()) // body parser // json
app.use(bodyParser.urlencoded({extended:true})) // body parser
app.set('view engine', 'ejs') // view engine ejs
app.use(router) // router