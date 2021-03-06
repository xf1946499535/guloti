let sqlQuery = require('../module/lcMysql')

const chat = {
    //监听发送消息事件
    /*
    data.from_userid 发送者id
    data.to_userid 接受者id
    data.content 消息内容
     */
    async sendmsg(socket, data) {
        let tousermsg = await sqlQuery(`select * from user where id=${data.to_userid}`)
        let sqlStr = `insert into chatlist (from_userid,to_userid,readed,content)
             value (${data.from_userid},${data.to_userid},0,'${data.content}')`
        let result = await sqlQuery(sqlStr)
        socket.to(tousermsg[0].socketid).emit('getmsg', {
            from_userid: data.from_userid,
            to_userid: data.to_userid,
            content: data.content
        })
        socket.to(tousermsg[0].socketid).emit('addnoread', result)
    }
}
module.exports = chat