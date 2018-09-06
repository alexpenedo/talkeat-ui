import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, Input, OnInit} from '@angular/core';

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
  }

  addItem(name?: string) {
    if (this.formArray.length < 2) {
      this.formArray.push(this.formBuilder.group(
        {
          name: [name ? name : '',
            Validators.compose([Validators.required, Validators.maxLength(30)])]
        }));
    }
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }

  getControls() {
    return (<FormArray>this.group.controls[this.arrayName]).controls;
  }
}
