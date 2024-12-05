import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { VacationRequestComponent } from './components/vacation-request/vacation-request.component';
import { VacationRequestsReplyComponent } from './components/vacation-requests-reply/vacation-requests-reply.component';

const routes: Routes = [
  
  {
    path: Configuration.pages.userManagement.vacationRequest,
    component: VacationRequestComponent,
  },
  {
    path: Configuration.pages.userManagement.vacationRequestReply,
    component: VacationRequestsReplyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
