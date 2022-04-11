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
/*查询单个车辆信息 */
router.get('/getcarinfo', async function (req, res, next) {
    try {
        cars.getcarinfo(req, res, next)
    } catch (error) {
        next(error)
    }
});

/*汽车购买信息提交*/
router.post('/buycar', async function (req, res, next) {
    try {
        cars.buycar(req, res, next)
    } catch (error) {
        next(error)
    }
});

/*搜索汽车 */
router.get('/searchcar', async function (req, res, next) {
    try {
        cars.searchcar(req, res, next)
    } catch (error) {
        next(error)
    }
});
//根据品牌分配客服，为前端随机返回在线客服id
router.get('/disservicesock', async function (req, res, next) {
    try {
        cars.disservicesock(req, res, next)
    } catch (error) {
        next(error)
    }
});
//新增汽车
router.post('/addcar', async function (req, res, next) {
    try {
        cars.addcar(req, res, next)
    } catch (error) {
        next(error)
    }
});

//更新车辆
router.post('/updatecar', async function (req, res, next) {
    try {
        cars.updatecar(req, res, next)
    } catch (error) {
        next(error)
    }
});
//删除
router.post('/delcar', async function (req, res, next) {
    try {
        cars.delcar(req, res, next)
    } catch (error) {
        next(error)
    }
});
module.exports = router;