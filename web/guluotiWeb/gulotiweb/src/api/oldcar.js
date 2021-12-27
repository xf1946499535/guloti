import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'
export const getoldcarlist = (intial) => {
    return ln_axios.request({
        url: '/glt/oldcar/oldcarlist',
        method: 'get',
        params: {
            intial: intial
        }
    })
}

export const getoldcar = (barn_id) => {
    return ln_axios.request({
        url: '/glt/oldcar/getoldcar',
        method: 'get',
        params: {
            barn_id: barn_id
        }
    })
}

export const buyoldcar = (data) => {
    return ln_axios.request({
        url: '/glt/oldcar/buyoldcar',
        method: 'post',
        data: {
            barn_id: data.barn_id,
            userid: data.userid,
            order_type: data.order_type,
            sell_id: data.sell_id,
            paypwd: data.paypwd,
        }
    })
}