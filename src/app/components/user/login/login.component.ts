import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.email, this.password);
    this.userService.showUser();
  }

}
