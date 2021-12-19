import axios from 'axios'
export const getnewslist = (intial) => {
    return axios.request({
        url: 'http://localhost:3201/glt/cars/getbrandlist',
        method: 'get',
        params: {
            intial: intial
        }
    })
}

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