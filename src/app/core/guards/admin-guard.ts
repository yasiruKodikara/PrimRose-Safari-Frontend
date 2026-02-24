import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '../services/auth-state';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthState);
  
  const user = authState.currentUserValue;

  // Check if user exists AND has the admin role
  if (user && user.role === 'admin') {
    return true; 
  }

  alert('You do not have permission to access this page.');
  router.navigate(['/home']); // Or wherever you want to send unauthorized users
  return false;
};