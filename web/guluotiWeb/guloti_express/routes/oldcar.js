const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');

var oldcar = require('../controller/oldcar')

/*获取用户车库车辆列表*/
router.get('/oldcarlist', async function (req, res, next) {
    try {
        oldcar.oldcarlist(req, res, next)
    } catch (error) {
        next(error)
    }
});


module.exports = router;