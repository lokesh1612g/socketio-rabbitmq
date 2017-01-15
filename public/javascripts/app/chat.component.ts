import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService }       from './chat.service';

@Component({
  selector: 'chat',
  template: `<h1>Hi There</h1>
            <div *ngFor="let message of messages">
                     {{message.text}}
                   </div>
                   <input [(ngModel)]="message"  />
                   <button (click)="sendMessage()">Send</button>`,
  providers: [ChatService]
})

export class ChatComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message="test";
  
  constructor(private chatService:ChatService) {}

  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
  }
  
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}