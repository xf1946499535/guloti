const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');

var cars = require('../controller/cars')


/*品牌列表查询*/
router.get('/getbrandlist', async function (req, res, next) {
    try {
        cars.getbrandlist(req, res, next)
    } catch (error) {
        next(error)
    }
});

/*查询车辆列表 */
router.get('/getcarslist', async function (req, res, next) {
    try {
        cars.getcarslist(req, res, next)
    } catch (error) {
        next(error)
    }
});



module.exports = router;