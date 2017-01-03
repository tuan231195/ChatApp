export default class NavigationController {
    constructor(AuthService, ChatService, $location, $window) {
        this.authService = AuthService;
        this.chatService = ChatService;
        this.location = $location;
        this.window = $window;
    }

    logout(){
        this.chatService.emit("offline", this.authService.currentUser());
        this.authService.logout();
        this.location.path("/authentication");
        this.window.location.reload();
    }
};

NavigationController.$inject = ['AuthService', 'ChatService', '$location', '$window'];