import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '../../../core/configurations/shared.config';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { ReformerRequestListComponent } from './pages/reformer-request-list/reformer-request-list.component';
import { ArbitratorRequestListComponent } from './pages/arbitrator-request-list/arbitrator-request-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: Configuration.pages.citizenRequests.list,
  //   pathMatch: "full"
  // },
  {
    path: Configuration.pages.citizenRequests.arbitratorRequestList,
    component: ArbitratorRequestListComponent,
  },
  {
    path: Configuration.pages.citizenRequests.reformerRequestList,
    component: ReformerRequestListComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.details}/:code/:id`,
    component: RequestDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitizenRequestsRoutingModule { }


