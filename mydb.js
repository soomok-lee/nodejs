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
var mysql = require('mysql') // mysql
var connection = mysql.createConnection({
    host:'localhost',
    port: 3316,
    user: 'root',
    password: 'ella',
    database: 'nodejsdb',
    insecureAuth : true
})
// connection.connect()
connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
