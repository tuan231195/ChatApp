describe('Auth service', function () {
    var controller, parentScope, scope, element, mock, authService, $http;
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODViNjYxMTg5ZWEzZjA4NzM3N2Y2ODEiLCJ1c2VybmFtZSI6InZkdG4zNTkiLCJleHAiOjE0ODI5ODk3MTMsImltYWdlIjoidXNlcjEucG5nIiwiaWF0IjoxNDgyMzg0OTEzfQ.3kioZLFd0ooa0rJ3";


    beforeEach(module('auth'));

    beforeEach(inject(function ($window, $httpBackend, AuthService) {
        $http = $httpBackend;
        authService = AuthService;
        spyOn(authService, "saveToken").and.callThrough();
        spyOn(authService, "getToken").and.returnValue(token);
    }));

    it('should be defined', function () {
        expect(authService).toBeDefined();
    });

    it('should be logged in', function () {
        $http.expectPOST('/api/login').respond({token: token});
        authService.login({"username": "tnguyen", "password": "123456"});
        $http.flush();
        expect(authService.saveToken).toHaveBeenCalledWith(token);
    });

    it('should be signed up', function () {
        $http.expectPOST('/api/register').respond({token: token});
        authService.signup({"username": "tnguyen", "password": "123456"});
        $http.flush();
        expect(authService.saveToken).toHaveBeenCalledWith(token);
    });

    it('should check token', function(){
        authService.currentUser();
        var returnedValue = authService.getToken();
        expect(returnedValue).toEqual(token);
    });
})
;