const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users');
const {
    search
} = require('../routes/club');

const cars = {
    //根据首字母获取品牌列表
    async getbrandlist(req, res, next) {
        try {
            var str = 'select * from brand'
            var term = req.query.intial == -1 ? `` : ` where brand_intial='${req.query.intial}'`
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

    //根据条件获取车辆列表
    async getcarslist(req, res, next) {
        /*
        req.query.myscreen
          0：品牌
          1：价格
          2:级别
        */
        try {
            var str = `select * from car where 1=1`
            var term = ''
            if (req.query.myscreen[0] != -1) {
                term += ` and car_brand = '${req.query.myscreen[0]}'`
            }
            if (req.query.myscreen[1] != -1) {
                term += ` and car_price_low >= ${req.query.myscreen[1]} and car_price_high <= ${req.query.myscreen[2]}`
            }
            if (req.query.myscreen[3] != -1) {
                term += ` and car_type = '${req.query.myscreen[3]}'`
            }
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

    //id获取单个车辆信息以及品牌基本信息
    async getcarinfo(req, res, next) {
        /*
            req.query.id
             车辆id
            */
        try {
            var str = `SELECT car.*,brand.brand_logo FROM car LEFT JOIN brand ON car.car_brandid=brand.id`
            var term = ` where car.id=${req.query.id}`
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

    //汽车购买信息提交
    /*
    req.body.carid:汽车id
    req.body.userid:购买人id
    req.body.order_type:订单类型(0:新车,1：二手车)
    req.body.sell_id:卖家id(新车为品牌id,二手车为卖家id)
    req.body.paypwd:支付密码
    */
    async buycar(req, res, next) {
        try {
            //获取车辆信息
            let carsql = await sqlQuery(`select * from car where id=${req.body.carid}`)
            let car = carsql[0]
            //支付密码验证
            let pwdcheck = await modusers.pwdcheck(req.body.userid, req.body.paypwd)
            if (!pwdcheck.check) {
                return res.json({
                    code: 20001,
                    message: "密码验证失败",
                })
            }
            //账户余额验证
            let balancecheck = await modusers.balancecheck(car.car_price_low, req.body.userid)
            if (!balancecheck.check) {
                return res.json({
                    code: 20001,
                    message: "账户余额不足",
                })
            }


            //账户扣费
            modusers.deduct(car.car_price_low, req.body.userid)
            //购买信息计入订单表
            //会返回一个插入sql对象,其中inserId为插入行的id
            var ordersql = await sqlQuery(`insert into car_order (carid,userid,order_time,order_type,sell_id) 
            values (${car.id},${req.body.userid},'${new Date()}',0,${car.car_brandid})`)

            var car_number = "川E 456E06"
            //汽车入库
            // console.log(`insert into barn (carid,userid,car_number,km,orderid) 
            // values (${car.id},${req.body.userid},'${car_number}',0,${ordersql.insertId})`);
            var barnsql = await sqlQuery(`insert into barn (carid,userid,car_number,km,orderid) 
            values (${car.id},${req.body.userid},'${car_number}',0,${ordersql.insertId})`)
            return res.json({
                code: 20000,
                message: "购买成功",
                data: {
                    car_number: car_number,
                    orderid: ordersql.insertId,
                    car: car
                }
            })
            //余额验证
        } catch (error) {
            next(error)
        }
    },

    //搜索查询汽车
    /*
        req.query.searchstr 用户输入的查询字符
        req.query.reqnum 需要返回的最大值
     */
    async searchcar(req, res, next) {
        try {
            let sqlstr = `select * from car`
            let term = ` where car_name like '%${req.query.searchstr}%' limit ${req.query.reqnum}`
            let sqlres = await sqlQuery(sqlstr + term)
            return res.json({
                code: 20000,
                message: "查询成功",
                data: {
                    carlist: sqlres
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = cars