const {
    json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users')

const club = {
    //获取车友会列表相关信息
    async getclublist(req, res, next) {
        try {

            var sqlres = await sqlQuery(`select club.*,club.id as club_id,brand.* from club left join brand on club.brandid=brand.id`)
            return res.json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(err)
        }
    },
    //获取论坛列表(简要信息，不包含具体内容)
    /*
        req.query.club_id 车友会id
    */
    async getinvitationlist(req, res, next) {
        try {
            var str1 = `select invitation.id as invitation_id,invitation.clubid,invitation.userid,invitation.brief_context,invitation.time,user.name,user.headimg from invitation left join user on invitation.userid=user.id where invitation.clubid=${req.query.club_id} order by invitation.id desc`
            var str2 = `select invitation.id as invitation_id,invitation.*,user.name,user.headimg from invitation left join user on invitation.userid=user.id where invitation.clubid=${req.query.club_id} order by invitation.id desc`
            var sqlres = await sqlQuery(str2)
            return res.json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //发布帖子
    /*
        req.body.club_id 车友会id
        req.body.userid 发帖人id
        req.body.brief_context 帖子简介
        req.body.detail_context 帖子具体内容
    */
    async addinvitation(req, res, next) {

        try {
            var sqlres = await sqlQuery(`insert into invitation (clubid,userid,brief_context,detail_context,time) 
             values (${req.body.club_id},${req.body.userid},'${req.body.brief_context}','${req.body.detail_context}','${new Date()}')`)
            return res.json({
                code: 20000,
                message: "发布成功",
                data: req.body
            })
        } catch (error) {
            next(error)
        }
    }

}


module.exports = club