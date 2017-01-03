export const AUTH_SERVICE_NAME = "AuthService";

export class AuthService {
    constructor($http, $window) {
        this.http = $http;
        this.window = $window;
    }

    saveToken(token) {
        this.window.localStorage['chat-token'] = token;
    }

    getToken() {
        return this.window.localStorage['chat-token'];
    }

    isLoggedIn() {
        const token = this.getToken();
        if (token) {
            let payload = JSON.parse(this.window.atob(token.split('.')[1]));
            //if the token has expired

            return payload.exp > Date.now() / 1000;
        }
        return false;
    }

    currentUser() {
        if (this.isLoggedIn()) {
            const token = this.getToken();
            let payload = JSON.parse(this.window.atob(token.split('.')[1]));
            return {
                id: payload._id,
                username: payload.username,
                image: payload.image,
                isAnonymous: this.isAnonymous
            }
        }
    }

    login(user) {
        let ctrl = this;
        return this.http.post('/auth/login', user).then(function (response) {
            ctrl.saveToken(response.data.token);
        });
    }

    loginAnonymous() {
        let ctrl = this;
        return this.http.post('/auth/loginAnonymous').then(function (response) {
            ctrl.saveToken(response.data.token);
            ctrl.isAnonymous = true;
        });
    }

    signup(user) {
        let ctrl = this;
        return this.http.post('/auth/register', user).then(function (response) {
            ctrl.saveToken(response.data.token);
        });
    }

    logout() {
        this.window.localStorage.removeItem('chat-token');
    }
}

AuthService.$inject = ["$http", "$window"];