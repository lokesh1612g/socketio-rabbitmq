import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ChatComponent }  from './chat.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ ChatComponent ],
  bootstrap:    [ ChatComponent ]
})
export class AppModule { }