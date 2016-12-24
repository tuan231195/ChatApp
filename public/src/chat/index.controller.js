export default class IndexChatController {
    constructor(AuthService, ChatService) {
        this.showMenu = false;
        this.authService = AuthService;
        this.chatService = ChatService;
        this.init();
    }

    init() {
        let currentUser = this.authService.currentUser();
        this.chatService.connect(currentUser);
    }
}

IndexChatController.$inject = ['AuthService', 'ChatService']