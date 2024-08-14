import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '../../../core/configurations/shared.config';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { ReformerRequestListComponent } from './pages/reformer-request-list/reformer-request-list.component';
import { ArbitratorRequestListComponent } from './pages/arbitrator-request-list/arbitrator-request-list.component';
import { RequestToExtendSettlementPeriodListComponent } from './pages/request-to-extend-settlement-period-list/request-to-extend-settlement-period-list.component';
import { ShowRequestToExtendSettlementPeriodDetailsComponent } from './pages/show-request-to-extend-settlement-period-details/show-request-to-extend-settlement-period-details.component';
import { StopAndReleaseReformerComponent } from './pages/stop-and-release-reformer/stop-and-release-reformer.component';
import { StopAndReleaseArbitratorComponent } from './pages/stop-and-release-arbitrator/stop-and-release-arbitrator.component';
import { ArbitratorDecisionDetailsComponent } from './pages/arbitrator-decision-details/arbitrator-decision-details.component';
import { ReformerDecisionDetailsComponent } from './pages/reformer-decision-details/reformer-decision-details.component';
import { SessionListComponent } from './pages/session-list/session-list.component';
import { ReformerListComponent } from './pages/reformer-list/reformer-list.component';
import { RequestToExtendArbitrationPeriodListComponent } from './pages/request-to-extend-arbitration-period-list/request-to-extend-arbitration-period-list.component';
import { ShowRequestToExtendArbitrationPeriodDetailsComponent } from './pages/show-request-to-extend-arbitration-period-details/show-request-to-extend-arbitration-period-details.component';
import { LitigationRequestForArbitratorSelectionDurationDetailsComponent } from './pages/litigation-request-for-arbitrator-selection-duration-details/litigation-request-for-arbitrator-selection-duration-details.component';
import { LitigationRequestForArbitratorSelectionDurationListComponent } from './pages/litigation-request-for-arbitrator-selection-duration-list/litigation-request-for-arbitrator-selection-duration-list.component';
import { AssignArbitrationMemberListComponent } from './pages/assign-arbitration-member-list/assign-arbitration-member-list.component';
import { AssignArbitrationHeadListComponent } from './pages/assign-arbitration-head-list/assign-arbitration-head-list.component';
import { AssignArbitrationHeadDetailsComponent } from './pages/assign-arbitration-head-details/assign-arbitration-head-details.component';
import { AssignArbitrationMemberDetailsComponent } from './pages/assign-arbitration-member-details/assign-arbitration-member-details.component';
import { ReformerAssigningRequestForAllComponent } from './pages/reformer-assigning-request-for-all/reformer-assigning-request-for-all.component';

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
  {
    path: Configuration.pages.citizenRequests.requestToExtendSettlementPeriodList,
    component: RequestToExtendSettlementPeriodListComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.requestToExtendSettlementPeriodDetails}/:id`,
    component: ShowRequestToExtendSettlementPeriodDetailsComponent,
  },
  {
    path: Configuration.pages.citizenRequests.stopAndReleaseReformer,
    component: StopAndReleaseReformerComponent,
  },
  {
    path: Configuration.pages.citizenRequests.stopAndReleaseArbitrator,
    component: StopAndReleaseArbitratorComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.arbitratorDecisionDetails}/:id`,
    component: ArbitratorDecisionDetailsComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.reformerDecisionDetails}/:id`,
    component: ReformerDecisionDetailsComponent,
  }, 
  {
    path: Configuration.pages.citizenRequests.sessionList,
    component: SessionListComponent,
  },
  {
    path: Configuration.pages.citizenRequests.reformerList,
    component: ReformerListComponent,
  },

  {
    path: Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodList,
    component: RequestToExtendArbitrationPeriodListComponent,
  },
  {
    path: Configuration.pages.citizenRequests.reformerassigningrequestforall,
    component: ReformerAssigningRequestForAllComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodDetails}/:id`,
    component: ShowRequestToExtendArbitrationPeriodDetailsComponent,
  },
  {
    path: Configuration.pages.citizenRequests.litigationRequestForArbitratorSelectionDurationList,
    component: LitigationRequestForArbitratorSelectionDurationListComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.litigationRequestForArbitratorSelectionDurationDetails}/:id`,
    component: LitigationRequestForArbitratorSelectionDurationDetailsComponent,
  },
  {
    path: Configuration.pages.citizenRequests.assignArbitrationHeadList,
    component: AssignArbitrationHeadListComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.assignArbitrationHeadDetails}/:id`,
    component: AssignArbitrationHeadDetailsComponent,
  },
  {
    path: Configuration.pages.citizenRequests.assignArbitrationMemberList,
    component: AssignArbitrationMemberListComponent,
  },
  {
    path: `${Configuration.pages.citizenRequests.assignArbitrationMemberDetails}/:id`,
    component: AssignArbitrationMemberDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitizenRequestsRoutingModule { }


