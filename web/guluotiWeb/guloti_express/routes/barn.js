const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var barn = require('../controller/barn')

/*获取用户车库车辆列表*/
router.get('/getcarsinbarn', async function (req, res, next) {
    try {
        barn.getcarsinbarn(req, res, next)
    } catch (error) {
        next(error)
    }
});

/*挂售车辆 */
router.post('/sellcar', async function (req, res, next) {
    try {
        barn.sellcar(req, res, next)
    } catch (error) {
        next(error)
    }
});

/*放弃出售车辆 */
router.post('/giveupsell', async function (req, res, next) {
    try {
        barn.giveupsell(req, res, next)
    } catch (error) {
        next(error)
    }
});

module.exports = router;