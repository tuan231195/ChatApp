var mongoose = require('mongoose');
var User = mongoose.model("User");
var Chat = mongoose.model("Chat");
module.exports = function (http) {
    var onlineUserMap = {};
    var io = require('socket.io')(http);
    io.on('connection', function (socket) {
        socket.on("login", function (user) {
            console.log("User " + user.username + " is now connected");
            onlineUserMap[user.username] = {socketid: socket.id, username: user.username, image: user.image};
            getUserList(function (allUsers) {
                io.emit('userList', allUsers);
            });

            socket.broadcast.emit("login", {username: user.username});
        });

        socket.on("getUser", function (query) {
            if (!query.user) {
                return;
            }
            User.findOne({"username": query.user}, function (err, user) {
                if (err) {
                    console.error(err);
                    return;
                }
                tmp = {username: user.username, image: user.image};
                socket.emit("user", tmp);
            });
        });
        socket.on("logout", function (username) {
            delete onlineUserMap[username];
            getUserList(function (allUsers) {
                socket.broadcast.emit('userList', allUsers);
            });
            socket.broadcast.emit("logout", {username: user.username});
        });

        socket.on("getAll", function (user) {
            updateInboxes(socket, user);
        });


        socket.on("getChat", function (chat) {
            getChatForUsers(chat.user1, chat.user2, function (chat) {
                if (chat) {
                    socket.emit("chat", chat);
                }
            });
        });

        socket.on("typing", function (chat) {
            if (onlineUserMap[chat.receiver]) {
                var socketid = onlineUserMap[chat.receiver].socketid;
                socket.broadcast.to(socketid).emit("typing", {
                    username: chat.sender
                });
            }
        });

        socket.on("untyping", function (chat) {
            if (onlineUserMap[chat.receiver]) {
                var socketid = onlineUserMap[chat.receiver].socketid;
                socket.broadcast.to(socketid).emit("untyping", {
                    username: chat.sender
                });
            }
        });

        socket.on("send", function (message) {
            console.log(message.sender + " sends message to " + message.receiver + ": " + message.content);
            getChatForUsers(message.sender, message.receiver, function (chat) {
                var tmp = {};
                if (!chat) {
                    chat = new Chat();
                    chat.user1 = message.sender;
                    chat.user2 = message.receiver;
                }
                if (chat.user1 == message.sender) {
                    tmp.order = true;
                }
                else {
                    tmp.order = false;
                }
                tmp.body = message.content;
                chat.messages.push(tmp);
                chat.lastMessage = tmp.body;
                chat.lastChatTime = Date.now();

                chat.save(function (err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    if (!onlineUserMap[message.receiver]) {
                        return;
                    }
                    var socketid = onlineUserMap[message.receiver].socketid;
                    socket.broadcast.to(socketid).emit("newMsg", {
                        sender: message.sender,
                        content: message.content,
                        date: message.date
                    });
                });
            });
        });
    });

    function getUserList(callback) {
        var allUsers = [];
        for (var key in onlineUserMap) {
            var userObj = onlineUserMap[key].username;
            user = {username: onlineUserMap[key].username, online: true, image: onlineUserMap[key].image};
            allUsers.push(user);
        }
        User.find(function (error, users) {
            if (error) {
                console.error(error);
                callback(allUsers);
                return;
            }
            for (var i = 0; i < users.length; i++) {
                var key = users[i].username;
                if (!onlineUserMap[key]) {
                    user = {username: users[i].username, online: false, image: users[i].image};
                    allUsers.push(user);
                }
            }
            callback(allUsers);
        });
    }

    function getChatForUsers(user1, user2, callback) {
        Chat.find({
            "$or": [{
                "user1": user1,
                "user2": user2
            }, {
                "user1": user2,
                "user2": user1
            }]
        }).exec(function (err, chat) {
            if (err) {
                console.error(err);
                return;
            }
            if (chat && chat.length !== 0) {
                callback(chat[0]);
            }
            else {
                callback(null);
            }
        });
    }

    function getUserInboxes(user, callback) {
        Chat.find({
            "$or": [{
                "user1": user,
            }, {
                "user2": user,
            }]
        }).exec(function (err, allChats) {
            if (err) {
                console.error(err);
                return;
            }
            if (allChats) {
                callback(allChats);
            }
            else {
                callback(null);
            }
        });
    }

    function updateInboxes(socket, user) {
        getUserInboxes(user.username, function (allInboxes) {
            if (allInboxes) {
                socket.emit("allInboxes", allInboxes);
            }
        });
    }
};