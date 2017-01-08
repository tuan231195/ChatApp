export default class ChatboxController {
    constructor($state, $http, $scope, AuthService, ChatService, $location, $timeout, $window) {
        this.state = $state;
        this.scope = $scope;
        this.http = $http;
        this.authService = AuthService;
        this.timeout = $timeout;
        this.sender = AuthService.currentUser();
        this.senderName = this.sender.username;
        this.chatService = ChatService;
        this.receiverName = $location.search().receiver;
        this.showTyping = false;
        this.messages = [];
        this.window = $window;
        this.init();
    }

    init() {
        let currentUser = this.authService.currentUser();
        this.chatService.connect(currentUser);
        this.chatService.on("newMsg", (data) => {
            console.log(data);
            let message = {
                sender: this.receiverName,
                receiver: this.senderName,
                content: data.content,
                isSender: false,
                date: data.date
            };
            this.messages.push(message);
        });

        this.http.get("/chat/single?user1=" + this.receiverName + "&user2=" + this.senderName, {headers: {Authorization: 'Bearer ' + this.authService.getToken()}}).then((response) => {
            let chat = response.data;
            if (!chat)
                return;

            console.log(chat);
            this.http.get("/chat/user/" + this.receiverName, {headers: {Authorization: 'Bearer ' + this.authService.getToken()}}).then((response) => {
                this.receiver = response.data;
            }, (error) => {
                console.error(error.data);
            });
            angular.forEach(chat.messages, (msg) => {
                let message = {};
                if (msg.order) {
                    message.isSender = (chat.user1 === this.senderName);
                }
                else {
                    message.isSender = (chat.user2 === this.senderName);
                }
                message.content = msg.body;
                message.date = msg.date;
                message.sender = (message.isSender) ? this.senderName : this.receiverName;
                message.receiver = (message.isSender) ? this.receiverName : this.senderName;
                this.messages.push(message);
            });
        }, (error) => {
            console.error(error.data);
        });


        this.chatService.on("typing", (user) => {
            if (user.username === this.receiverName) {
                this.showTyping = true;
            }
        });

        this.chatService.on("untyping", (user) => {
            if (user.username === this.receiverName) {
                this.showTyping = false;
            }
        });
    }

    goBack() {
        this.window.history.back();
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
        this.isTyping = false;
        this.timeout(() => {
            if (this.isTyping) {
                return;
            }
            this.chatService.emit("untyping", {sender: this.senderName, receiver: this.receiverName});
        }, 1000);
    }

    $onDestroy() {
        if (this.messages.length != 0) {
            this.http.post("/chat/updateSeenTime/" + this.receiverName + "/" + this.senderName, {}, {headers: {Authorization: 'Bearer ' + this.authService.getToken()}}).then(() => {
            }, (error) => {
                console.error(error.data);
            });
            this.chatService.getSocket().off("newMsg");
            this.chatService.getSocket().off("user");
            this.chatService.getSocket().off("chat");
            this.chatService.getSocket().off("typing");
            this.chatService.getSocket().off("untyping");
        }
    }
};

ChatboxController.$inject = ['$state', '$http', '$scope', 'AuthService', 'ChatService', '$location', '$timeout', '$window'];