import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ConfigrationAdminstrativeFeesComponent } from './components/configration-adminstrative-fees/configration-adminstrative-fees.component';
import { ConfigrationReconciliationFeesSettingsComponent } from './components/configration-reconciliation-fees-settings/configration-reconciliation-fees-settings.component';
import { ConfigrationReconciliationSettingstageComponent } from './components/configration-reconciliation-settingstage/configration-reconciliation-settingstage.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';

const routes: Routes = [
  
  {
    path: Configuration.pages.usersManagement.userList,
    component: UsersListComponent,
  },
  {
    path: Configuration.pages.usersManagement.createUser,
    component: CreateUserComponent,
  },
  {
    path: Configuration.pages.usersManagement.admistrativeFees,
    component: ConfigrationAdminstrativeFeesComponent,
  },
  {
    path: Configuration.pages.usersManagement.reconciliationFees,
    component: ConfigrationReconciliationFeesSettingsComponent,
  },
  {
    path: Configuration.pages.usersManagement.reconciliationSettings,
    component: ConfigrationReconciliationSettingstageComponent,
  },
  {
    path: Configuration.pages.usersManagement.TermsSettings,
    component: TermsConditionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
