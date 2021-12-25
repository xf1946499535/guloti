const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users')


const oldcar = {
    //获取二手车信息
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
}

module.exports = oldcar