// 引入模块
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// 引入影片接口模块
var FilmRouter = require('./routers/film.js');
var UserRouter = require('./routers/user.js');
var CinemaRouter = require('./routers/cinema.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/film',FilmRouter);
app.use('/api/user',UserRouter);
app.use('/api/cinema',CinemaRouter);

app.listen('3000');
console.log('服务启动成功');
