const {
  json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')
var sqltool = require('../module/sqltool');
/* GET users listing. */
/*用户注册*/
router.post('/register', async function (req, res, next) {
  try {
    //查重
    if (await sqltool.cnki('user', 'account', req.body.account)) {
      res.status(300).json({
        message: "该账号已被注册",
      })
    } else {
      var str = 'insert into user(account,password,name) values(?,?,?);'
      await sqlQuery(str, [req.body.account, req.body.password, req.body.name])
      res.status(200).json({
        message: "注册成功",
      })
    }
  } catch (error) {
    next(error)
  }
});

/*用户登录*/
router.post('/login', async function (req, res, next) {
  var str = "select * from user where account=?"
  var user = (await sqlQuery(str, [req.body.account]))[0]
  if (user && user.password == req.body.password) {
    res.status(200).json({
      code: 200,
      data: {
        userid: user.id
      },
      message: "登陆成功",
    })
  } else {
    res.status(200).json({
      code: 500,
      data: {
        userid: null
      },
      message: "登录失败",
    })
  }
});


module.exports = router;