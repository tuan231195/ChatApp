export default class SidebarController {
    constructor($location, $rootScope, AuthService) {

        this.showMenu = false;
        this.rootScope = $rootScope;
        this.authService = AuthService;

        let ctrl = this;

        evaluatePath();
        $rootScope.$on("$locationChangeSuccess", () => {
            evaluatePath();
        });

        function evaluatePath() {
            let path = $location.path();
            if (path === '/index/inbox') {
                ctrl.current = "inbox";
                ctrl.title = "Inbox";
                ctrl.searchTitle = "Search Inbox";
            }
            else if (path === '/index/online') {
                ctrl.current = "online";
                ctrl.title = "Online";
                ctrl.searchTitle = "Search Online";
            }
            else if (path === '/index/chatlist') {
                ctrl.current = "chatlist";
                ctrl.title = "All Users";
                ctrl.searchTitle = "Search users";
            }
        }
    }

    broadcastChange() {
        switch(this.current)
        {
            case "inbox":
                this.rootScope.$broadcast("inboxSearch", {search: this.search});
                break;
            case "online":
                this.rootScope.$broadcast("onlineSearch", {search: this.search});
                break;
            case "chatlist":
                this.rootScope.$broadcast("userSearch", {search: this.search});
                break;

        }
    }
};

SidebarController.$inject = ['$location', '$rootScope', 'AuthService'];