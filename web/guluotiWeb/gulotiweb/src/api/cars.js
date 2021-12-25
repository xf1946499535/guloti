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
export const getcarslist = (myscreen) => {
    var screen = [];
    myscreen.forEach((item, index) => {
        screen[index] = item == "不限" ? -1 : item;
    });
    return ln_axios.request({
        url: '/glt/cars/getcarslist',
        method: 'get',
        params: {
            myscreen: screen
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