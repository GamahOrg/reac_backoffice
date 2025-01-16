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
import { AssignedArbitrationRequestsDocumnetsComponent } from './pages/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets.component';
import { ArbitrationRequestCorrespondencesDetailsComponent } from './components/arbitration-request-correspondences-details/arbitration-request-correspondences-details.component';
import { ArbitrationRequestCorrespondencesListComponent } from './components/arbitration-request-correspondences-list/arbitration-request-correspondences-list.component';
import { ApproveArbitrationFeesPaidListComponent } from './pages/approve-arbitration-fees-paid-list/approve-arbitration-fees-paid-list.component';
import { ApproveArbitrationFeesPaidDetailsComponent } from './pages/approve-arbitration-fees-paid-details/approve-arbitration-fees-paid-details.component';

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
    path: Configuration.pages.arbitration.arbitrationRequestCorrespondencesList,
    component: ArbitrationRequestCorrespondencesListComponent,
  },
  {
    path: `${Configuration.pages.arbitration.arbitrationRequestCorrespondencesDetails}/:id`,
    component: ArbitrationRequestCorrespondencesDetailsComponent,
  },
  {
    path: Configuration.pages.arbitration.arbitratorRecusalRequests,
    component: ArbitratorRecusalRequestsComponent,
  },
  {
    path: `${Configuration.pages.arbitration.approveOrRejectArbitrattionRecusalRequest}/:id`,
    component: ApproveOrRejectArbitratorRecusalRequestComponent,
  },
  {
    path: `${Configuration.pages.arbitration.assignedArbitrationRequestsDocumnets}/:id/:requestId`,
    component: AssignedArbitrationRequestsDocumnetsComponent,
  },
  {
    path: `${Configuration.pages.arbitration.approveArbitrationFeesPaidList}`,
    component: ApproveArbitrationFeesPaidListComponent,
  },
  {
    path: `${Configuration.pages.arbitration.approveArbitrationFeesPaidDetails}/:id`,
    component: ApproveArbitrationFeesPaidDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArbitrationRoutingModule { }
