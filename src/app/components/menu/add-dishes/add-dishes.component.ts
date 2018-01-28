import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Input() group: FormGroup;
  @Input() arrayName: string;

  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
  }
  addItem() {
    const formArray = <FormArray>this.group.get(this.arrayName);
    formArray.push(this.formBuilder.group({ name: ['', Validators.required] }));
  }
  removeItem(index: number) {
    const formArray = <FormArray>this.group.get(this.arrayName);
    formArray.removeAt(index);
  }
}
