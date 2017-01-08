var mongoose = require("mongoose");
var User = mongoose.model("User");
var Chat = mongoose.model("Chat");
function sendJSONresponse(res, status, message) {
    res.status(status).json(message);
}

module.exports.getUser = function (req, res) {
    if (!req.params.username) {
        sendJSONresponse(res, 400, {error: "username is required"});
        return;
    }

    User.findOne({"username": req.params.username}, function (err, user) {
        if (err) {
            sendJSONresponse(res, 500, {error: "Error getting user"});
            console.error(err);
            return;
        }
        sendJSONresponse(res, 200, user);
    });
};

module.exports.getChats = function (req, res) {
    if (!req.query.user) {
        sendJSONresponse(res, 400, {error: "username is required"});
        return;
    }
    var user = req.query.user;
    Chat.find({
        "$or": [{
            "user1": user,
        }, {
            "user2": user,
        }]
    }, {"messages": 0}).exec(function (err, allChats) {
        if (err) {
            sendJSONresponse(res, 500, {error: "Error getting chats"});
            console.error(err);
            return;
        }
        sendJSONresponse(res, 200, allChats);
    });
};


module.exports.getChat = function (req, res) {
    if (!req.query.user1 || !req.query.user2) {
        sendJSONresponse(res, 400, {error: "User is required"});
        return;
    }
    var user1 = req.query.user1;
    var user2 = req.query.user2;

    Chat.findOne({
        "$or": [{
            "user1": user1,
            "user2": user2
        }, {
            "user1": user2,
            "user2": user1
        }]
    }, function (err, chat) {
        if (err) {
            sendJSONresponse(res, 500, {error: "Cannot find chat"});
            console.error(err);
            return;
        }
        sendJSONresponse(res, 200, chat);
    });
};

module.exports.updateSeenTime = function (req, res) {

};

