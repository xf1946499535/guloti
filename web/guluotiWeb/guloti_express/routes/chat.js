var chat = require('../controller/chat')
var express = require('express');
var router = express.Router();

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
module.exports = router;