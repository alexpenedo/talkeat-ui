import {User} from './../../../models/user/user';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';
import {UserToken} from '../../../models/user/userToken';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.user = new User();
  }

  register() {
    this.userService.register(this.user).subscribe((userToken: UserToken) => {
      this.userService.storageUserAndToken(userToken);
      this.router.navigate(['/home']);
    });
  }

}
