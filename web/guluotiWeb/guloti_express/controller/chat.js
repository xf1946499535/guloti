var sqlQuery = require('../module/lcMysql')

const chat = {
    //获取聊天用户连接列表,返回已建立聊天的用户
    /*
    请求
    req.query.userid 当前登录用户
    req.query.reqnum 需要的请求的条数
     */
    async getchatconnectlist(req, res, next) {
        try {
            var sqlstr = `select id,name,headimg,isonline from user where user.id in(select from_userid from chatlist where to_userid=${req.query.userid}) OR user.id in(select to_userid from chatlist where from_userid=${req.query.userid})  order by user.isonline desc limit ${req.query.reqnum}`
            let sqlres = await sqlQuery(sqlstr)
            res.json({
                code: 20000,
                message: '查询成功',
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },
    /*
    获取聊天信息列表
    req.query.userid 当前登录用户id
    req.query.touserid 聊天的对方用户id
    req.query.pagenum 请求的页面
    req.query.reqnum 请求条数
     */
    async getchatlist(req, res, next) {
        try {
            var sqlstr = `select * from (select * from chatlist where (from_userid=${req.query.userid} AND to_userid=${req.query.touserid}) OR (from_userid=${req.query.touserid} AND to_userid=${req.query.userid}) ORDER BY id desc LIMIT ${req.query.pagenum*req.query.reqnum},${req.query.reqnum}) k ORDER BY id`
            var sqlres = await sqlQuery(sqlstr)
            res.json({
                code: 20000,
                message: '请求成功',
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = chat