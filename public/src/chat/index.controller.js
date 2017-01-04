export default class IndexChatController {
    constructor(AuthService, ChatService, Notification) {
        this.showMenu = false;
        this.authService = AuthService;
        this.chatService = ChatService;
        this.notificationService = Notification;
        this.init();
    }

    init() {
        let ctrl = this;
        this.chatService.on("online", function (user) {
            ctrl.notificationService.success({message: `<b>${user.username}</b> is now online`});
        });

        this.chatService.on("offline", function (user) {
            ctrl.notificationService.error({message: `<b>${user.username}</b> is offline`});
        });

        this.chatService.on("newMsg", function (data) {
            ctrl.notificationService.primary({message: `<b>${data.sender}</b>: ${data.content}`});
        });
    }

    $onDestroy() {
        this.chatService.getSocket().off("online");
        this.chatService.getSocket().off("offline");
        this.chatService.getSocket().off("newMsg");
    }
}

IndexChatController.$inject = ['AuthService', 'ChatService', 'Notification'];