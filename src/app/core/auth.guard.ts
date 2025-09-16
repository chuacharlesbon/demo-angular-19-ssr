import { inject, PLATFORM_ID } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { getCookie } from '../utils/cookie';
import { routeNames } from '../app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  const hasToken = getCookie('user-session', platformId);
  console.log("Token", hasToken);

  if (hasToken) {
    return true;
  } else {
    console.error("Guarded route: Unauthorized");
    router.navigate([routeNames.login.path]);
    return false;
  }
};
