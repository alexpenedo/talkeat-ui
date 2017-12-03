import { User } from './../../../models/user/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = new User();
  }

  register() {
    this.userService.register(this.user);
  }
}
