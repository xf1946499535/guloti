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
            console.log(str + term);
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