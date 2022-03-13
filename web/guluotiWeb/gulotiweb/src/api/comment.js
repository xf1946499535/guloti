//评论

import axios from 'axios'
import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'

export const getcomments = (params) => {
    return ln_axios.request({
        url: '/glt/comments/getcomments',
        method: 'get',
        params: {
            comment_type: params.comment_type,
            from_id: params.from_id,
            reqnum: params.reqnum,
            pagenum: params.pagenum
        }
    })
}

export const addcomment = (data) => {
    return lh_axios.request({
        url: '/glt/comments/addcomment',
        method: 'post',
        data: {
            comment_type: data.comment_type,
            from_id: data.from_id,
            userid: data.userid,
            comment_content: data.comment_content
        }
    })
}