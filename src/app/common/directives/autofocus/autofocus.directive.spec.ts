import { AutofocusDirective } from './autofocus.directive';
import {ElementRef} from '@angular/core';

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    const directive = new AutofocusDirective(new ElementRef({}));
    expect(directive).toBeTruthy();
  });
});
