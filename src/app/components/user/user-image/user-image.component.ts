import {UserService} from '../../../services/user/user.service';
import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user/user';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {
  image: string;
  @Input() userId: string;
  @Input() username: string;
  @Input() diameter: string;
  @Input() float: string;

  constructor(private userService: UserService) {
    this.image = '#';
  }

  ngOnInit() {
    this.setImageUrl(this.userId);
    this.userService.showUserEmitter.subscribe((user) => {
      if (user === this.userId) {
        this.setImageUrl(user);
      }
    });
  }

  setImageUrl(userId: string) {
    if (userId !== undefined && userId != null) {
      this.userService.findById(userId).subscribe((user: User) => {
        console.log(user);
        this.image = this.userService.getPhotoUrl(user.picture);
      });
    }
  }
}
