var sqlQuery = require('../module/lcMysql')
const modusers = {
    //密码验证
    /*
    userid:需要验证的用户id
    inpwd:需要检验的密码
    */
    async pwdcheck(userid, inpwd) {
        var str = `select * from user where id=${userid}`
        var sqlres = await sqlQuery(str)
        var relpwd = sqlres[0].password
        return {
            check: relpwd == inpwd ? true : false
        }
    },
    //用户余额验证
    /*
    根据不同商品表进行验证
        price:价格
        userid:购买人id
     */
    async balancecheck(price, userid) {
        var userres = await sqlQuery(`select * from user where id=${userid}`)
        return {
            check: price < userres[0].balance ? true : false
        }
    },
    //用户扣费
    /*
    money:交易额
    userid:用户id
     */
    async deduct(money, userid) {
        console.log(money);
        console.log(userid);
        var userres = await sqlQuery(`select * from user where id=${userid}`)
        sqlQuery(`update user set balance=${userres[0].balance-money} where id=${userid}`)
    },
    //用户到账
    /*
    money:交易额
    userid:用户id
     */
    async addduct(money, userid) {
        var userres = await sqlQuery(`select * from user where id=${userid}`)
        sqlQuery(`update user set balance=${userres[0].balance+money} where id=${userid}`)
    },
    //获取当前时间
    getCurrentTime() {
        var date = new Date(); //当前时间
        var year = date.getFullYear() //返回指定日期的年份
        var month = modusers.repair(date.getMonth() + 1); //月
        var day = modusers.repair(date.getDate()); //日
        var hour = modusers.repair(date.getHours()); //时
        var minute = modusers.repair(date.getMinutes()); //分
        var second = modusers.repair(date.getSeconds()); //秒
        //当前时间 
        var curTime = year + "-" + month + "-" + day +
            " " + hour + ":" + minute + ":" + second;
        return curTime;
    },
    //补0
    repair(i) {
        if (i >= 0 && i <= 9) {
            return "0" + i;
        } else {
            return i;
        }
    }
}

module.exports = modusers