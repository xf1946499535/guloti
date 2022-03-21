var sqlQuery = require('../module/lcMysql')

const comments = {
    //获取评论列表
    /*
        req.query.comment_type 评论来源'invitation'车友会评论，'car_news'资讯评论
        req.query.from_id 根据comment_type选择是那种内容的评论id
        req.query.reqnum 需要的请求的条数
        req.query.pagenum 需要请求的页面
     */
    async getcomments(req, res, next) {
        try {
            var str = `select user.name as username,comment.id as comment_id,comment.* from comment left join user on user.id=comment.userid`
            var term = ` where comment_type='${req.query.comment_type}'
            and from_id=${req.query.from_id} order by comment.id desc limit ${req.query.pagenum},${req.query.reqnum}`
            var sqlres = await sqlQuery(str + term)
            res.json({
                code: 20000,
                data: {
                    comments: sqlres
                },
                message: `请求成功`
            })
        } catch (error) {
            next(error)
        }
    },
    //添加评论
    /*
        req.body.comment_type 评论来源'invitation'车友会评论，'car_news'资讯评论
        req.body.from_id 根据comment_type选择是那种内容的评论id
        req.body.userid 发表评论的用户
        req.body.comment_content 评论内容
     */
    async addcomment(req, res, next) {
        try {

            var sqlstr = `insert into comment (comment_type,from_id,userid,comment_content,comment_time)
             value ('${req.body.comment_type}',${req.body.from_id},${req.body.userid},'${req.body.comment_content}','${new Date()}')`
            var sqlres = await sqlQuery(sqlstr)
            res.json({
                code: 20000,
                message: '添加成功'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = comments