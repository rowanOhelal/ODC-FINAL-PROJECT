import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _auth = inject(AuthService);
  const router = inject(Router);

  if (_auth.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

