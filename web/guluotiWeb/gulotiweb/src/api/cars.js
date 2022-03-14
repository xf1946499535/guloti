import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'
export const getbrandlist = (intial) => {
    return ln_axios.request({
        url: '/glt/cars/getbrandlist',
        method: 'get',
        params: {
            intial: intial
        }
    })
}
//筛选数组获取汽车列表
/*
myscreen:多条件筛选数组,0:品牌 1/2：价格下限上限 3:车型
searchstr:默认为空，用于车名模糊查询
reqnum:数据条数，默认16
pagenum:数据起点，默认0
 */
export const getcarslist = (myscreen, searchstr = '', reqnum = 16, pagenum = 0) => {
    var screen = [];
    myscreen.forEach((item, index) => {
        screen[index] = item == "不限" ? -1 : item;
    });
    return ln_axios.request({
        url: '/glt/cars/getcarslist',
        method: 'get',
        params: {
            myscreen: screen,
            searchstr: searchstr,
            reqnum: reqnum,
            pagenum: pagenum
        }
    })
}
//获取单个汽车信息
export const getcarinfo = (id) => {
    return ln_axios.request({
        url: '/glt/cars/getcarinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}

//获取完成汽车购买
export const buycar = (buycarform) => {
    //此接口仅仅用来测试了登陆拦截，暂未开发后台相应接口
    return lh_axios.request({
        url: '/glt/cars/buycar',
        method: 'post',
        data: buycarform
    })
}

//模糊查询获取汽车列表信息
export const searchcar = (params) => {
    return lh_axios.request({
        url: '/glt/cars/searchcar',
        method: 'get',
        params: {
            searchstr: params.searchstr,
            reqnum: params.reqnum
        }
    })
}