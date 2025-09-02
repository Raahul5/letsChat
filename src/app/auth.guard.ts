import { CanActivateFn, ActivatedRouteSnapshot,Router} from '@angular/router';
import { inject }  from '@angular/core'
import {MainService} from '../app/main.service'
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (routeData:ActivatedRouteSnapshot) => {
  const authService = inject(MainService);
  const router = inject(Router)
   const snackBar = inject(MatSnackBar);
  let userRole:any
  if (typeof window !== 'undefined') {
    userRole = localStorage.getItem('role');
  }

  const requiredRole = routeData.data['role'] as string

  if(authService.loggedIn && userRole===requiredRole){
    return true;
  }
  else{
     snackBar.open('Access denied. Please login first.', 'Close', {
      duration: 3000,
    });
    router.navigate(['/login'])
    return false;
  }
 
};
