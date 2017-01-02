export default class ChatboxController {
    constructor($state, $scope, AuthService, ChatService, $location, $timeout) {
        this.state = $state;
        this.scope = $scope;
        this.authService = AuthService;
        this.timeout = $timeout;
        this.sender = AuthService.currentUser();
        this.senderName = this.sender.username;
        this.chatService = ChatService;
        this.receiverName = $location.search().receiver;
        this.showTyping = false;
        this.messages = [];
        this.init();
    }

    init() {
        let currentUser = this.authService.currentUser();
        this.chatService.connect(currentUser);

        let ctrl = this;
        this.chatService.on("newMsg", function (data) {
            console.log(data);
            let message = {
                sender: ctrl.receiverName,
                receiver: ctrl.senderName,
                content: data.content,
                isSender: false,
                date: data.date
            };
            ctrl.messages.push(message);
        });
        this.chatService.emit("getChat", {user1: this.senderName, user2: this.receiverName});

        this.chatService.emit("getUser", {user: this.receiverName});

        this.chatService.on("user", function (user) {
            ctrl.receiver = user;
        });
        this.chatService.on("chat", function (chat) {
            angular.forEach(chat.messages, function (msg) {
                let message = {};
                if (msg.order) {
                    message.isSender = (chat.user1 === ctrl.senderName);
                }
                else {
                    message.isSender = (chat.user2 === ctrl.senderName);
                }
                message.content = msg.body;
                message.date = msg.date;
                message.sender = (message.isSender) ? ctrl.senderName : ctrl.receiverName;
                message.receiver = (message.isSender) ? ctrl.receiverName : ctrl.senderName;


                ctrl.messages.push(message);
            });
        });

        this.chatService.on("typing", function (user) {
            if (user.username === ctrl.receiverName) {
                ctrl.showTyping = true;
            }
        });

        this.chatService.on("untyping", function (user) {
            if (user.username === ctrl.receiverName) {
                ctrl.showTyping = false;
            }
        });
    }

    goBack() {
        this.state.go("index.online");
    }

    send() {
        if (!this.content.trim()) {
            return;
        }
        let message = {
            sender: this.senderName,
            receiver: this.receiverName,
            content: this.content,
            isSender: true,
            date: Date.now()
        };
        this.messages.push(message);
        this.content = "";
        this.chatService.emit("send", message);
    }

    typing() {
        this.isTyping = true;
        this.chatService.emit("typing", {sender: this.senderName, receiver: this.receiverName});
    }

    stopTyping() {
        let ctrl = this;
        this.isTyping = false;
        this.timeout(function () {
            if (ctrl.isTyping) {
                return;
            }
            ctrl.chatService.emit("untyping", {sender: ctrl.senderName, receiver: ctrl.receiverName});
        }, 1000);
    }

    $onDestroy() {
        this.chatService.getSocket().removeAllListeners();
    }
};

ChatboxController.$inject = ['$state', '$scope', 'AuthService', 'ChatService', '$location', '$timeout'];