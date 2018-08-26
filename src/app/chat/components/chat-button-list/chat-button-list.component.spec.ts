import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatButtonListComponent } from './chat-button-list.component';

describe('ChatButtonListComponent', () => {
  let component: ChatButtonListComponent;
  let fixture: ComponentFixture<ChatButtonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatButtonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatButtonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
