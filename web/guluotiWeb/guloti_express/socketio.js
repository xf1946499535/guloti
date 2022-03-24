//后端socketio
let socketio = {}
//因为需要用到数据库。所以要引入sql
let sqlQuery = require('./module/lcMysql')
let sockuser = require('./socketcontroller/user')
let sockchat = require('./socketcontroller/chat')
//拿到www中的io并使用，因为这个函数是在www中被调用的，所以拿的socketio.io中
//的io是www中的
function getSocket(server) {
    //解决客户端和服务器的跨域问题
    socketio.io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    let io = socketio.io;
    io.on('connection', function (socket) {
        // console.log(socket.id + "连接服务器");
        // 设置socketid
        socket.on('setsocket', async function (userid) {
            console.log(socket.id + '登录了');
            //修改数据库登录信息(socketid,isonline)
            //设置数据库更新语句
            let sqlStr = "update user set socketid=?,isonline=? where id=?"
            let result = await sqlQuery(sqlStr, [socket.id, 1, userid])
        })

        //监听用户断开连接事件
        socket.on('disconnect', sockuser.disconnect(socket, 1))
        //监听用户登出事件
        socket.on('logout', sockuser.disconnect(socket, 1))
        //监听前端聊天框发送的消息并保存到数据库和转发
        socket.on('sendmsg', function (data) {
            sockchat.sendmsg(socket, data)
        })

    });


}
socketio.getSocket = getSocket;
module.exports = socketio