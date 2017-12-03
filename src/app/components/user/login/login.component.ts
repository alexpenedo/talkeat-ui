import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.email, this.password);
  }

}
