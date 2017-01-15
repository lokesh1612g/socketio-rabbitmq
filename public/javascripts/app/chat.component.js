System.register(['@angular/core', './chat.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, chat_service_1;
    var ChatComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chat_service_1_1) {
                chat_service_1 = chat_service_1_1;
            }],
        execute: function() {
            ChatComponent = (function () {
                function ChatComponent(chatService) {
                    this.chatService = chatService;
                    this.messages = [];
                    this.message = "test";
                }
                ChatComponent.prototype.sendMessage = function () {
                    this.chatService.sendMessage(this.message);
                    this.messages.push(this.message);
                };
                ChatComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.connection = this.chatService.getMessages().subscribe(function (message) {
                        _this.messages.push(message);
                    });
                };
                ChatComponent.prototype.ngOnDestroy = function () {
                    this.connection.unsubscribe();
                };
                ChatComponent = __decorate([
                    core_1.Component({
                        selector: 'chat',
                        template: "<h1>Hi There</h1>\n            <div *ngFor=\"let message of messages\">\n                     {{message.text}}\n                   </div>\n                   <input [(ngModel)]=\"message\"  />\n                   <button (click)=\"sendMessage()\">Send</button>",
                        providers: [chat_service_1.ChatService]
                    }), 
                    __metadata('design:paramtypes', [chat_service_1.ChatService])
                ], ChatComponent);
                return ChatComponent;
            }());
            exports_1("ChatComponent", ChatComponent);
        }
    }
});
//# sourceMappingURL=chat.component.js.map