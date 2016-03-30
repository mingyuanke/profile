//test.js
var redis=require('redis');
var logs=require('./operate/log');

var client=redis.createClient({
	host:'10.1.243.137',
	port:'6379'
});
client.set('test1','333')
logs.errorLog.error('----------------------');