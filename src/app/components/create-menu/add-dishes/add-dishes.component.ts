import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-add-dishes',
  templateUrl: './add-dishes.component.html',
  styleUrls: ['./add-dishes.component.css']
})
export class AddDishesComponent implements OnInit {
  @Input() image: string;
  @Input() title: string;
  @Input() description: string;
  @Input() items: any[];
  constructor() {
  }
  ngOnInit() {
  }
  addItem() {
    this.items.push({ name: '' });
  }
  removeItem(index: number) {
    this.items.splice(index, 1);
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
