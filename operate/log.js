var log4js = require('log4js');
var setting = require('../setting').logSetting;
log4js.configure(setting);
var conLog = log4js.getLogger('console');
var infoLog = log4js.getLogger('info');
var errorLog = log4js.getLogger('error');
module.exports = {
    conLog: conLog,
    infoLog: infoLog,
    errorLog: errorLog
};
