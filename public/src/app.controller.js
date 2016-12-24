/*jshint esversion: 6 */

export const MAIN_CONTROLLER_NAME = "mainController";
export class MainController {
    constructor($state, $rootScope, $location, AuthService) {
        let evaluatePath = () => {
            console.log($location.path());
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

        $rootScope.$on("$locationChangeSuccess", () => {
            evaluatePath();
        });
    }
}

MainController.$inject = ['$state', '$rootScope', '$location', 'AuthService'];