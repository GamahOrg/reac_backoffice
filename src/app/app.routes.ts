import { Routes } from '@angular/router';
import { Configuration } from './core/configurations/shared.config';

export const routes: Routes = [

    {
        path: '',
        loadChildren: () =>
          import('./modules/layout/layout.module').then((m) => m.LayoutModule),
        // canActivate: [
        //   AuthGuard
    
        // ],
      },
    
      {
        path: Configuration.modules.auth,
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
        // canActivate:[
        //   TokenGuard
        // ]
      },
      {
        path: '**',
        redirectTo: '',
      },
];
