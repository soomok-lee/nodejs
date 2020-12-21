var express = require('express')
const passport = require('passport')
const { basename } = require('path')
var app = express()
var router = express.Router() // execute Router 
var path = require('path') // 상대 경로
var mydb = require('../../mydb')
var password = require('passport')
var LocalStrategy = require('passport-local').Strategy 

// GET
router.get('/', function(req, res) { 
    // console.log('GET /join')
    // res.sendFile(path.join(__dirname, "../../public/join.html"))
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('join.ejs', {'message': msg});
});

// passport
passport.serializeUser(function(user, done){
    console.log('passport session save: ', user.id);
    return done(null, user.id); // the user.id is saved in session
})
// and the user.id is later used to retrieve the whole object via the deserializeUser function.
passport.deserializeUser(function(id, done){
    console.log('passport get id from session: ', id);
    // done(null, id);
    var query = mydb.query('select * from users where id=?', [id], function(err, rows){
        console.log('get query result: ', rows[0])
        user = rows[0]
        done(err, {'id': id, 'email': user.email});
    })
})

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordFeild: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    // console.log('local-join callback called.');
    var query = mydb.query('select * from users where email=?', [email], function(err, rows){
        if(err) return done(err);

        if(rows.length){
            // join fail
            console.log('already exists.')
            return done(null, false, {message: 'your email is already taken.'})
        } else {
            // join success
            console.log('create a user.')
            var sql = {email: email, password: password};
            var query = mydb.query('insert into users set ?', sql, function(err, rows){
                if(err) throw err;
                return done(null, {'email': email, 'id': rows.insertId});
            })
        }
    })
}))

// join routing
router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true
}))

// POST
// router.post('/', function(req, res) { 
//     console.log('POST /join')
//     var body = req.body;
//     var email = body.email;
//     var name = body.name;
//     var password = body.password;
//     // console.log(email, name, password)

//     // https://github.com/mysqljs/mysql#escaping-query-values
//     var sql = {email : email, name : name, password : password};
//     var query = mydb.query('insert into users set ?', sql, function(err, rows) {
//         if(err) throw err
//         else res.render('welcome.ejs', {'name': name, 'id' : rows.insertId})
//     })
// });

module.exports = router;