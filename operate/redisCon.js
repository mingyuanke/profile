var redis = require('redis');
var logs = require('./log');
var setting = require('../setting').dataBase;

var prefix = setting.prefix;
var client = redis.createClient({
    host: setting.host,
    port: setting.port 
});
client.on('Error', function(err) {
    logs.errorLog.error(err);
});
client.select(setting.db);

function redisOperate(operate, values, callback) {
  var keysOperate=['set','get','hset','hget'];
  var pValue=values;
  if(keysOperate.findIndex(value=>value===operate)>-1){
  	if(typeof pValue === 'array'){
  		pValue.forEach(cell=>cell[0]=prefix+cell[0])
  	}
  	else{
  		pValue[0]=prefix+pValue[0];
  		console.log(pValue[0])
  	}
  }
  client[operate](pValue);
}
module.exports = redisOperate;
