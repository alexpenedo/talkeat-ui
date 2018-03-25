import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {
  image: string;
  @Input() userId: string;
  @Input() diameter: string;
  @Input() float: string;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.image = this.userService.getPhotoUrl(this.userId);
    this.userService.showUserEmitter.subscribe((user) => {
      if (user == this.userId) {
        this.image = this.userService.getPhotoUrl(user);
      }
    });
  }
}
