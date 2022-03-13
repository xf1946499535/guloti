const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var comments = require('../controller/comments')

//获取评论列表
router.get('/getcomments', async function (req, res, next) {
    try {
        comments.getcomments(req, res, next)
    } catch (error) {
        next(error)
    }
});
//添加评论
router.post('/addcomment', async function (req, res, next) {
    try {
        comments.addcomment(req, res, next)
    } catch (error) {
        next(error)
    }
});

module.exports = router;