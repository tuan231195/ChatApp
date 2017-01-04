export default function AuthConfig($stateProvider, $httpProvider, $urlRouterProvider) {
    '$ngInject';
    $urlRouterProvider.otherwise('/authenticate');
    $stateProvider.state('authenticate', {
        url: '/authenticate',
        template: '<auth-section></auth-section>',
    }).state('authenticate.login', {
        url: '/login',
        template: '<login-section></login-section>',
        title: 'Login'
    }).state('authenticate.signup', {
        url: '/signup',
        template: '<signup-section></signup-section>',
        title: 'Sign up'
    }).state('index', {
        url: '/index',
        template: '<index-section></index-section>',
        title: 'Chat App'
    }).state('index.inbox', {
        url: '/inbox',
        template: '<inbox-section></inbox-section>',
        title: 'Inbox'
    }).state('index.chatlist', {
        url: '/chatlist',
        template: '<chatlist-section></chatlist-section>',
        title: 'All Users'
    }).state('index.online', {
        url: '/online',
        template: '<online-section></online-section>',
        title: 'Chat App'
    }).state("chatbox", {
        url: '/chatbox',
        template: '<chatbox-section></chatbox-section>'
    }).state("profile", {
        url: "/profile",
        template: '<profile-section></profile-section>'
    });
}

AuthConfig.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];

