/*jshint esversion: 6 */

export const MAIN_CONTROLLER_NAME = "mainController";
export class MainController {
    constructor($state, $rootScope, $location, AuthService, ChatService,  $window) {
        let evaluatePath = () => {
            if ($location.path() === "/authenticate") {
                $state.go("authenticate.login");
            }
            else if ($location.path().indexOf("/authenticate") === 0) {
                //user is already logged in
                if (AuthService.isLoggedIn()) {
                    $state.go("index");
                }
            }
            else {
                //user is not logged in
                if (!AuthService.isLoggedIn()) {
                    $state.go("authenticate.login");
                }
                else {
                    //default to inbox
                    if ($location.path() === "/index") {
                        $state.go("index.inbox");
                    }
                }
            }
        };

        evaluatePath();

        if (AuthService.isLoggedIn()){
            ChatService.connect();
            ChatService.init();
            ChatService.emit("online", AuthService.currentUser());
        }

        $rootScope.$on("$locationChangeSuccess", () => {
            evaluatePath();
        });

        $window.onbeforeunload = function(){
            if (AuthService.isAnonymous) {
                ChatService.disconnect(AuthService.currentUser());
                AuthService.logout();
            }
        };
    }
}

MainController.$inject = ['$state', '$rootScope', '$location', 'AuthService', 'ChatService', '$window'];