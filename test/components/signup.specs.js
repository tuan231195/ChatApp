describe('Signup component', function () {
    var controller, parentScope, scope, element;

    beforeEach(module('auth', 'ui.router'));

    beforeEach(inject(function ($rootScope, $q, $compile, $componentController, AuthService, $state) {
        parentScope = $rootScope.$new();
        mock = {$scope: parentScope, authService: AuthService, state: $state};
        spyOn(mock.authService, "signup").and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve('Remote call result');
            return deferred.promise;
        });


        controller = $componentController('signupSection', mock);
        parentScope.$digest();
    }));

    it('should doSignup be defined', function () {
        expect(controller.doSignup).toBeDefined();
    });

    it('should login', function(){
        controller.username = "vdtn359";
        controller.password = "test1243";
        controller.confirmPassword = "test1243";
        controller.doSignup();
        expect(mock.authService.signup).toHaveBeenCalled();
    });
})
;