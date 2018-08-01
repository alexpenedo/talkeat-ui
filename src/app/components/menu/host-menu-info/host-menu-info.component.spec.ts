import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostMenuInfoComponent } from './host-menu-info.component';

describe('HostMenuInfoComponent', () => {
  let component: HostMenuInfoComponent;
  let fixture: ComponentFixture<HostMenuInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostMenuInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostMenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
