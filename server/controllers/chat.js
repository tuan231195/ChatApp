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

    try {
        getChatForUsers(user1, user2, function (chat) {
            sendJSONresponse(res, 200, chat);
        });
    }
    catch (e) {
        console.error(e);
        sendJSONresponse(res, 500, {error: "Cannot find chat"});
    }
};

module.exports.updateSeenTime = function (req, res) {
    if (!req.params.user1 || !req.params.user2) {
        sendJSONresponse(res, 400, {error: "Users are required"});
        return;
    }
    var user1 = req.params.user1;
    var user2 = req.params.user2;
    getChatForUsers(user1, user2, function (chat) {
        if (chat) {
            if (chat.user2 == user2) {
                chat.lastUser2Seen = new Date();
            }
            else {
                chat.lastUser1Seen = new Date();
            }
            chat.save(function (err) {
                if (err) {
                    sendJSONresponse(res, 500, {error: "Failed to update chat"});
                    return;
                }
                sendJSONresponse(res, 200, {});
            });
        }
        else {
            sendJSONresponse(res, 404, {error: "Chat not found"});
        }
    });
};


function getChatForUsers(user1, user2, callback) {
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
            throw err;
        }
        callback(chat);
    });
}

module.exports.getChatForUsers = getChatForUsers;


