import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './services/user/user.service';
import {UserImageComponent} from './components/user-image/user-image.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ProfileComponent} from './components/profile/profile.component';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    UsersRoutingModule
  ],
  declarations: [UserImageComponent, LoginComponent, RegisterComponent, ProfileComponent],
  providers: [UserService],
  exports: [UserImageComponent]
})
export class UsersModule {
}
