var express = require('express');
var passport = require('passport');
var User = require('../model/user');

var app = express();
module.exports = app;

app.post('/user/register', function (req, res) {
    User.register(new User(req.body), req.body.password, function (err, user) {
        if (err) return res.send(err);
        passport.authenticate('local')(req, res, function () {
            res.send(user);
        })
    });
});

app.post('/user/login', passport.authenticate('local'), function (req, res) {
    res.send({ok: true});
});

app.get('/user/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/user/current', function (req, res) {
    res.send(req.user);
})