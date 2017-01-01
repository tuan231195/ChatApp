var express = require('express');
var jwt = require('express-jwt');
var multer = require('multer');

var auth = jwt({
    secret: process.env.JWT_SECRET
});

var multipartUpload = multer({
    storage: multer.diskStorage({

        destination: function (req, file, callback) {
            callback(null, __dirname + '/../../public/images');
        },
        filename: function (req, file, callback) {
            callback(null, req.user.username + '-' + Date.now() + ".png");
        }
    })
}).single('file[]');


var router = express.Router();

var controllers = require("../controllers/profile");

router.post('/upload', auth, multipartUpload, controllers.upload);

router.post('/update', auth, controllers.update);

module.exports = router;
