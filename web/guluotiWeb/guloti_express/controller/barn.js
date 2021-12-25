const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users')
const barn = {
    //获取用户车库车辆列表及其信息
    async getcarsinbarn(req, res, next) {
        /*
        req.query.userid 用户id
        */
        try {
            var str = `SELECT barn.*,barn.id as barn_id,car.*,car.id as car_id FROM barn LEFT JOIN car ON car.id=barn.carid`
            var term = ` where barn.userid=${req.query.userid} and barn.sellstate!='已售'`
            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //挂售车辆
    /*
        req.body.barnid 该车车库信息id
        req.body.paypassword 卖家支付密码
        req.body.pricing 卖家定价
     */
    async sellcar(req, res, next) {
        try {
            //获取该车车库信息
            let carbarns = await sqlQuery(`select * from barn where id=${req.body.barnid}`)
            let carofbarn = carbarns[0]
            //支付密码验证
            let pwdcheck = await modusers.pwdcheck(carofbarn.userid, req.body.paypassword)
            if (!pwdcheck.check) {
                return res.json({
                    code: 20001,
                    message: "密码验证失败",
                })
            }
            //改变该车的车库信息， 更新出售状态与定价
            let updatesql = await sqlQuery(`update barn set sellstate='在售',pricing=${req.body.pricing}
             where id=${req.body.barnid}`)
            return res.json({
                code: 20000,
                message: "汽车挂售成功",
            })
        } catch (error) {
            next(error)
        }
    },

    //放弃出售车辆
    /*
        req.body.barnid 该车车库信息id
     */
    async giveupsell(req, res, next) {
        try {
            //改变该车的车库信息， 更新出售状态与定价
            let updatesql = await sqlQuery(`update barn set sellstate='在库',pricing=0
             where id=${req.body.barnid}`)
            return res.json({
                code: 20000,
                message: "汽车取消出售成功",
            })
        } catch (error) {
            next(error)
        }
    },
}



module.exports = barn