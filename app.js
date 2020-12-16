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
