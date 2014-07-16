var express = require('express');
var models = require('../models');
var debug = require('debug')('controller');

var router = express.Router();

/// Get the comments list.
function get_comment_list (req, res) {
    models.Comment.find(function (err, comments) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(comments);
        }
    });
}

/// Post a new comment.
function add_new_comment (req, res) {
    var payload = req.body;

    if (payload.author && payload.text) {
        models.Comment.create(payload, function (err) {
            if (err) {
                res.send(500, err);
            } else {
                get_comment_list(res);
            }
        });
    } else {
        res.send(400);
    }
}

/// Init the route
router.route('/')
    .get(get_comment_list)
    .post(add_new_comment);

module.exports = router;
