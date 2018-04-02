import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../models/user/user';
import { Router } from '@angular/router';
import { UserToken } from '../../../models/user/userToken';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.email, this.password).subscribe((userToken: UserToken) => {
      this.userService.storageUserAndToken(userToken);
      this.router.navigate(['/home']);
    });
  }

}
