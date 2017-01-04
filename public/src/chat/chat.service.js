export const CHAT_SERVICE_NAME = "ChatService";
export class ChatService {
    constructor($rootScope) {
        console.log("Initialized");
        this.rootScope = $rootScope;
    }

    connect() {
        if (!this.socket) {
            this.socket = io.connect();
        }
        return this.socket;
    }

    init() {
        var svc = this;
        this.on("userList", function (users) {
            svc.users = users;
            svc.rootScope.$broadcast("usersChanged", {users: users});
        });
        this.on('onlineList', function(users){
            svc.onlineUsers = users;
            svc.rootScope.$broadcast("onlineChanged", {users: users});
        });
    }

    disconnect(user) {
        if (user)
            this.socket.emit("offline", user);
    }

    on(eventName, callback) {
        var svc = this;
        this.socket.on(eventName, function () {
            var args = arguments;
            svc.rootScope.$apply(function () {
                callback.apply(svc.socket, args);
            });
        });
    }

    emit(eventName, data, callback) {
        var svc = this;
        this.socket.emit(eventName, data, function () {
            var args = arguments;
            svc.rootScope.$apply(function () {
                if (callback) {
                    callback.apply(svc.socket, args);
                }
            });
        })
    }

    getSocket() {
        return this.socket;
    }
}

ChatService.$inject = ['$rootScope'];