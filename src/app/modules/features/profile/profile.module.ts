import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationRequestComponent } from './components/vacation-request/vacation-request.component';
import { VacationRequestService } from './services/vacation-requests.service';
import { MY_MOMENT_FORMATS, SharedModule } from '@app/shared/shared.module';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { VacationRequestsReplyComponent } from './components/vacation-requests-reply/vacation-requests-reply.component';
import { BreadcrumbsComponent } from "../../../shared/components/breadcrumbs/breadcrumbs.component";
import { profileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangePasswordService } from './services/change-password.service';


@NgModule({
  declarations: [
    VacationRequestComponent,
    VacationRequestsReplyComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    profileRoutingModule,
    SharedModule,
    PaginationComponent,
    ReactiveFormsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeModule,
    BreadcrumbsComponent
],
  providers:[
    VacationRequestService,
    ChangePasswordService,
  { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS }

  ]
})
export class ProfileModule { }
