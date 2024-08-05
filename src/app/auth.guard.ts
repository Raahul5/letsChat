import { CanActivateFn, ActivatedRouteSnapshot,Router, RouterStateSnapshot  } from '@angular/router';
import {Inject, Injectable, inject }  from '@angular/core'
import {MainService} from '../app/main.service'
export const authGuard: CanActivateFn = () => {
  const authService = inject(MainService);
  const router = inject(Router)

  if(authService.loggedIn){
    return true;
  }
  else{
    router.navigate(['/login'])
    return false;
  }
 
};
