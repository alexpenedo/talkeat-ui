import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRateComponent } from './booking-rate.component';

describe('BookingRateComponent', () => {
  let component: BookingRateComponent;
  let fixture: ComponentFixture<BookingRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
