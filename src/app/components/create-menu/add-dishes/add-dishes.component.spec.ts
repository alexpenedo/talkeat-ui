import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDishesComponent } from './add-dishes.component';

describe('AddDishsComponent', () => {
  let component: AddDishesComponent;
  let fixture: ComponentFixture<AddDishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
