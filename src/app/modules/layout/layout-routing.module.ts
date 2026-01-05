import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Configuration } from '../../core/configurations/shared.config';
import { permissionGuardChild } from './services/AuthGaurd/permission-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [permissionGuardChild],
    children: [
      {
        path: Configuration.modules.lawsuits,
        loadChildren: () =>
          import('../features/lawsuits/lawsuits.module').then((m) => m.LawsuitsModule),
        //  data: { 
        //   permissions: ['Review.View','Reconciliation.View','Arbitration.View'] 
        // }
      },
      {
        path: Configuration.modules.citizenRequests,
        loadChildren: () =>
          import('../features/citizen-requests/citizen-requests.module').then((m) => m.CitizenRequestsModule),
        // data: { 
        //   permissions: ['Review.View','Reconciliation.View','Arbitration.View'] 
        // }
      },
      {
        path: Configuration.modules.arbitration,
        loadChildren: () =>
          import('../features/arbitration/arbitration.module').then((m) => m.ArbitrationModule),
        data: { 
          permissions: ['Arbitration.View'] 
        }
      },
      {
        path: Configuration.modules.reports,
        loadChildren: () =>
          import('../reports/reports.module').then((m) => m.ReportsModule),
        //  data: { 
        //   permissions: ['Reports.View'] 
        // }
      },
      {
        path: Configuration.modules.profile,
        loadChildren: () =>
          import('../features/profile/profile.module').then((m) => m.ProfileModule),
         
      },
      {
        path: Configuration.modules.UsersManagement,
        loadChildren: () =>
          import('../features/users-management/users-management.module').then((m) => m.UsersManagementModule),
          data: { 
          permissions: ['Admin.View'] 
        }
        
      },
      // {
      //   path: '',
      //   redirectTo: Configuration.modules.lawsuits,
      //   pathMatch: 'full'
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
