import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { ArbitratorCountListComponent } from './components/arbitrator-count-list/arbitrator-count-list.component';
import { ArbitratorCountDetailsComponent } from './components/arbitrator-count-details/arbitrator-count-details.component';
import { ArbitrationSessionListComponent } from './pages/arbitration-session-list/arbitration-session-list.component';
import { AssignedArbitrationRequestsComponent } from './components/assigned-arbitration-requests/assigned-arbitration-requests/assigned-arbitration-requests.component';
import { ArbitratorListComponent } from './components/arbitrator-list/arbitrator-list.component';
import { ArbitratorRecusalRequestsComponent } from './components/arbitrator-recusal-requests/arbitrator-recusal-requests/arbitrator-recusal-requests.component';
import { ApproveOrRejectArbitratorRecusalRequestComponent } from './components/approve-or-reject-arbitrator-recusal-request/approve-or-reject-arbitrator-recusal-request.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: Configuration.pages.arbitration.arbitratorCountList,
    pathMatch: "full"
  },
  {
    path: Configuration.pages.arbitration.arbitratorCountList,
    component: ArbitratorCountListComponent,
  },
  {
    path: Configuration.pages.arbitration.assignedArbitrationRequests,
    component: AssignedArbitrationRequestsComponent,
  },
  {
    path: `${Configuration.pages.arbitration.arbitratorCountDetails}/:id`,
    component: ArbitratorCountDetailsComponent,
  },
  {
    path: Configuration.pages.arbitration.arbitratorSessionList,
    component: ArbitrationSessionListComponent,
  },
  {
    path: Configuration.pages.arbitration.assignarbitratorlist,
    component: ArbitratorListComponent,
  },
  {
    path: Configuration.pages.arbitration.arbitratorRecusalRequests,
    component: ArbitratorRecusalRequestsComponent,
  },
  {
    path: `${Configuration.pages.arbitration.approveOrRejectArbitrattionRecusalRequest}/:id`,
    component: ApproveOrRejectArbitratorRecusalRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArbitrationRoutingModule { }
