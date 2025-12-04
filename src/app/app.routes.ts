import { Routes } from '@angular/router';
import { Configuration } from './core/configurations/shared.config';
import { authGuard } from './core/guards/auth-guard/auth.guard';
import { tokenGuard } from './core/guards/token-guard/token.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

export const routes: Routes = [
   {
    path: Configuration.modules.auth,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [tokenGuard] // Prevents logged-in users from accessing auth pages
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
    // NO guards here - everyone should be able to see unauthorized page
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    canActivate: [authGuard], // Only checks if user is logged in
  },
  {
    path: '**',
    redirectTo: '',
  },

];
