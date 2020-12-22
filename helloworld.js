// const http = require('http');

// const hostname = '127.0.0.1'
// const port = 3000;

// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     if(req.url === '/'){
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Hello World\n');
//     } else if (req.url === '/users') {
//         res.statusCode = 200; 
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('User list.');
//     } else {
//         res.statusCode = 404;
//         res.end('Not found.');
//     }
// });

// server.listen(port, hostname, () => {
//     console.log(`server running on port ${port}`);
// });


var express = require('express');
var app = express();

app.get('/', function(req, res) { // routing
    res.send('Hello World!');
});

app.listen(3000, function() { // callback function
    console.log('start! express server on port 3000');
});