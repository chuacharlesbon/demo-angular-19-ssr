import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getCookie } from '../utils/cookie';
import { routeNames } from '../app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  // return true;

  const router = inject(Router);

  const hasToken = getCookie('user-session');
  console.log("Token", hasToken);

  if (hasToken) {
    return true;
  } else {
    console.error("Guarded route: Unauthorized");
    router.navigate([routeNames.login.path]);
    return false;
  }
};
