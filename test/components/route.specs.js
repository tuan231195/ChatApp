describe('Route component', function () {

    var $state, $q, $location, $rootScope, $controller, AuthService, ctrl, scope;
    beforeEach(module('ChatApp', 'ui.router'));

    beforeEach(inject(function (_$state_, _$q_, _$location_, _$rootScope_, _$controller_, _AuthService_) {
        $state = _$state_;
        $q = _$q_;
        $location = _$location_;
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        AuthService = _AuthService_;
    }));

    describe('path', function () {
        function goTo(url) {
            $location.path(url);
            $rootScope.$digest();
        }

        it('should go to authentication page', function () {
            goTo("");
            expect($state.current.name).toEqual("authenticate");
        });

        it('should go to login page', function () {
            goTo("authenticate/login");
            expect($state.current.name).toEqual("authenticate.login");
        });

        it('should go to signup page', function () {
            goTo("authenticate/signup");
            expect($state.current.name).toEqual("authenticate.signup");
        });

        it('should go to index page', function () {
            goTo("index");
            expect($state.current.name).toEqual("index");
        });

        it('should go to inbox page', function () {
            goTo("index/inbox");
            expect($state.current.name).toEqual("index.inbox");
        });

        it('should go to chatbox page', function () {
            goTo("chatbox");
            expect($state.current.name).toEqual("chatbox");
        });

        it('should go to online page', function () {
            goTo("index/online");
            expect($state.current.name).toEqual("index.online");
        });
    });

    describe("redirecting", function(){
        it('should go to login', function () {
            spyOn(AuthService, "isLoggedIn").and.returnValue(false);
            spyOn(AuthService, "currentUser").and.returnValue({username: "vdtn359"});
            spyOn($state, "go");
            scope = $rootScope.$new();
            $location.path("index");
            ctrl = $controller("mainController", {$scope: scope, AuthService: AuthService, $state: $state});
            expect(AuthService.isLoggedIn).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith("authenticate.login");
        });

        it('should go to index', function () {
            spyOn(AuthService, "isLoggedIn").and.returnValue(true);
            spyOn(AuthService, "currentUser").and.returnValue({username: "vdtn359"});
            spyOn($state, "go");
            scope = $rootScope.$new();
            $location.path("authenticate.login");
            ctrl = $controller("mainController", {$scope: scope, AuthService: AuthService, $state: $state});
            expect(AuthService.isLoggedIn).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith("index");
        });
    });
});