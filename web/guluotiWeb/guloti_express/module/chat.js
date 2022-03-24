var sqlQuery = require('../module/lcMysql')
const modchat = {
    //清空用户与某对象用户的消息队列并返回操作条数
    async cleanmsglist(from_userid, to_userid) {
        let sqlstr = `update chatlist set readed=1 where from_userid=${from_userid} and to_userid=${to_userid}`
        let sqlres = await sqlQuery(sqlstr)
        return sqlres.changedRows
    },
    //返回用户未读的信息长度
    async unreadnums(userid) {
        let sqlstr = `select * from chatlist where to_userid=${userid} and readed=0`
        let sqlres = await sqlQuery(sqlstr)
        return sqlres.length
    }
}


module.exports = modchat