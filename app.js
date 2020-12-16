// npm init
// npm install express --save
// npm install nodemon --save // 자동으로 파일의 변화 감지하여 재시작
// --save(project) vs -g(global)
// node app.js
// nodemon app.js

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
// body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()) // json
app.use(bodyParser.urlencoded({extended:true}))
// view engine ejs
app.set('view engine', 'ejs') // npm install ejs --save

/*
MySQL 
C:\Program Files\MySQL\MySQL Server 8.0\bin>mysql.exe -uroot -p<PASSWORD> -h 127.0.0.1 -P 3316 // port 명시
CREATE DATABASE nodejsDB // DB 생성
use nodejsDB // DB 지정
// TABLE 생성
CREATE TABLE Users(
    id INT(11) NOT NULL AUTO_INCREMENT, 
    name VARCHAR(20), 
    email VARCHAR(200) NOT NULL, 
    password VARCHAR(200) NOT NULL, 
    CONSTRAINT Users_PK PRIMARY KEY(id)
);
// TABLE 확인
show tables;
desc Users;
// DATA 생성
INSERT INTO Users(name, email, password) VALUES ('ella', 'ella@ella.com', '1234');
// DATA 확인 
SELECT * FROM Users;

// MySQL module
npm install mysql --save

https://expressjs.com

// connection issue
https://medium.com/codespace69/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server-consider-8afadc2385e2
the problem is mysqljs in Node (the package you install with npm install mysql and use it in your Node code) doesn't support the new default authentication method of MySQL 8, yet.

Option 1) Downgrade “MySQL” to authenticate using good old “native_password”
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ella';
*/
var mysql = require('mysql')
var connection = mysql.createConnection({
    host:'localhost',
    port: 3316,
    user: 'root',
    password: 'ella',
    database: 'nodejsdb',
    insecureAuth : true
})
connection.connect()

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

