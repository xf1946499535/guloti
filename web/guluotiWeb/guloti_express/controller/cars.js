const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');


const cars = {
    //根据首字母获取品牌列表
    async getbrandlist(req, res, next) {
        try {
            var str = 'select * from brand'
            var term = req.query.intial == -1 ? `` : ` where brand_intial='${req.query.intial}'`
            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
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
            // console.log(req.query.myscreen);

            // console.log((str + term));

            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
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
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = cars