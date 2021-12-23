const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');

var barn = require('../controller/barn')

/*品牌列表查询*/
router.get('/getbrandlist', async function (req, res, next) {
    try {
        cars.getbrandlist(req, res, next)
    } catch (error) {
        next(error)
    }
});

module.exports = router;