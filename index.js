var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var User = require('./app/model/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: 'this is oh so secret',
    resave: false,
    saveUninitialized: false
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// passport - local strategy
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
app.use('/api', require('./app/api'));

// static
app.use(express.static('public'));
app.use(express.static('node_modules'));

// catch-all
app.get('*', function (req, res) {
    // reload the file for dev
    fs.readFile('public/index.html', function (err, data) {
        if (err)
            return console.log(err);
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
    });
});

var db = require('./app/model/db.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    start(app);
});

function start(app) {
    // start server
    var port = 3000;
    app.listen(port, function () {
        console.log("Server started on " + port);
    });
}