// 影片数据接口
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';
var async = require('async');

// 获取影片列表
router.get('/list',function(req,res){
  // 当前页数
  var pageNum = parseInt(req.query.pageNum) || 1;
  // 页条数
  var pageSize = parseInt(req.query.pageSize) || 5;
  // 影片类型
  var type = parseInt(req.query.type) || 1;
  console.log(pageNum)

  // 根据数据里的时间戳判断已上映还是即将上映，查询对应类型的所有数据 —— premiereAt
  // 定义查询条件
  var timestamp = {};
  if ( type === 1 ) {
    timestamp = {
      premiereAt : { $lt: new Date().getTime() / 1000 }
    }
    console.log(timestamp)
  } else {
    timestamp = {
      premiereAt : { $gt: new Date().getTime() / 1000 }
    }
    console.log(timestamp)
  }

  MongoClient.connect(url, { useNewUrlParser: true }, function (err,client) {
    if (err) {
      console.log('连接数据库失败',err);
      res.json({
        code: 1,
        msg: '网络异常，请稍后重试'
      });
    } else {
      var db = client.db ('maizuo');
      async.waterfall ([
        function (cb) {
          // 查询符合数据的总条数
          db.collection('film').find(timestamp).count(function (err,num) {
            if (err) {
              cb (err);
            } else {
              cb (null,num);
            }
          })
        },

        function (num,cb) {
          // 查询对应请求的数据
          db.collection('film').find(timestamp).skip(pageSize * pageNum - pageSize).limit(pageSize).toArray(function (err,data) {
            if (err) {
              cb (err)
            } else {
              cb (null,{ num: num, data: data })
            }
          })
        }

      ], function (err,result) {
        if (err) {
          console.log(err);
          res.json({
            code: 1,
            msg: '访问出错'
          })
        } else {
          console.log(result.num);
          res.json({
            code: 0,
            msg: '请求成功',
            data: {
              film: result.data,
              tatal: result.num
            }
          })
        }
        client.close();
      })
    }
  })
});

// 根据id获取详情页数据
router.get('/details',function(req,res) {
  var filmId = Number(req.query.filmId);
  console.log(filmId)
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client){
    if (err) {
      console.log('连接数据库失败',err)
      res.json({
        code: 0,
        msg: '网络异常，请稍后重试'
      })
      return
    }
    var db = client.db('maizuo');
    db.collection('details').find({ "filmId": filmId}).toArray(function (err,result) {
      console.log(result)
      if (err) {
        console.log('查询数据失败',err)
        res.json({
          code: 0,
          msg: '错误'
        })
        return
      }
      res.json({
        code: 1,
        msg: '请求成功',
        data: result
      })
      client.close();
    })
  })
})

module.exports = router;