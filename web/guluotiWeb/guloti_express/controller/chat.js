var sqlQuery = require('../module/lcMysql')
let modchat = require('../module/chat')
const chat = {
    //获取聊天用户连接列表,返回已建立聊天的用户
    /*
    请求
    req.query.userid 当前登录用户
    req.query.reqnum 需要的请求的条数
     */
    async getchatconnectlist(req, res, next) {
        try {
            var sqlstr = `select user.id as userid,user.name,user.headimg,user.isonline,user.companyid,brand.* from user left join brand on brand.id=user.companyid where user.id in(select from_userid from chatlist where to_userid=${req.query.userid}) OR user.id in(select to_userid from chatlist where from_userid=${req.query.userid})  order by user.isonline desc limit ${req.query.reqnum}`
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
    },
    //获取未读信息数量
    /**
     * req.query.userid 用户id
     */
    async getnoreadnum(req, res, next) {
        try {
            res.json({
                code: 20000,
                message: '请求成功',
                data: await modchat.unreadnums(req.query.userid)
            })
        } catch (error) {
            next(error)
        }
    },
    //更改消息读取状态
    /*
    req.body.from_userid 发送方id
    req.body.to_userid  接收方id
     */
    async cleanmsglist(req, res, next) {
        try {
            res.json({
                code: 20000,
                message: '操作成功',
                data: await modchat.cleanmsglist(req.body.from_userid, req.body.to_userid)
            })
        } catch (error) {
            next(error)
        }
    },

    //创建新聊天连接
    /*
    req.body.from_userid 发送方id
    req.body.to_userid  接收方id
     */
    async addchatconnect(req, res, next) {
        try {
            if (req.body.from_userid == req.body.to_userid) {
                res.json({
                    code: 20001,
                    message: '不能跟自己聊天',
                })
            }
            let sqlstr = `insert into chatlist (from_userid,to_userid,content)
             values (${req.body.from_userid},${req.body.to_userid},'我们可以开始聊天了')`
            let sqlres = await sqlQuery(sqlstr)
            res.json({
                code: 20000,
                message: '建立连接成功',
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = chat