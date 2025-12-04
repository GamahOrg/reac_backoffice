import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// Permission Guard
export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredPermissions = route.data['permissions'] as string[];
debugger;
  // If no permissions required, allow access
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  const hasPermission = authService.hasAnyPermission(requiredPermissions);

  if (!hasPermission) {
    console.warn('Access denied. Required permissions:', requiredPermissions);
    console.warn('User permissions:', authService.getPermissions());
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};

export const permissionGuardChild: CanActivateChildFn = (route, state) => {
  return permissionGuard(route, state);
};
