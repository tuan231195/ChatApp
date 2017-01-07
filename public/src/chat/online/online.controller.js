import {PAGE_SIZE} from "../pagination/pagination.controller";


export default class OnlineController {
    constructor(AuthService, ChatService, $scope, $filter) {
        this.authService = AuthService;
        this.chatService = ChatService;
        this.scope = $scope;
        this.currentPage = 0;
        this.filter = $filter;
        this.init();
    }

    init() {
        //if the user is not logged in
        if (!this.authService.isLoggedIn()) {
            return;
        }
        let ctrl = this;
        ctrl.users = ctrl.chatService.onlineUsers;
        if (ctrl.users)
            ctrl.numItems = ctrl.users.length - 1;
        ctrl.scope.$on("onlineChanged", function (event, data) {
            ctrl.users = data.users;
            if (ctrl.users)
                ctrl.numItems = ctrl.users.length - 1;
        });
        ctrl.scope.$on("userSearch", function (event, data) {
            ctrl.search = data.search;
        });
    }

    getDisplayedUsers() {
        if (this.users) {
            let tmp = [];
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].username !== this.authService.currentUser().username) {
                    tmp.push(this.users[i]);
                }
            }
            return this.filter("limitTo")(tmp.splice(this.currentPage * PAGE_SIZE), PAGE_SIZE);
        }
    }
};

OnlineController.$inject = ['AuthService', 'ChatService', '$scope', '$filter'];