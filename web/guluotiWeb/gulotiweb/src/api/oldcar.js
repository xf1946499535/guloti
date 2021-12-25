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