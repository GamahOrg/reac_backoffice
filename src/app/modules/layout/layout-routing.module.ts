import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { Configuration } from '../../core/configurations/shared.config';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: Configuration.modules.lawsuits,
        loadChildren: () =>
          import('../features/lawsuits/lawsuits.module').then((m) => m.LawsuitsModule),
      },
      {
        path: Configuration.modules.citizenRequests,
        loadChildren: () =>
          import('../features/citizen-requests/citizen-requests.module').then((m) => m.CitizenRequestsModule),
      },
      {
        path: Configuration.modules.arbitration,
        loadChildren: () =>
          import('../features/arbitration/arbitration.module').then((m) => m.ArbitrationModule),
      },
      {
        path: '',
        redirectTo: Configuration.modules.lawsuits,
        pathMatch: 'full'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
