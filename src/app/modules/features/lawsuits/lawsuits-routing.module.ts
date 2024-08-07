import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '../../../core/configurations/shared.config';
import { LawsuitListComponent } from './pages/lawsuits-list/lawsuits-list.component';
import { LawsuitDetailsComponent } from './pages/lawsuit-details/lawsuit-details.component';
import { AuditngListReconciliationComponent } from './pages/auditng-list-reconciliation/auditng-list-reconciliation.component';
import { AuditngListArbitrationComponent } from './pages/auditng-list-arbitration/auditng-list-arbitration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: Configuration.pages.lawsuits.lawsuitList,
    pathMatch: "full"
  },
  {
    path: Configuration.pages.lawsuits.lawsuitList,
    component: LawsuitListComponent,
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
    path: `${Configuration.pages.lawsuits.lawsuitDetails}/:id`,
    component: LawsuitDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LawsuitsRoutingModule { }
