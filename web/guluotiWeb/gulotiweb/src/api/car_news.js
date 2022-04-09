import ln_axios from '@/utils/locnor'
import lh_axios from '@/utils/lochttp'
//首页汽车资讯列表
/*
    pagenum为获取数量，默认为10
    reqnum为请求页面,默认为0
 */
export const getnewslist = (pagenum = 0, reqnum = 10) => {
    return ln_axios.request({
        url: '/glt/news/carnewslist',
        method: 'get',
        params: {
            pagenum: pagenum,
            reqnum: reqnum
        }
    })
}
//获取单个资讯
export const getnews = (id) => {
    return ln_axios.request({
        url: '/glt/news/carnews',
        method: 'get',
        params: {
            id: id
        }
    })
}
//新增资讯
export const addnews = (data) => {
    return ln_axios.request({
        url: '/glt/news/addnews',
        method: 'post',
        data: {
            news_title: data.news_title,
            news_headimg_url: data.news_headimg_url,
            news_content_type: data.news_content_type,
            news_video_url: data.news_video_url,
            news_text: data.news_text,
        }
    })
}
//更新资讯
export const updatenews = (data) => {
    return ln_axios.request({
        url: '/glt/news/updatenews',
        method: 'post',
        data: {
            id: data.id,
            news_title: data.news_title,
            news_headimg_url: data.news_headimg_url,
            news_content_type: data.news_content_type,
            news_video_url: data.news_video_url,
            news_text: data.news_text,
        }
    })
}
//删除资讯
export const delnews = (id) => {
    return ln_axios.request({
        url: '/glt/news/delnews',
        method: 'post',
        data: {
            id: id,
        }
    })
}