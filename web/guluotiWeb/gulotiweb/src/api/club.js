import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'

export const getclublist = () => {
    return ln_axios.request({
        url: '/glt/club/getclublist',
        method: 'get',
    })
}

export const getinvitationlist = (club_id) => {
    return ln_axios.request({
        url: '/glt/club/getinvitationlist',
        method: 'get',
        params: {
            club_id: club_id
        }
    })
}
export const addinvitation = (data) => {
    return lh_axios.request({
        url: '/glt/club/addinvitation',
        method: 'post',
        data: {
            club_id: data.club_id,
            userid: sessionStorage.getItem('myid'),
            brief_context: data.brief_context,
            detail_context: data.detail_context
        }
    })
}