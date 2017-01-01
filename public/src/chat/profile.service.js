export const PROFILE_SERVICE_NAME = "ProfileService";
export class ProfileService {
    constructor($http, AuthService) {
        this.http = $http;
        this.authService = AuthService;
    }

    updatePassword(oldPassword, newPassword) {
        return this.http.post("/profile/update", {
            oldPassword: oldPassword,
            newPassword: newPassword
        }, {headers: {Authorization: 'Bearer ' + this.authService.getToken()}});
    }
}

ProfileService.$inject = ['$http', 'AuthService'];