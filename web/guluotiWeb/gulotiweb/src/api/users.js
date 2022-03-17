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

//上传头像
//根据id获取当前用户，没有用到
export const editUserheader = (file, data) => {
    return lh_axios.request({
        url: '/glt/users/uploadfile',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        file: file,
        data: data
    })
}