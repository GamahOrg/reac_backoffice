import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { VacationRequestComponent } from './components/vacation-request/vacation-request.component';
import { VacationRequestService } from './services/vacation-requests.service';
import { MY_MOMENT_FORMATS, SharedModule } from '@app/shared/shared.module';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { VacationRequestsReplyComponent } from './components/vacation-requests-reply/vacation-requests-reply.component';
import { BreadcrumbsComponent } from "../../../shared/components/breadcrumbs/breadcrumbs.component";


@NgModule({
  declarations: [
    VacationRequestComponent,
    VacationRequestsReplyComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    PaginationComponent,
    ReactiveFormsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeModule,
    BreadcrumbsComponent
],
  providers:[
    VacationRequestService,
  { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS }

  ]
})
export class UserManagementModule { }
