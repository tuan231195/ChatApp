export default class InboxController {
    constructor(AuthService, $http, ChatService, $scope, $location) {
        this.authService = AuthService;
        this.senderName = AuthService.currentUser().username;
        this.http = $http;
        this.chatService = ChatService;
        this.location = $location;
        this.scope = $scope;
        this.messages = [];
        this.init();
    }

    init() {
        this.getInboxes();
        this.chatService.on("newMsg", () => {
            this.getInboxes();
        });

        this.scope.$on("inboxSearch", (event, data) => {
            this.search = data.search;
        });
    }

    goToChat(receiver) {
        this.location.path("/chatbox").search({receiver: receiver});
    }

    $onDestroy() {
        this.chatService.getSocket().off("newMsg");
        this.chatService.getSocket().off("allInboxes");
    }

    getInboxes() {
        this.http.get("/chat?user=" + this.senderName, {headers: {Authorization: 'Bearer ' + this.authService.getToken()}}).then((response) => {
            let allInboxes = response.data;
            this.messages = [];
            angular.forEach(allInboxes, (inbox) => {
                let message = {};
                message.from = (inbox.user1 === this.senderName) ? inbox.user2 : inbox.user1;
                message.content = inbox.lastMessage;
                message.date = inbox.lastChatTime;
                this.messages.push(message);
            });
        }, (error) => console.log(error.data));
    }
};

InboxController.$inject = ['AuthService', '$http','ChatService', '$scope', "$location"];