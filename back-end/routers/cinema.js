// 影片数据接口
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';

// 获取影片列表
router.get('/list',function(req,res){
  var cityName = req.query.cityName
  cityName = cityName + '市';
  if (cityName !== '定位失败') {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
      if (err) {
        console.log('连接数据库失败', err)
        res.json({
          code: 1,
          msg: '网络异常，请重试'
        })
      } else {
        var db = client.db("maizuo");
        db.collection("cinema").find({
          cityName: cityName
        }).toArray(function (err,result) {
          if (err) {
            console.log('查询数据库失败', err);
            res.json({
              code: 1,
              msg: '错误'
            })
          } else {
            res.json({
              code: 0,
              msg: '查询成功',
              data: result
            })
          }
          client.close();
        })
      }
    })
  }
})

module.exports = router;