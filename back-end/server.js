// 引入模块
var express = require('express');
var app = express();

// 引入影片接口模块
var FilmRouter = require('./routers/film.js');

app.use('/api/film',FilmRouter);

app.listen('3000');
console.log('服务启动成功');
