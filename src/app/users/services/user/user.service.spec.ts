import { UserService } from './user.service';
import { TestBed, inject } from '@angular/core/testing';
import { } from 'jasmine';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
