import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/auth-state';

export const customerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthState);
  
  const user = authState.currentUserValue;

  if (user && user.role === 'customer') {
    return true;
  }

  alert('Customer access required.');
  router.navigate(['/home']); 
  return false;
};
