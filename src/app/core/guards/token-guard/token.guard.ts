import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../../services/storage-service/storage.service';
import { inject } from '@angular/core';

export const tokenGuard: CanActivateFn = (route, state) => {

  // const _storageService= inject(StorageService);
  // const _router= inject(Router);
  
  var isAuthenticated = inject(StorageService).isAuthenticated();

  if (isAuthenticated) {
    //console.log('TokenAuthGuardGuard', 'fe token');
    inject(Router).navigate(['']);
    return isAuthenticated;
  } else {
    //console.log('TokenAuthGuardGuard', 'mafesh token');
    return !isAuthenticated;
  }
};
