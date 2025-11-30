import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '../../../core/configurations/shared.config';
import { LawsuitListComponent } from './pages/lawsuits-list/lawsuits-list.component';
import { LawsuitDetailsComponent } from './pages/lawsuit-details/lawsuit-details.component';
import { AuditngListReconciliationComponent } from './pages/auditng-list-reconciliation/auditng-list-reconciliation.component';
import { AuditngListArbitrationComponent } from './pages/auditng-list-arbitration/auditng-list-arbitration.component';
import { LitigationRequestCorrespondenceListComponent } from './components/litigation-request-correspondence-list/litigation-request-correspondence-list.component';
import { LitigationRequestCorrespondenceDetailsComponent } from './components/litigation-request-correspondence-details/litigation-request-correspondence-details.component';
import { LitigationRequestNotesListComponent } from './pages/litigation-request-notes-list/litigation-request-notes-list.component';
import { ModificationRequestsComponent } from './components/modification-requests/modification-requests.component';
import { LawsuitFullDetailsComponent } from './components/lawsuit-full-details/lawsuit-full-details.component';
import { DelegationRequestsListComponent } from './components/delegation-requests-list/delegation-requests-list.component';
import { DelegationRequestDetailsComponent } from './components/delegation-request-details/delegation-request-details.component';
import { DelegatorsStopModifyListComponent } from './components/delegators-stop-modify-list/delegators-stop-modify-list/delegators-stop-modify-list.component';
import { DelegatorsAssignListComponent } from './components/delegators-assign-list/delegators-assign-list/delegators-assign-list.component';
import { LawsuitDetailsForReportComponent } from './pages/lawsuit-details-for-report/lawsuit-details-for-report.component';
import { permissionGuard } from '@app/modules/layout/services/AuthGaurd/permission-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: Configuration.pages.lawsuits.lawsuitList,
    pathMatch: "full"
  },
  {
    path: Configuration.pages.lawsuits.lawsuitList,
    component: LawsuitListComponent,
    canActivate: [permissionGuard],
        data: { 
          permissions: ['Review.View'] 
        }
  },
  {
    
    path: `${Configuration.pages.lawsuits.lawsuitFullDetails}/:id`,
    component: LawsuitFullDetailsComponent,
  },
  {
    path: Configuration.pages.lawsuits.AuditngListReconciliation,
    component: AuditngListReconciliationComponent,
  },
  {
    path: Configuration.pages.lawsuits.AuditngListArbitration,
    component: AuditngListArbitrationComponent,
  },
  {
    path: Configuration.pages.litigation.litigationRequestCorrespondencesList,
    component: LitigationRequestCorrespondenceListComponent,
  },
  {
    path: Configuration.pages.litigation.litigationModificationRequests,
    component: ModificationRequestsComponent,
  },
  {
    path: `${Configuration.pages.litigation.litigationRequestCorrespondencesDetails}/:id`,
    component: LitigationRequestCorrespondenceDetailsComponent,
  },
  {
    path: Configuration.pages.litigation.litigationRequestNotesList,
    component: LitigationRequestNotesListComponent,
  },
  {
    path: `${Configuration.pages.lawsuits.lawsuitDetails}/:id`,
    component: LawsuitDetailsComponent,
  },
  {
    path: `${Configuration.pages.lawsuits.lawsuitDetailsForReport}/:id`,
    component: LawsuitDetailsForReportComponent,
  },
  {
    path: Configuration.pages.lawsuits.DelegationRequestList,
    component: DelegationRequestsListComponent,
  },
  {
    path: `${Configuration.pages.lawsuits.DelegationRequestDetails}/:id`,
    component: DelegationRequestDetailsComponent
  },
  {
    path: Configuration.pages.lawsuits.StopModifyDelegators,
    component: DelegatorsStopModifyListComponent,
  },
  {
    path: Configuration.pages.lawsuits.assignDelegators,
    component: DelegatorsAssignListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawsuitsRoutingModule { }
