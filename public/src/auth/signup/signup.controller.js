export default class SignupController {
    constructor(Auth, ChatService, $state) {
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.gender = "";
        this.authService = Auth;
        this.chatService = ChatService;
        this.state = $state;
    }

    isPasswordMatch() {
        return this.confirmPassword === this.password;
    }

    canSubmit() {
        if (!this.isPasswordMatch())
            return false;
        if (this.gender === "")
            return false;
        return true;
    }

    doSignup() {
        console.log("User " + this.username + " is registering");
        var ctrl = this;
        this.authService.signup({
            username: this.username,
            password: this.password,
            gender: this.gender
        }).then(function () {
            ctrl.chatService.connect();
            ctrl.chatService.init();
            ctrl.chatService.emit("online", ctrl.authService.currentUser());
            ctrl.state.go('index');
        }, function (error) {
            console.error(error);
            if (error.data.code === 11000) {
                ctrl.userError = true;
            }
        });
    }
};

SignupController.$inject = ['AuthService', 'ChatService', '$state'];