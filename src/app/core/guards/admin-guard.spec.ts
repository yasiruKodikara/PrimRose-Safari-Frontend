import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin-guard';
import { TokenStorage } from '../services/token-storage';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let tokenStorage: TokenStorage;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, TokenStorage]
    });
    guard = TestBed.inject(AdminGuard);
    tokenStorage = TestBed.inject(TokenStorage);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
