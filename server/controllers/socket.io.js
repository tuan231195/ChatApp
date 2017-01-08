var mongoose = require('mongoose');
var getChatForUsers = require("./chat").getChatForUsers;
var User = mongoose.model("User");
var Chat = mongoose.model("Chat");
module.exports = function (http) {
    var onlineUserMap = {};
    var io = require('socket.io')(http);
    io.on('connection', function (socket) {
            socket.on("online", function (user) {
                var isAnonymous = user.isAnonymous || false;
                console.log("User " + user.username + " is now connected");
                if (!onlineUserMap[user.username]) {
                    socket.broadcast.emit("online", {username: user.username});
                }
                onlineUserMap[user.username] = {
                    socketid: socket.id,
                    username: user.username,
                    image: user.image,
                    isAnonymous: isAnonymous
                };

                getUserList(function (allUsers) {
                    io.emit('userList', allUsers);
                });

                getOnlineList(function (allUsers) {
                    io.emit('onlineList', allUsers);
                });

            });

            socket.on("offline", function (user) {
                    var username = user.username;
                    console.log("User " + user.username + " is now offline");
                    if (onlineUserMap[username] && onlineUserMap[username].isAnonymous) {
                        User.remove({username: username}, function (err) {
                            if (err) {
                                console.error("Error removing user: " + err);
                                return;
                            }
                            Chat.remove({
                                "$or": [{
                                    "user1": username,
                                }, {
                                    "user2": username,
                                }]
                            }, function (err) {
                                if (err) {
                                    console.error("Error removing chat: " + err);
                                    return;
                                }
                                handleOffline(socket, username);
                            });
                        });
                    }
                    else {
                        handleOffline(socket, username);
                    }

                }
            );


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
        }
    );


    function getUserList(callback) {
        var allUsers = [];
        User.find(function (error, users) {
            if (error) {
                console.error(error);
                callback(allUsers);
                return;
            }
            for (var i = 0; i < users.length; i++) {
                var key = users[i].username;
                var online;
                if (!onlineUserMap[key]) {
                    online = false;
                }
                else {
                    online = true;
                }
                user = {username: users[i].username, online: online, image: users[i].image};
                allUsers.push(user);
            }
            callback(allUsers);
        });
    }

    function getOnlineList(callback) {
        var allUsers = [];
        for (var key in onlineUserMap) {
            user = {username: onlineUserMap[key].username, image: onlineUserMap[key].image};
            allUsers.push(user);
        }
        callback(allUsers);
    }

    function handleOffline(socket, username) {
        delete onlineUserMap[username];
        getUserList(function (allUsers) {
            socket.broadcast.emit('userList', allUsers);
        });
        getOnlineList(function (allUsers) {
            socket.broadcast.emit('onlineList', allUsers);
        });
        socket.broadcast.emit("offline", {username: username});
    }
};