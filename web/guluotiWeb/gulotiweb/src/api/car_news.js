import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'
//首页汽车资讯api
/*
    nums为获取数量，默认为10
 */
import axios from 'axios'
export const getnewslist = (nums = 10) => {
    return ln_axios.request({
        url: '/glt/news/carnewslist',
        method: 'get',
        params: {
            nums: nums
        }
    })
}

export const getnews = (id) => {
    return ln_axios.request({
        url: '/glt/news/carnews',
        method: 'get',
        params: {
            id: id
        }
    })
}