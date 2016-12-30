import shortid from "shortid";

export default class SignupController {
    constructor(Auth, $state) {
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.useDefault = true;
        this.authService = Auth;
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
        return !(!this.useDefault && this.username.trim().length === 0);
    }

    doSignup() {
        if (this.useDefault && !this.username) {
            this.username = shortid.generate();
        }
        console.log("User " + this.username + " is registering");
        var ctrl = this;
        this.authService.signup({
            username: this.username,
            password: this.password,
            gender: this.gender
        }).then(function () {
            ctrl.state.go('index');
        }, function (error) {
            console.error(error);
            if (error.data.code === 11000) {
                ctrl.userError = true;
            }
        });
    }
};

SignupController.$inject = ['AuthService', '$state'];