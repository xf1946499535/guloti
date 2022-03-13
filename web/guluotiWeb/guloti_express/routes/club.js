const {
    json
} = require('express');
var express = require('express');
var router = express.Router();

var club = require('../controller/club')


/*车友会列表查询*/
router.get('/getclublist', async function (req, res, next) {
    try {
        club.getclublist(req, res, next)
    } catch (error) {
        next(error)
    }
});

//获取论坛列表(简要信息，不包含具体内容)
router.get('/getinvitationlist', async function (req, res, next) {
    try {
        club.getinvitationlist(req, res, next)
    } catch (error) {
        next(error)
    }
});

//添加帖子
router.post('/addinvitation', async function (req, res, next) {
    try {
        club.addinvitation(req, res, next)
    } catch (error) {
        next(error)
    }
});

module.exports = router;