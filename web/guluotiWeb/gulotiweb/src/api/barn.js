import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'

export const getcarsinbarn = (id) => {
    return lh_axios.request({
        url: '/glt/barn/getcarsinbarn',
        method: 'get',
        params: {
            userid: sessionStorage.getItem('myid')
        }
    })
}
export const sellcar = (data) => {
    return lh_axios.request({
        url: '/glt/barn/sellcar',
        method: 'post',
        data: {
            barnid: data.barnid,
            paypassword: data.paypassword,
            pricing: data.pricing
        }
    })
}

export const giveupsell = (data) => {
    return lh_axios.request({
        url: '/glt/barn/giveupsell',
        method: 'post',
        data: {
            barnid: data.barnid,
        }
    })
}