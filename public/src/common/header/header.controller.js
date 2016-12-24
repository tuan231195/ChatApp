export default class NavigationController {
    constructor(AuthService) {
        this.authService = AuthService;
        let currentUser = this.authService.currentUser();
        this.username = currentUser.username;
        this.image = "/images/" + currentUser.image;
    }
};

NavigationController.$inject = ['AuthService'];