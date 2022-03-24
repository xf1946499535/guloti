import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'

//获取与自己建立聊天的用户列表
export const getchatconnectlist = (data) => {
    return lh_axios.request({
        url: '/glt/chat/getchatconnectlist',
        method: 'get',
        params: {
            userid: data.userid,
            reqnum: data.reqnum ? data.reqnum : 5
        }
    })
}

//获取聊天信息
export const getchatmsglist = (data) => {
    return lh_axios.request({
        url: '/glt/chat/getchatlist',
        method: 'get',
        params: {
            userid: data.userid,
            touserid: data.touserid,
            reqnum: data.reqnum ? data.reqnum : 10,
            pagenum: data.pagenum ? data.pagenum : 0
        }
    })
}