import {AbstractControl, FormArray} from '@angular/forms';

export const dishValidator = (control: AbstractControl): { [key: string]: boolean } => {
  const starters = <FormArray>control.get('starters');
  const mains = <FormArray>control.get('mains');
  const desserts = <FormArray>control.get('desserts');
  return ((starters.length >= 1 && starters.length <= 2) ||
    (mains.length >= 1 && mains.length <= 2) ||
    (desserts.length >= 1 && desserts.length <= 2)) ? null : {nomatch: true};
};
