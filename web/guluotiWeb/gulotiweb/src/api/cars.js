import axios from 'axios'
export const getbrandlist = (intial) => {
    return axios.request({
        url: 'http://localhost:3201/glt/cars/getbrandlist',
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
    return axios.request({
        url: 'http://localhost:3201/glt/cars/getcarslist',
        method: 'get',
        params: {
            myscreen: screen
        }
    })
}
//获取单个汽车信息
export const getcarinfo = (id) => {
    return axios.request({
        url: 'http://localhost:3201/glt/cars/getcarinfo',
        method: 'get',
        params: {
            id: id
        }
    })
}