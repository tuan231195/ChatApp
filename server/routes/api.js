var express = require('express');
var router = express.Router();

var controllers = require("../controllers/authentication");

/* GET home page. */
router.post('/login', controllers.login);
router.post('/register', controllers.signup);

module.exports = router;
