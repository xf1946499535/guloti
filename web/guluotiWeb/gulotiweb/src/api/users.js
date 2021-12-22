import ln_axios from '@/utils/locnor'

//根据id获取当前用户
export const getUser = (id) => {
    return ln_axios.request({
        url: '/glt/users/getuser',
        method: 'get',
        params: {
            id: id
        }
    })
}