import { CanActivateFn } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService); // Get an instance of AuthService
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  } else {
    return false; // Redirect to login if not admin
  }
};
