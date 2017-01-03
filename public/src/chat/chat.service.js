export const CHAT_SERVICE_NAME = "ChatService";
export class ChatService {
    constructor($rootScope) {
        this.rootScope = $rootScope;
    }

    connect(user) {
        if (!this.socket) {
            this.socket = io.connect();
            this.socket.emit("online", user);
            var svc = this;
            this.on("userList", function (users) {
                console.log("userList");
                svc.users = users;
                svc.rootScope.$broadcast("usersChanged", {users: users});
            });
        }
        return this.socket;
    }

    disconnect(user) {
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