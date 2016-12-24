export default class LoginController {
    constructor(AuthService, $state) {
        this.authService = AuthService;
        this.state = $state;
    }

    doLogin() {
        var ctrl = this;
        this.authService.login({username: this.username, password: this.password})
            .then(function () {
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
};

LoginController.$inject = ['AuthService', '$state'];