import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDishsInfoComponent } from './address-dishs-info.component';

describe('AddressDishsInfoComponent', () => {
  let component: AddressDishsInfoComponent;
  let fixture: ComponentFixture<AddressDishsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressDishsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDishsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
