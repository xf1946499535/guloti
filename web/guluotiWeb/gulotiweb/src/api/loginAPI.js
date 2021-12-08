import n_axios from "@/utils/nor";
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
    return n_axios.request({
        url: '/union/login',
        method: 'post',
        data: data
    })
}
export const register = (data) => {
    return axios.request({
        url: 'http://localhost:3201/glt/users/register',
        method: 'post',
        data: data
    })
}