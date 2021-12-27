const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');

var oldcar = require('../controller/oldcar')

/*获取在售二手车列表*/
router.get('/oldcarlist', async function (req, res, next) {
    try {
        oldcar.oldcarlist(req, res, next)
    } catch (error) {
        next(error)
    }
});


/*获取单个二手车信息*/
router.get('/getoldcar', async function (req, res, next) {
    try {
        oldcar.getoldcar(req, res, next)
    } catch (error) {
        next(error)
    }
});

/*二手车购买信息提交*/
router.post('/buyoldcar', async function (req, res, next) {
    try {
        oldcar.buyoldcar(req, res, next)
    } catch (error) {
        next(error)
    }
});
module.exports = router;