import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
