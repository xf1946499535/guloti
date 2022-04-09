var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var news = require('../controller/news')
/* GET users listing. */
/*资讯列表查询*/
router.get('/carnewslist', function (req, res, next) {
    news.carnewslist(req, res, next)
});

/*单条资讯查询*/
router.get('/carnews', function (req, res, next) {
    news.carnews(req, res, next)
});
//新增资讯
/*单条资讯新增*/
router.post('/addnews', function (req, res, next) {
    news.addnews(req, res, next)
});
//更新资讯
router.post('/updatenews', function (req, res, next) {
    news.updatenews(req, res, next)
});
//删除资讯
router.post('/delnews', function (req, res, next) {
    news.delnews(req, res, next)
});

module.exports = router;