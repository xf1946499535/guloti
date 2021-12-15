//首页汽车资讯api
/*
    nums为获取数量，默认为10
 */
import axios from 'axios'
export const getnewslist = (nums = 10) => {
    return axios.request({
        url: 'http://localhost:3201/glt/news/carnewslist',
        method: 'get',
        params: {
            nums: nums
        }
    })
}

export const getnews = (id) => {
    return axios.request({
        url: 'http://localhost:3201/glt/news/carnews',
        method: 'get',
        params: {
            id: id
        }
    })
}