//首页汽车资讯api
/*
    nums为获取数量，默认为10
 */
import axios from 'axios'
export const getnews = (nums = 10) => {
    return axios.request({
        url: 'http://localhost:3201/glt/news/carnewslist',
        method: 'get',
        params: {
            nums: nums
        }
    })
}