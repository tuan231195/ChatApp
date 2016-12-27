export default class IndexChatController {
    constructor(AuthService, ChatService, Notification) {
        this.showMenu = false;
        this.authService = AuthService;
        this.chatService = ChatService;
        this.notificationService = Notification;
        this.init();
    }

    init() {
        let currentUser = this.authService.currentUser();
        let ctrl = this;

        this.chatService.connect(currentUser);
        this.chatService.on("login", function (user) {
            ctrl.notificationService.success({message: `<b>${user.username}</b> is now logged in`});
        });

        this.chatService.on("logout", function (user) {
            ctrl.notificationService.error({message: `<b>${user.username}</b> just logged out`});
        });

        this.chatService.on("newMsg", function (data) {
            ctrl.notificationService.primary({message: `<b>${data.sender}</b>: ${data.content}`});
        });
    }
}

IndexChatController.$inject = ['AuthService', 'ChatService', 'Notification'];