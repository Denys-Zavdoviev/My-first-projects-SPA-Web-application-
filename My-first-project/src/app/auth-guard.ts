import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    if (state.url === '/add-item' && !authService.isAdmin()) {
      router.navigate(['/items']);
      return false;
    }
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
