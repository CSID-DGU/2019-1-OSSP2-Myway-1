import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChatbotPage } from './chatbot.page';
import { ChatModule} from '../chat/chat.module';
const routes: Routes = [
  {
    path: '',
    component: ChatbotPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChatbotPage]
})
export class ChatbotPageModule {}
