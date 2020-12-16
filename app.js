// npm init
// npm install express --save
// npm install nodemon --save // 자동으로 파일의 변화 감지하여 재시작
// --save(project) vs -g(global)
// node app.js
// nodemon app.js

const bodyParser = require('body-parser');
var express = require('express')
var app = express()
app.listen(3000, function() {
    console.log("start! express server on port 3000")
});

// for(var i=0; i<100; i++) {
//     console.log('end of server code...')
// }

// setting static directory
app.use(express.static('public'));
app.use(bodyParser.json()) // json
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs') // npm install ejs --save

// URL routing
// GET
app.get('/', function(req, res) {
    // res.send("<h1>hi friend!</h1>")
    res.sendFile(__dirname + "/public/main.html")
});

app.get('/main', function(req, res) {
    // res.send("<h1>hi friend!</h1>")
    res.sendFile(__dirname + "/public/main.html")
});

// POST
app.post('/email_post', function(req, res) { 
    // body-parser
    // npm install body-parser --save
    // console.log(req.body.email)
    // res.send("<h1>welcome! " + req.body.email + "</h1>")

    console.log(req.body)
    // ejs
    // res.render('email.ejs', {'email' : req.body.email})
    res.render('email.ejs', req.body)
});

app.post('/ajax_send_email', function(req, res) {
    console.log(req.body.email)
    var responseData = {'result': 'ok', 'email' : req.body.email}
    res.json(responseData)
});
