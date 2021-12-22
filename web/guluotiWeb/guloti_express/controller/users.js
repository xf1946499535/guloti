const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');

const users = {
    async getuser(req, res, next) {
        try {
            var str = 'select * from user'
            var term = ` where id=${req.query.id}`
            var sqlres = await sqlQuery(str + term)
            sqlres[0].password = '******'
            res.status(200).json({
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = users