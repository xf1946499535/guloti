const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
/* GET users listing. */
/*资讯列表查询*/
router.get('/carnewslist', async function (req, res, next) {
    try {
        var str = 'select * from car_news'
        var sqlres = await sqlQuery(str)
        res.status(200).json({
            code: 20000,
            message: "查询成功",
            data: sqlres
        })
    } catch (error) {
        next(error)
    }
});

/*单条资讯查询*/
router.get('/carnews', async function (req, res, next) {
    try {
        var str = `select * from car_news where id=${req.query.id}`
        var sqlres = await sqlQuery(str)
        res.status(200).json({
            code: 20000,
            message: "查询成功",
            data: sqlres[0]
        })
    } catch (error) {
        next(error)
    }
});


module.exports = router;