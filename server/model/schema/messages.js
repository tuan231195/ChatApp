var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
    order: {type: Boolean, default: true},
    date: {type: Date, default: Date.now()},
    body: {type: String, required: true}
});

var chatSchema = new mongoose.Schema({
    user1: {type: String, required: true},
    user2: {type: String, required: true},
    lastChatTime: {type: Date, default: Date.now()},
    lastMessage: {type: String},
    messages: [messageSchema]
});

mongoose.model("Chat", chatSchema);