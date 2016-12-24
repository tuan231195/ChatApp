export default class NavigationController {
    constructor(AuthService, ChatService, $location, $window) {
        this.authService = AuthService;
        this.chatService = ChatService;
        this.location = $location;
        this.window = $window;
    }

    logout(){
        this.authService.logout();
        this.chatService.emit("logout", this.authService.currentUser());
        this.location.path("/authentication");
        this.window.location.reload();
    }
};

NavigationController.$inject = ['AuthService', 'ChatService', '$location', '$window'];