let sqlQuery = require('../module/lcMysql')

const user = {
    //监听用户断开连接事件
    disconnect(socket, a) {
        let args = arguments
        return async function (...args) {
            //修改数据库登录信息(socketid,isonline)
            //设置数据库更新语句，把数据库中的sockid和isonline清除
            console.log(socket.id + '离线了' + a);
            let sqlStr = "update user set socketid=?,isonline=? where socketid=?"
            let result = await sqlQuery(sqlStr, [null, 0, socket.id])
        }
    }
}
module.exports = user