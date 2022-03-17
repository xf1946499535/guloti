import lh_axios from '@/utils/lochttp'

//根据id获取当前用户
export const getUser = (id) => {
    return lh_axios.request({
        url: '/glt/users/getuser',
        method: 'get',
        params: {
            id: id
        }
    })
}

//修改用户信息
//usernewinfo中，需保证键与数据库一致,数量随意
export const editUsermessage = (data) => {
    return lh_axios.request({
        url: '/glt/users/editUsermessage',
        method: 'post',
        data: {
            userid: data.userid,
            usernewinfo: data.usernewinfo
        }
    })
}