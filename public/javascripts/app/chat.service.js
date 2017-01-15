System.register(['rxjs/Observable', 'socket.io-client'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Observable_1, io;
    var ChatService;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (io_1) {
                io = io_1;
            }],
        execute: function() {
            ChatService = (function () {
                function ChatService() {
                    this.url = 'http://localhost:3000';
                }
                ChatService.prototype.sendMessage = function (message) {
                    this.socket.emit('add-message', message);
                };
                ChatService.prototype.getMessages = function () {
                    var _this = this;
                    var observable = new Observable_1.Observable(function (observer) {
                        _this.socket = io.connect(_this.url);
                        _this.socket.on('message', function (data) {
                            observer.next(data);
                        });
                        return function () {
                            _this.socket.disconnect();
                        };
                    });
                    return observable;
                };
                return ChatService;
            }());
            exports_1("ChatService", ChatService);
        }
    }
});
//# sourceMappingURL=chat.service.js.map