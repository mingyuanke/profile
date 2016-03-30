var session=require('express-session');
var redisCon=require('connect-redis')(session);
var setting=require('../setting').sessionConf;
var connectR=new redisCon(setting);
module.exports=connectR;