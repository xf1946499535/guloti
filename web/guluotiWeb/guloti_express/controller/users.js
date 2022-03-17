const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var upload = multer({
    dest: 'upload_tmp/'
});
const users = {
    async getuser(req, res, next) {
        try {
            var str = 'select * from user'
            var term = ` where id=${req.query.id}`
            var sqlres = await sqlQuery(str + term)
            sqlres[0].password = '******'
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //修改头像
    async editUserheader(req, res, next) {
        try {
            console.log(req.files[0]); // 上传的文件信息
            var des_file = "./upload/" + req.files[0].originalname;
            fs.readFile(req.files[0].path, function (err, data) {
                fs.writeFile(des_file, data, function (err) {
                    if (err) {
                        console.log(err);
                        fs.unlinkSync(req.files[0].path);
                    } else {
                        response = {
                            message: 'File uploaded successfully',
                            filename: req.files[0].originalname
                        };
                        console.log(response);
                        fs.unlinkSync(req.files[0].path);
                        res.end(JSON.stringify(response));
                    }
                });
            });
        } catch (error) {
            next(error)
        }
    },
    //上传文件共用接口
    /*
    请求
    req.body.path 资源最终保存地址
    返回
    url 保存文明的访问路径
     */
    async uploadfile(req, res, next) {
        try {
            // console.log(req.body.path);
            var des_file = `/www/server/tomcat/webapps/ROOT/guloti/GulotiResource/upload/${req.body.path}`
            // res.json(req.body)
            // var des_file = "./upload/" + req.files[0].originalname;
            fs.readFile(req.files[0].path, function (err, data) {
                fs.writeFile(des_file, data, function (err) {
                    if (err) {
                        console.log(err);
                        fs.unlinkSync(req.files[0].path);
                    } else {
                        var response = {
                            message: 'File uploaded successfully',
                            url: `http://47.108.230.246:8080/guloti/GulotiResource/upload/${req.body.path}`
                        };
                        // console.log(response);
                        fs.unlinkSync(req.files[0].path);
                        res.json(response)
                    }
                });
            });
        } catch (error) {
            next(error)
        }
    }
}
module.exports = users