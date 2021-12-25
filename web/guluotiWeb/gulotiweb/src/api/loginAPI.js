import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'

import axios from "axios";
// import axios from "axios"

export const querynewdetall = (query) => {
    return axios.request({
        url: 'small4/shop/goods/detail',
        method: 'get',
        params: query
    })
}

export const login = (data) => {
    return ln_axios.request({
        url: '/glt/users/login',
        method: 'post',
        data: data
    })
}
export const register = (data) => {
    return ln_axios.request({
        url: '/glt/users/register',
        method: 'post',
        data: data
    })
}