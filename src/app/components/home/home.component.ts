import { User } from './../../models/user/user';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persons: string;

  constructor() {
    this.persons = '2';
  }
  ngOnInit() {
  }

}
