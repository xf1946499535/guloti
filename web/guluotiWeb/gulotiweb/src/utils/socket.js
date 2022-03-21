//前端socketio
import io from 'socket.io-client'

//与服务器建立socketio连接
let socket = io.connect("http://localhost:3201", {
    'force new connection': true
});
export default socket;