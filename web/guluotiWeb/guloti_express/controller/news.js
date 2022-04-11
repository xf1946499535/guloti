var sqlQuery = require('../module/lcMysql')
var modusers = require('../module/users')
const news = {
    ///*资讯列表查询*/
    /*
    req.query.pagenum 请求页面
    req.query.reqnum 请求条数
     */
    async carnewslist(req, res, next) {
        try {
            var str = `select * from car_news order by id desc limit ${req.query.pagenum},${req.query.reqnum}`
            var sqlres = await sqlQuery(str)
            res.json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },
    /*单条资讯查询*/
    /*req.query.id 请求资讯id
     */
    async carnews(req, res, next) {
        try {
            var str = `select * from car_news where id=${req.query.id}`
            var sqlres = await sqlQuery(str)
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres[0]
            })
        } catch (error) {
            next(error)
        }
    },
    //新增资讯
    /*
        req.body.news_title 新闻标题
        req.body.news_headimg_url 新闻简图url
        req.body.news_content_type 新闻种类
        req.body.news_video_url 新闻视频地址
        req.body.news_text 新闻文本内容
     */
    async addnews(req, res, next) {
        try {

            var str = `insert into car_news (news_title,news_headimg_url,news_content_type,news_video_url,news_text,news_time) value (?,?,?,?,?,?)`
            let sqldata = [
                req.body.news_title,
                req.body.news_headimg_url,
                req.body.news_content_type,
                req.body.news_video_url,
                req.body.news_text,
                modusers.getCurrentTime()
            ]
            // console.log(sqldata);
            var sqlres = await sqlQuery(str, sqldata)
            res.json({
                code: 20000,
                message: "查询成功",
                data: sqlres[0]
            })
        } catch (error) {
            // console.log(error);
            next(error)
        }
    },

    //更新资讯
    /*
        req.body.id 资讯id
        req.body.news_title 新闻标题
        req.body.news_headimg_url 新闻简图url
        req.body.news_content_type 新闻种类
        req.body.news_video_url 新闻视频地址
        req.body.news_text 新闻文本内容
     */
    async updatenews(req, res, next) {
        try {
            var str = `update car_news set news_title=?,news_headimg_url=?,news_content_type=?,news_video_url=?,news_text=?,news_time=? where id=?`
            let sqldata = [
                req.body.news_title,
                req.body.news_headimg_url,
                req.body.news_content_type,
                req.body.news_video_url,
                req.body.news_text,
                modusers.getCurrentTime(),
                req.body.id
            ]
            console.log(sqldata);
            var sqlres = await sqlQuery(str, sqldata)
            res.json({
                code: 20000,
                message: "查询成功",
                data: sqlres[0]
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    //删除资讯
    /*
    req.body.id 资讯id
     */
    async delnews(req, res, next) {
        try {
            let sqlstr = `delete from car_news where id=${req.body.id}`
            let sqlres = await sqlQuery(sqlstr)
            res.json({
                code: 20000,
                message: "操作成功",
                data: sqlres[0]
            })
        } catch (error) {
            next(error)
        }
    }

}
module.exports = news