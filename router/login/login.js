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
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'message': msg});
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

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordFeild: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    console.log('local-login callback called.');
    var query = mydb.query('select * from users where email=?', [email], function(err, rows){
        if(err) return done(err);

        if(rows.length){
            // console.log(email, rows[0].id)
            return done(null, {'email': email, 'id': rows[0].id})
        } else {
            console.log('login failed.')
            return done(null, false, {'message': 'your login info is not found.'});
        }
    })
}))

// POST
router.post('/', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);

        req.login(user, function(err) {
            if(err) return next(err);
            return res.json(user);
        });
    })(req, res, next);
})

module.exports = router;