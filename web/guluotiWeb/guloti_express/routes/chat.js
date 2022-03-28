var chat = require('../controller/chat')
var express = require('express');
var router = express.Router();
//获取聊天用户连接列表,返回已建立聊天的用户
router.get('/getchatconnectlist', async function (req, res, next) {
    try {
        chat.getchatconnectlist(req, res, next)
    } catch (error) {
        next(error)
    }
});
router.get('/getchatlist', async function (req, res, next) {
    try {
        chat.getchatlist(req, res, next)
    } catch (error) {
        next(error)
    }
});
router.get('/getnoreadnum', async function (req, res, next) {
    try {
        chat.getnoreadnum(req, res, next)
    } catch (error) {
        next(error)
    }
});
//更新消息读取状态
router.post('/cleanmsglist', async function (req, res, next) {
    try {
        chat.cleanmsglist(req, res, next)
    } catch (error) {
        next(error)
    }
});

//建立新的聊天
router.post('/addchatconnect', async function (req, res, next) {
    try {
        chat.addchatconnect(req, res, next)
    } catch (error) {
        next(error)
    }
});
module.exports = router;