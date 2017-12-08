import { AbstractControl, FormArray } from '@angular/forms';

export const dishValidator = (control: AbstractControl): { [key: string]: boolean } => {
  const starters = <FormArray>control.get('starters');
  const mains = <FormArray>control.get('mains');
  const desserts = <FormArray>control.get('desserts');
  return ((starters.length >= 1) || (mains.length >= 1) || (desserts.length >= 1)) ? null : { nomatch: true };
};
