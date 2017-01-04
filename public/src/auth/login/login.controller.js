export default class LoginController {
    constructor(AuthService, ChatService, $state) {
        this.authService = AuthService;
        this.chatService = ChatService;
        this.state = $state;
        this.anonymous = true;
    }

    doLogin() {
        let ctrl = this;
        if (this.anonymous) {
            this.authService.loginAnonymous().then(function(){
                ctrl.chatService.connect();
                ctrl.chatService.init();
                ctrl.chatService.emit("online", ctrl.authService.currentUser());
                ctrl.state.go('index');
            }, function(error){
                console.error(error);
            });
        }
        else {
            this.authService.login({username: this.username, password: this.password})
                .then(function () {
                    ctrl.chatService.connect();
                    ctrl.chatService.init();
                    ctrl.chatService.emit("online", ctrl.authService.currentUser());
                    ctrl.state.go('index');
                }, function (error) {
                    console.error(error);
                    if (error.data.error === 'username') {
                        ctrl.userError = true;
                    }
                    else if (error.data.error === 'password') {
                        ctrl.passwordError = true;
                    }
                });
        }
    }
};

LoginController.$inject = ['AuthService', 'ChatService', '$state'];