var mongoose = require("mongoose");
var passport = require("passport");
var User = mongoose.model("User");

function sendJSONresponse(res, status, message) {
    res.status(status).json(message);
}

module.exports.login = function (req, res) {
    if (!req.body.username || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};


module.exports.signup = function (req, res) {
    if (!req.body.username || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
    var user = new User();
    user.username = req.body.username;
    user.image = "user" + (Math.floor(Math.random() * 5) + 1) + ".png";
    user.generateHash(req.body.password);
    user.save(function (err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};
