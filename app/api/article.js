var express = require('express');
var Article = require('../model/article');

var app = express();
module.exports = app;

function loginAdmin(req, res, next) {
    if (req.user && req.user.admin) {
        next();
    } else {
        res.send(401);
    }
}

// get articles
app.get('/articles', function (req, res) {
    Article.find({}, function (err, articles) {
        if (err) {
            return res.send(err);
        } else {
            res.send(articles);
        }
    });
});

// get article
app.get('/articles/:id', function (req, res) {
    Article.findOne({_id: req.params.id}, function (err, articles) {
        if (err) {
            return res.send(err);
        } else {
            res.send(articles);
        }
    });
});


// insert article
app.post('/articles', loginAdmin, function (req, res) {
    req.body.user_id = req.user._id;
    Article.create(req.body, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ok: true});
        }
    })
});

// update article
app.post('/articles/:id', loginAdmin, function (req, res) {
    var conditions = { _id: req.params.id };

    // just sending req.body will only update specified fields
    Article.update(conditions, req.body, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ok: true});
        }
    })
});

// delete article
app.delete('/articles/:id', loginAdmin, function (req, res) {
    var conditions = { _id: req.params.id };

    Article.remove(conditions, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ok: true});
        }
    })
});
