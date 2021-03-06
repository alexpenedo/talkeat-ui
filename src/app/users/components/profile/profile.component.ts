import {UserService} from '../../services/user/user.service';
import {Component, OnInit} from '@angular/core';
import {User} from '../../../common/models/user/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  image: string;

  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.image = this.userService.getPhotoUrl(this.userService.getUser().picture);
  }

  uploadPhoto($event) {
    this.userService.uploadPhoto($event.target.files[0]).subscribe((user: User) => {
      this.userService.storageUser(user);
      this.image = this.userService.getPhotoUrl(user.picture);
    });
  }

  updateUser() {
    this.userService.update(this.user).subscribe((user: User) => {
      this.userService.storageUser(user);
      this.router.navigate(['/home']);
    });
  }
}
