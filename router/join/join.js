var express = require('express')
var app = express()
var router = express.Router() // execute Router 
var path = require('path') // 상대 경로
var mydb = require('../../mydb')

// GET
router.get('/', function(req, res) { 
    console.log('join.html loaded')
    res.sendFile(path.join(__dirname, "../../public/join.html"))
});

module.exports = router;