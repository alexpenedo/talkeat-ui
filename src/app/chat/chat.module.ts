import {ChatInfoComponent} from './components/chat-info/chat-info.component';
import {HttpClientModule} from '@angular/common/http';
import {ChatService} from './services/chat/chat.service';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import {ChatButtonListComponent} from './components/chat-button-list/chat-button-list.component';
import {ChatComponent} from './components/chat/chat.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersModule} from '../users/users.module';
import {FormsModule} from '@angular/forms';
import {BookingsModule} from '../bookings/bookings.module';
import {RatingsModule} from '../ratings/ratings.module';
import {MessageComponent} from './components/message/message.component';

@NgModule({
  declarations: [
    ChatComponent,
    ChatButtonListComponent,
    ChatInfoComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatChipsModule,
    MatExpansionModule,
    FormsModule,
    UsersModule,
    RatingsModule,
    BookingsModule
  ],
  providers: [ChatService],
  entryComponents: [ChatInfoComponent],
  exports: [ChatButtonListComponent, ChatInfoComponent]
})
export class ChatModule {
}
