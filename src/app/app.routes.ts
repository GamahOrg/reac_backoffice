import { Routes } from '@angular/router';
import { Configuration } from './core/configurations/shared.config';
import { authGuard } from './core/guards/auth-guard/auth.guard';
import { tokenGuard } from './core/guards/token-guard/token.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
    // canActivate: [
    //   authGuard
    // ],
  },

  {
    path: Configuration.modules.auth,
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [
      tokenGuard
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
];
