const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users')


const oldcar = {
    //获取二手车列表信息
    async oldcarlist(req, res, next) {
        try {
            var str = `SELECT barn.*,barn.id as barn_id,car.*,car.id as car_id,user.name as user_name FROM barn LEFT JOIN car ON car.id=barn.carid left join user on barn.userid=user.id`
            var term = ` where barn.sellstate='在售'`
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

    //获取单个二手车
    /*
        req.query.barn_id 车库id
     */
    async getoldcar(req, res, next) {
        try {
            var str = `SELECT barn.*,barn.id as barn_id,car.*,car.id as car_id,user.name as user_name FROM barn LEFT JOIN car ON car.id=barn.carid left join user on barn.userid=user.id`
            var term = ` where barn.sellstate='在售' and barn.id=${req.query.barn_id}`
            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres[0]
            })
        } catch (error) {
            next(error)
        }
    },


    //二手车购买信息提交
    /*
    req.body.barn_id:二手车在车库的id
    req.body.userid:购买人id
    req.body.order_type:订单类型(0:新车,1：二手车)
    req.body.sell_id:卖家id(新车为品牌id,二手车为卖家id)
    req.body.paypwd:支付密码
    */
    async buyoldcar(req, res, next) {
        try {
            //获取该二手车辆所有相关信息
            var oldcarsql = await sqlQuery(`SELECT * FROM barn where sellstate='在售' and id=${req.body.barn_id}`)
            let oldcar = oldcarsql[0]
            //支付密码验证
            let pwdcheck = await modusers.pwdcheck(req.body.userid, req.body.paypwd)
            if (!pwdcheck.check) {
                return res.json({
                    code: 20001,
                    message: "密码验证失败",
                })
            }
            //账户余额验证
            let balancecheck = await modusers.balancecheck(oldcar.pricing, req.body.userid)
            if (!balancecheck.check) {
                return res.json({
                    code: 20001,
                    message: "账户余额不足",
                })
            }

            //账户费用变更
            modusers.deduct(oldcar.pricing, req.body.userid)
            modusers.addduct(oldcar.pricing, oldcar.userid)

            //购买信息计入订单表
            //会返回一个插入sql对象,其中inserId为插入行的id
            var ordersql = await sqlQuery(`insert into car_order (carid,userid,order_time,order_type,sell_id,sellprice) 
            values (${oldcar.carid},${req.body.userid},'${new Date()}',${req.body.order_type},${req.body.sell_id},${oldcar.pricing})`)

            var car_number = "川E 456E06"
            //修改库中汽车的归属
            var barnsql = await sqlQuery(`update barn set userid=${req.body.userid},orderid=${ordersql.insertId},sellstate='在库',pricing=0
             where id=${req.body.barn_id}`)
            return res.json({
                code: 20000,
                message: "交易成功",
                data: {
                    car_number: car_number,
                    orderid: ordersql.insertId,
                    oldcar: oldcar
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = oldcar