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
  formArray: FormArray;

  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.formArray = <FormArray>this.group.get(this.arrayName);
    console.log(this.group);
  }

  addItem() {
    this.formArray.push(this.formBuilder.group({ name: ['', Validators.required] }));
  }
  removeItem(index: number) {
    this.formArray.removeAt(index);
  }
  getControls() {
    return (<FormArray>this.group.controls[this.arrayName]).controls;
  }
}
