import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditMenuComponent } from './create-edit-menu.component';

describe('CreateEditMenuComponent', () => {
  let component: CreateEditMenuComponent;
  let fixture: ComponentFixture<CreateEditMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
