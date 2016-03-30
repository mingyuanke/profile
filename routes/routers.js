var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.session = "sessionTest";
    res.render('index', { title: 'index',
    userName:'redis' });
});
router.get('/upload', function(req, res, next) {
    res.render('upload', { title: 'upload' });
})
router.post('/op-upload', function(req, res, next) {
    var reqData = JSON.parse(decodeURIComponent(req.body.data));
    var imgDate = reqData[0];
    var imageBuffer = decodeBase64Image(reqData[0].data);
    fs.writeFile('./logs/'+imgDate.fileName, imageBuffer.data, function(err) {
        if (err) {
            res.send(err)
        } else {
            res.send('success')
        }
    })
});

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

module.exports = function(app) {
    app.use('/', router);
}
