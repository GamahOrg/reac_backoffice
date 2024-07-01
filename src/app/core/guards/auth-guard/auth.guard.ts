import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../../services/storage-service/storage.service';
import { inject } from '@angular/core';
import { Configuration } from '../../configurations/shared.config';

// const _storageService = inject(StorageService);
// const _router = inject(Router);
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  var isAuthenticated = inject(StorageService).isAuthenticated();

  if (!isAuthenticated) {
    //console.log('TokenAuthGuardGuard', 'mafesh token');
    inject(Router).navigate([Configuration.modules.auth]);
    return !isAuthenticated;
  } else {
    //console.log('TokenAuthGuardGuard', 'fe token');
    return isAuthenticated;
  }

};
