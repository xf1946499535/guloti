var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
var modusers = require('../module/users');
const {
    search
} = require('../routes/club');

const cars = {
    //根据首字母获取品牌列表
    async getbrandlist(req, res, next) {
        try {
            var str = 'select * from brand'
            var term = req.query.intial == -1 ? `` : ` where brand_intial='${req.query.intial}'`
            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //根据条件获取车辆列表(客户多条件查询)
    async getcarslist(req, res, next) {
        /*
        req.query.myscreen
          0：品牌id
          1：价格下限
          2:价格上限
          3:级别
        req.query.searchstr 用户输入的查询字符
        req.query.reqnum 需要返回的记录最大请求条数
        req.query.pagenum 需要返回的记录起点位置
        */
        try {
            var str = `select * from car where 1=1`
            var term = ''
            if (req.query.myscreen[0] != -1) {
                term += ` and car_brandid = '${req.query.myscreen[0]}'`
            }
            if (req.query.myscreen[1] != -1) {
                term += ` and car_price_low >= ${req.query.myscreen[1]} and car_price_high <= ${req.query.myscreen[2]}`
            }
            if (req.query.myscreen[3] != -1) {
                term += ` and car_type = '${req.query.myscreen[3]}'`
            }
            if (req.query.searchstr != '') {
                term += ` and car_name like '%${req.query.searchstr}%'`
            }
            term += ` order by id desc limit ${req.query.pagenum},${req.query.reqnum}`
            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //id获取单个车辆信息以及品牌基本信息
    async getcarinfo(req, res, next) {
        /*
            req.query.id
             车辆id
            */
        try {
            var str = `SELECT car.*,brand.brand_logo FROM car LEFT JOIN brand ON car.car_brandid=brand.id`
            var term = ` where car.id=${req.query.id}`
            var sqlres = await sqlQuery(str + term)
            res.status(200).json({
                code: 20000,
                message: "查询成功",
                data: sqlres
            })
        } catch (error) {
            next(error)
        }
    },

    //汽车购买信息提交
    /*
    req.body.carid:汽车id
    req.body.userid:购买人id
    req.body.order_type:订单类型(0:新车,1：二手车)
    req.body.sell_id:卖家id(新车为品牌id,二手车为卖家id)
    req.body.paypwd:支付密码
    */
    async buycar(req, res, next) {
        try {
            //获取车辆信息
            let carsql = await sqlQuery(`select * from car where id=${req.body.carid}`)
            let car = carsql[0]
            //支付密码验证
            let pwdcheck = await modusers.pwdcheck(req.body.userid, req.body.paypwd)
            if (!pwdcheck.check) {
                return res.json({
                    code: 20001,
                    message: "密码验证失败",
                })
            }
            //账户余额验证
            let balancecheck = await modusers.balancecheck(car.car_price_low, req.body.userid)
            if (!balancecheck.check) {
                return res.json({
                    code: 20001,
                    message: "账户余额不足",
                })
            }


            //账户扣费
            modusers.deduct(car.car_price_low, req.body.userid)
            //购买信息计入订单表
            //会返回一个插入sql对象,其中inserId为插入行的id
            var ordersql = await sqlQuery(`insert into car_order (carid,userid,order_time,order_type,sell_id) 
            values (${car.id},${req.body.userid},'${new Date()}',0,${car.car_brandid})`)

            var car_number = "川E 456E06"
            //汽车入库
            // console.log(`insert into barn (carid,userid,car_number,km,orderid) 
            // values (${car.id},${req.body.userid},'${car_number}',0,${ordersql.insertId})`);
            var barnsql = await sqlQuery(`insert into barn (carid,userid,car_number,km,orderid) 
            values (${car.id},${req.body.userid},'${car_number}',0,${ordersql.insertId})`)
            return res.json({
                code: 20000,
                message: "购买成功",
                data: {
                    car_number: car_number,
                    orderid: ordersql.insertId,
                    car: car
                }
            })
            //余额验证
        } catch (error) {
            next(error)
        }
    },

    //根据名字模糊搜索查询汽车
    /*
        req.query.searchstr 用户输入的查询字符
        req.query.reqnum 需要返回的最大值数量
     */
    async searchcar(req, res, next) {
        try {
            let sqlstr = `select * from car`
            let term = ` where car_name like '%${req.query.searchstr}%' limit ${req.query.reqnum}`
            let sqlres = await sqlQuery(sqlstr + term)
            return res.json({
                code: 20000,
                message: "查询成功",
                data: {
                    carlist: sqlres
                }
            })
        } catch (error) {
            next(error)
        }
    },
    //分配在线客服的id
    /*
    req.query.brandid 品牌名称
     */
    async disservicesock(req, res, next) {
        try {
            let sqlstr = `select id from user where companyid=${req.query.brandid} and isonline=1`
            let sqlres = await sqlQuery(sqlstr)
            if (sqlres.length == 0) {
                res.json({
                    code: 20001,
                    message: '抱歉，当前无客服在线，请稍后联系',
                })
            } else {
                let serviceid = sqlres[Math.floor(Math.random() * sqlres.length)].id;
                res.json({
                    code: 20000,
                    message: '请求成功',
                    data: serviceid
                })
            }
        } catch (error) {
            next(error)
        }
    },
    //新增汽车
    /*
    req.body.userid 上传者客服id
    req.body.car_name 汽车名字
    req.body.car_at 车辆变速箱型号
    req.body.car_engine 汽车引擎型号
    req.body.car_introduce 车辆介绍
    req.body.car_manufacture_addr 产地
    req.body.car_price_high 价格上限
    req.body.car_price_low 价格下限
    req.body.car_showimg 车展图
    req.body.car_type 车型
     */
    async addcar(req, res, next) {
        try {
            // console.log(req.body);
            //根据上传者id获取所属公司信息
            let brandstr = `select brand.*,user.companyid from user left join brand on brand.id=user.companyid where user.id=${req.body.userid}`
            let brandres = await sqlQuery(brandstr)
            let carstr = `insert into car (car_name,car_at,car_engine,car_introduce,car_manufacture_addr
                ,car_price_high,car_price_low,car_showimg,car_type,car_brand,car_brandid,
                car_manufacture_date,car_exhibition_list) value (?,?,?,?,?,?,?,?,?,?,?,?,?)`
            let data = [
                req.body.car_name,
                req.body.car_at,
                req.body.car_engine,
                req.body.car_introduce,
                req.body.car_manufacture_addr,
                req.body.car_price_high,
                req.body.car_price_low,
                req.body.car_showimg,
                req.body.car_type,
                brandres[0].brand_name,
                brandres[0].id,
                modusers.getCurrentTime(),
                'https://p3-dcd.byteimg.com/img/tos-cn-i-0000/0bedbb2a599248d2b4a5d33f8ec85a01~tplv-resize:2048:0.jpg$https://p3-dcd.byteimg.com/img/tos-cn-i-0000/695fdce6ec8e4d19a3fd08d42c64f644~tplv-resize:2048:0.jpg$https://p1-dcd.byteimg.com/img/tos-cn-i-0000/d1b1234e480f424eb437abe294fc08b9~tplv-resize:2048:0.jpg'
            ]
            let carres = await sqlQuery(carstr, data)
            res.json({
                code: 20000,
                message: '操作成功',
                data: carres[0]
            })
            // let sqlstr = `insert into car ()`
        } catch (error) {
            next(error)
        }

    },
    //更新汽车
    /*
    req.body.id 更新的汽车id
    req.body.car_name 汽车名字
    req.body.car_at 车辆变速箱型号
    req.body.car_engine 汽车引擎型号
    req.body.car_introduce 车辆介绍
    req.body.car_manufacture_addr 产地
    req.body.car_price_high 价格上限
    req.body.car_price_low 价格下限
    req.body.car_showimg 车展图
    req.body.car_type 车型
     */
    async updatecar(req, res, next) {
        try {
            // console.log(req.body);
            //根据上传者id获取所属公司信息
            // let brandstr = `select brand.*,user.companyid from user left join brand on brand.id=user.companyid where user.id=${req.body.userid}`
            // let brandres = await sqlQuery(brandstr)
            let carstr = `update car set car_name=?,car_at=?,car_engine=?,car_introduce=?,car_manufacture_addr=?
                ,car_price_high=?,car_price_low=?,car_showimg=?,car_type=? where id=?`
            let data = [
                req.body.car_name,
                req.body.car_at,
                req.body.car_engine,
                req.body.car_introduce,
                req.body.car_manufacture_addr,
                req.body.car_price_high,
                req.body.car_price_low,
                req.body.car_showimg,
                req.body.car_type,
                req.body.id
            ]
            let carres = await sqlQuery(carstr, data)
            res.json({
                code: 20000,
                message: '操作成功',
                data: carres[0]
            })
            // let sqlstr = `insert into car ()`
        } catch (error) {
            next(error)
        }

    },
    //删除资讯
    /*
    req.body.id 资讯id
     */
    async delcar(req, res, next) {
        try {
            let sqlstr = `delete from car where id=${req.body.id}`
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
module.exports = cars