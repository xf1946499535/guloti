import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'

export const getclublist = () => {
    return ln_axios.request({
        url: '/glt/club/getclublist',
        method: 'get',
    })
}