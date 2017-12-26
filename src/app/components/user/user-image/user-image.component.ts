import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.css']
})
export class UserImageComponent implements OnInit {
  @Input() image: string;
  @Input() diameter: string;
  @Input() float: string;
  constructor(private userServie: UserService) {

  }

  ngOnInit() {
  }

}
