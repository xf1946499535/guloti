var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users')
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
                data: sqlres[0]
            })
        } catch (error) {
            next(error)
        }
    },

    //修改信息
    /*
    req.body.usernewinfo 新用户信息对象，保持键与数据库字段名一致即可，可遍历自动更新
    req.body.userid
    req.body.pwdcheck 当修改了密码，则需要把旧密码进行验证
     */
    async editUsermessage(req, res, next) {
        try {
            if (req.pwdcheck && !modusers.pwdcheck(req.body.userid, req.body.pwdcheck)) {
                res.json({
                    code: 20001,
                    message: '修改失败，密码错误'
                })
            }
            //通过companyid重置修改用户身份
            req.body.usernewinfo.usertype = req.body.usernewinfo.companyid > 0 ? 'store' : 'normal'
            var sqlstr = `update user set `
            // console.log(req.body.usernewinfo);
            for (let key in req.body.usernewinfo) {
                sqlstr += `${key}='${req.body.usernewinfo[key]}',`
            }
            sqlstr = sqlstr.substring(0, sqlstr.length - 1);
            var term = ` where id=${req.body.userid}`
            var sqlres = await sqlQuery(sqlstr + term)
            res.json({
                message: '修改成功',
                code: 20000,
                data: sqlres
            })
        } catch (error) {
            console.log(error);
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