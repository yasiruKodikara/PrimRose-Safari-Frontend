import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/auth-state';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthState);
  
  // Synchronously check our state service
  const user = authState.currentUserValue;

  if (user) {
    return true; // User is logged in, let them pass
  }

  // Not logged in
  alert('You are not authorized to access this page');
  router.navigate(['/auth']);
  return false;
};