// 用户登录接口
var express = require("express");
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017";
var async = require("async");

router.post("/login", function(req, res) {
  var phoneNum = req.body.params.phone;
  var phoneCode = req.body.params.code;
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        console.log("连接数据库失败", err);
        res.json({
          code: 1,
          msg: "网络异常，请稍后重试"
        });
      } else {
        var db = client.db("maizuo");
        db.collection("user")
          .find({
            phone: phoneNum,
            code: phoneCode
          })
          .count(function(err, num) {
            if (err) {
              console.log("查询数据失败", err);
              res.json({
                code: 1,
                msg: "网络繁忙，请稍后重试"
              });
            } else {
              if (num === 0) {
                res.json({
                  code: 1,
                  msg: "手机号不存在或输入有误"
                });
              }
              if (num === 1) {
                res.json({
                  code: 0,
                  msg: "登录成功"
                });
              }
            }
          });
      }
    }
  );
});

router.post("/register", function(req, res) {
  var phoneNum = req.body.params.phone;
  var phoneCode = req.body.params.code;

  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      if (err) {
        console.log("连接数据库失败", err);
        cb({
          code: 1,
          msg: "网络异常，请稍后重试"
        });
        return;
      }
      var db = client.db("maizuo");

      async.waterfall(
        [
          function(cb) {
            db.collection("user")
              .find({
                phone: phoneNum
              })
              .count(function(err, num) {
                if (err) {
                  console.log("查询数据失败", err);
                  cb({
                    code: 1,
                    msg: "网络繁忙，请稍后重试"
                  });
                } else {
                  cb(null, num);
                }
              });
          },
          function(num, cb) {
            if (num === 1) {
              cb({
                code: 1,
                msg: "此手机号已注册"
              });
            } else {
              db.collection("user").insertOne(
                {
                  phone: phoneNum,
                  code: phoneCode
                },
                function(err) {
                  if (err) {
                    cb({
                      code: 1,
                      msg: "注册失败"
                    });
                  } else {
                    cb(null);
                  }
                }
              );
            }
          }
        ],
        function(err, result) {
          if (err) {
            res.json(err);
          } else {
            res.json({
              code: 0,
              msg: "注册成功"
            });
          }
          client.close();
        }
      );
    }
  );
});

module.exports = router;
