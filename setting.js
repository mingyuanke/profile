var config={
	sessionConf:{
        host:'10.1.243.137',
        port:'6379',
        db:1,
        pass:'',
        prefix:'session:'
    },
    sessionSecret:'cat',
    sessionAge:1000*60*1,
    logSetting:{
        "appenders": [
            {
                type:'console',
                category:'console'
            },
            {
                "type": "file",
                "filename": "./logs/info.log",
                "maxLogSize": 120480,
                "backups": 3,
                "category": "info"
            },
            {
                "type": "file",
                "absolute": true,
                "filename": "./logs/error.log",
                "maxLogSize": 120480,
                "backups": 10,
                "category": "error"
            }
        ],
        replaceConsole:true
    },
    dataBase:{
        host:'10.1.243.137',
        port:'6379',
        db:2,
        prefix:'data:'
    }
}
module.exports = config;