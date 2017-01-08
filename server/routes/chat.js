var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var controllers = require("../controllers/chat");
var auth = jwt({
    secret: process.env.JWT_SECRET
});

/* GET home page. */
router.get('/user/:username', auth, controllers.getUser);
router.get('/', auth, controllers.getChats);
router.get('/single', auth, controllers.getChat);
router.post('/updateSeenTime/:user1/:user2', auth, controllers.updateSeenTime);

module.exports = router;
