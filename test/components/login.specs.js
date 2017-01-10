describe('Login component', function () {
    var controller, parentScope, scope, element;

    beforeEach(module('ChatApp',  'ui.router'));

    beforeEach(inject(function ($rootScope, $q, $compile, $componentController, AuthService, $state) {
        parentScope = $rootScope.$new();
        mock = {$scope: parentScope, authService: AuthService, state: $state};
        spyOn(mock.authService, "login").and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve('Remote call result');
            return deferred.promise;
        });
        spyOn(mock.state, "go");
        controller = $componentController('loginSection', mock);
        parentScope.$digest();
    }));

    it('should doLogin be defined', function () {
        expect(controller.doLogin).toBeDefined();
    });

    it('should login', function(){
        controller.username = "vdtn359";
        controller.password = "test1243";
        controller.anonymous = false;
        controller.doLogin();
        expect(mock.authService.login).toHaveBeenCalled();
    });
})
;