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
export class ToolbarComponent implements OnInit, OnDestroy {

  user: User;

  constructor(private userService: UserService) {
    this.userService.showUserEmitter.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.userService.showUser();
  }
  logout() {
    this.userService.logout();
  }
  ngOnDestroy() {
    console.log('ng on destroy');
  }

}
