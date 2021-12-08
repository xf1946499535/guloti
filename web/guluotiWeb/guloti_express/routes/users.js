const {
  json
} = require('express');
var express = require('express');
var router = express.Router();
var sqlQuery = require('../module/lcMysql')

/* GET users listing. */
router.post('/register', async function (req, res, next) {
  try {
    var str = 'insert into user(account,password,name) values(?,?,?);'
    await sqlQuery(str, [req.body.account, req.body.password, req.body.name])
    res.json({
      code: 200,
      message: "注册成功",
      data: req.body
    })
  } catch (error) {
    res.json(error)
  }
});

module.exports = router;