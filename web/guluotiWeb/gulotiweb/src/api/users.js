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