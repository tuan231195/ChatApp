export default class OnlineController {
    constructor(AuthService, ChatService, $scope) {
        this.authService = AuthService;
        this.chatService = ChatService;
        this.scope = $scope;
        this.init();
    }

    init() {
        //if the user is not logged in
        if (!this.authService.isLoggedIn()) {
            return;
        }
        let ctrl = this;
        this.currentUser = this.authService.currentUser().username;
        ctrl.users = ctrl.chatService.onlineUsers;
        ctrl.scope.$on("onlineChanged", function (event, data) {
            ctrl.users = data.users;
        });
        ctrl.scope.$on("userSearch", function (event, data) {
            ctrl.search = data.search;
        });
    }
};

OnlineController.$inject = ['AuthService', 'ChatService', '$scope'];