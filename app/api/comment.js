var express = require('express');
var Comment = require('../model/comment');

var app = express();
module.exports = app;

function login(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send(401);
    }
}

// get comments
app.get('/articles/:id/comments', function (req, res) {
    var conditions = {article_id: req.params.id};

    Comment.find(conditions, function (err, comments) {
        if (err) {
            return res.send(err);
        } else {
            res.send(comments);
        }
    });
});

// insert comment
app.post('/articles/:id/comments', login, function (req, res) {
    req.body.article_id = req.params.id;
    req.body.user_id = req.user._id;
    req.body.username = req.user.username;

    Comment.create(req.body, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('ok');
        }
    })
});

// delete comment (only own, or admin)
app.delete('/articles/:article_id/comments/:comment_id', login, function (req, res) {
    var conditions = { _id: req.params.comment_id };
    if (!req.user.admin) {
        conditions.user_id = req.user._id;
    }

    Comment.remove(conditions, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('ok');
        }
    })
});
