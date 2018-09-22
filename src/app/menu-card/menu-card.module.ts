import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatChipsModule, MatDividerModule, MatIconModule, MatListModule} from '@angular/material';
import {MenuInfoComponent} from './components/menu-info/menu-info.component';
import {RatingModule} from 'ngx-rating';
import {UsersModule} from '../users/users.module';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    MatDividerModule,
    MatListModule,
    UsersModule,
    RatingModule
  ],
  declarations: [MenuInfoComponent],
  exports: [MenuInfoComponent]
})
export class MenuCardModule {
}
