//后端socketio
let socketio = {}
//因为需要用到数据库。所以要引入sql
let sqlQuery = require('./module/lcMysql')
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
        socket.on('disconnect', async function (data) {
            //修改数据库登录信息(socketid,isonline)
            //设置数据库更新语句，把数据库中的sockid和isonline清除
            console.log(socket.id + '离线了');
            let sqlStr = "update user set socketid=?,isonline=? where socketid=?"
            let result = await sqlQuery(sqlStr, [null, 0, socket.id])
        })

        //根据用户名或QQ账号查询单个用户信息
        socket.on('MsgByUsername', async function (logmsg) {
            let sqlStr = "select * from user where username=?||accountnum=?"
            let result = await sqlQuery(sqlStr, [logmsg, logmsg])
            // console.log(result);
            socket.emit('getMsgByName', result[0])
        })

        //根据自己和对方名字查询双方聊天记录
        socket.on('contentByNames', async function (myname, toname) {
            let sqlStr1 = "select * from chat where (`from`=? and `to`=?) or (`from`=? and `to`=?)"
            console.log(myname + "和" + toname);
            let result = await sqlQuery(sqlStr1, [myname, toname, toname, myname])
            //将查询到的信息返回给前端,数组形式
            socket.emit('getContent', result)
        })

        //监听获取用户信息事件，专门为前端返回用户信息
        socket.on('users', async function () {
            //此处需要进行mysql连接操作，已安装mysql模块
            //在此处写sql语句查询用户列表可完成操作并将得到的结果保存在res中
            let sqlStr = "select * from user"
            //等待获取mysql查询结果 是异步操作，使用await，并在function前用async
            let result = await sqlQuery(sqlStr)
            socket.emit('users', Array.from(result))
        })

        //监听前端聊天框发送的消息并保存到数据库和转发
        socket.on('sendMsg', async function (msg) {
            // console.log(msg);
            //判断消息接收方是否在线
            let strSql = 'select * from user where username=? and isonline=?'
            let result = await sqlQuery(strSql, [msg.to, 'true'])
            if (result.length > 0) {
                //即此人在线，则根据sockid发送消息
                let toid = result[0].socketid
                socket.to(toid).emit("getEventonline", msg)

                //将聊天内容保存到数据库
                //设置isread字段的原因：如果对方没有再在线，则isread为false，
                //表示信息暂时不发送过去，留着下次再发
                //如果isread为true，说明对方在线，当场就已经接收到消息或者已经接受到消息了
                //并且，因为from ,to这一类的是关键字，所以插入时要用反引号
                let strSql1 = 'insert into chat (`from`,`to`,`content`,`time`,isread) values (?,?,?,?,?)'
                sqlQuery(strSql1, [msg.from, msg.to, msg.content, msg.time, 'true'])
            } else {
                //如果不在线，则直接把信息存到数据库，下次再发
                let strSql1 = 'insert into chat (`from`,`to`,`content`,`time`,isread) values (?,?,?,?,?)'
                sqlQuery(strSql1, [msg.from, msg.to, msg.content, msg.time, 'false'])

            }
        })

    });


}
socketio.getSocket = getSocket;
module.exports = socketio