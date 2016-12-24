export default class SidebarController {
    constructor($location, $rootScope) {

        this.showMenu = false;
        this.rootScope = $rootScope;

        var ctrl = this;

        evaluatePath();
        $rootScope.$on("$locationChangeSuccess", () => {
            evaluatePath();
        });

        function evaluatePath() {
            let path = $location.path();
            if (path === '/index/inbox') {
                ctrl.onInbox = true;
                ctrl.title = "Inbox";
                ctrl.searchTitle = "Search Inbox";
            }
            else if (path === '/index/online') {
                ctrl.onInbox = false;
                ctrl.title = "All users";
                ctrl.searchTitle = "Search users";
            }
        }
    }

    broadcastChange() {
        if (this.onInbox) {
            this.rootScope.$broadcast("inboxSearch", {search: this.search});
        }
        else {
            this.rootScope.$broadcast("userSearch", {search: this.search});
        }
    }

};

SidebarController.$inject = ['$location', '$rootScope'];