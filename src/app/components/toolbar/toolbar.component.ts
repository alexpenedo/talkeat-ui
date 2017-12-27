import { UserService } from './../../services/user/user.service';
import { User } from './../../models/user/user';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user: User;
  image: string;

  constructor(private userService: UserService) {
    this.userService.showUserEmitter.subscribe((user) => {
      this.user = user;
    });
    this.userService.showImageEmitter.subscribe((image) => {
      this.image = image;
    });
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.image = this.userService.getPhotoUrl(this.userService.getUser()._id);
  }
  logout() {
    this.userService.logout();
  }

}
