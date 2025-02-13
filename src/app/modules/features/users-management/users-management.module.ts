import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MY_MOMENT_FORMATS, SharedModule } from '@app/shared/shared.module';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { BreadcrumbsComponent } from "../../../shared/components/breadcrumbs/breadcrumbs.component";
import { UsersManagementRoutingModule } from './users-management-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UsersManagementService } from './services/usersManagement.service';
import { ConfigrationAdminstrativeFeesComponent } from './components/configration-adminstrative-fees/configration-adminstrative-fees.component';
import { AdminstrativeFeesService } from './services/adminstrativeFeesService';
import { EditAdminstrativeFeesModalComponent } from "./components/configration-adminstrative-fees/edit-adminstrative-fees-modal/edit-adminstrative-fees-modal.component";
import { AdminstrativeFeesModalComponent } from './components/configration-adminstrative-fees/adminstrative-fees-modal/adminstrative-fees-modal.component';
import { ConfigrationReconciliationFeesSettingsComponent } from './components/configration-reconciliation-fees-settings/configration-reconciliation-fees-settings.component';
import { ReconciliationFeesService } from './services/reconciliationFeesService';
import { ConfigrationReconciliationSettingstageComponent } from './components/configration-reconciliation-settingstage/configration-reconciliation-settingstage.component';
import { ReconciliationSettingService } from './services/reconciliationSettingService';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { termsConditionsService } from './services/termsConditionsService';


@NgModule({
  declarations: [
    UsersListComponent,
    CreateUserComponent,
    ConfigrationAdminstrativeFeesComponent,
    EditAdminstrativeFeesModalComponent,
    AdminstrativeFeesModalComponent,
    ConfigrationReconciliationFeesSettingsComponent,
    ConfigrationReconciliationSettingstageComponent,
    TermsConditionComponent
  ],
  imports: [
    CommonModule,
    UsersManagementRoutingModule,
    SharedModule,
    PaginationComponent,
    ReactiveFormsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeModule,
    BreadcrumbsComponent,
],
  providers:[
     UsersManagementService,
     AdminstrativeFeesService,
     ReconciliationFeesService,
     ReconciliationSettingService,
     termsConditionsService,
  { provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS }

  ]
})
export class UsersManagementModule { }
