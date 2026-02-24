import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { TokenStorage } from '../services/token-storage';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenStorage: TokenStorage;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, TokenStorage]
    });
    guard = TestBed.inject(AuthGuard);
    tokenStorage = TestBed.inject(TokenStorage);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
