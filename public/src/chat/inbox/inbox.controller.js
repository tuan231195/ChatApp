export default class InboxController {
    constructor(AuthService, ChatService, $scope, $location) {
        this.authService = AuthService;
        this.senderName = AuthService.currentUser().username;
        this.chatService = ChatService;
        this.location = $location;
        this.scope = $scope;
        this.messages = [];
        this.init();
    }

    init() {
        this.chatService.emit("getAll", {username: this.senderName});
        var ctrl = this;
        this.chatService.on("allInboxes", function (allInboxes) {
            ctrl.messages = [];
            angular.forEach(allInboxes, function (inbox) {
                let message = {};
                message.from = (inbox.user1 === ctrl.senderName) ? inbox.user2 : inbox.user1;
                message.content = inbox.lastMessage;
                message.date = inbox.lastChatTime;
                ctrl.messages.push(message);
            });
        });

        this.chatService.on("newMsg", function () {
            ctrl.chatService.emit("getAll", {username: ctrl.senderName});
        });

        this.scope.$on("inboxSearch", function (event, data) {
            ctrl.search = data.search;
        });
    }

    goToChat(user) {
        this.location.path("/chatbox").search({receiver: user});
    }

    $onDestroy() {
        this.chatService.getSocket().removeAllListeners();
    }
};

InboxController.$inject = ['AuthService', 'ChatService', '$scope', "$location"];