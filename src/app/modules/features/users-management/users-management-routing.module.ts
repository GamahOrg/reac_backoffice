import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { ConfigrationAdminstrativeFeesComponent } from './components/configration-adminstrative-fees/configration-adminstrative-fees.component';
import { ConfigrationReconciliationFeesSettingsComponent } from './components/configration-reconciliation-fees-settings/configration-reconciliation-fees-settings.component';
import { ConfigrationReconciliationSettingstageComponent } from './components/configration-reconciliation-settingstage/configration-reconciliation-settingstage.component';
import { TermsConditionComponent } from './components/terms-condition/terms-condition.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ConfigrationArbitrationFeesSettingsComponent } from './components/configration-arbitration-fees-settings/configration-arbitration-fees-settings.component';
import { ConfigrationArbitrationSettingstageComponent } from './components/configration-arbitration-settingstage/configration-arbitration-settingstage.component';
import { AdminstrativeFeesModalComponent } from './components/configration-adminstrative-fees/adminstrative-fees-modal/adminstrative-fees-modal.component';
import { EditAdminstrativeFeesModalComponent } from './components/configration-adminstrative-fees/edit-adminstrative-fees-modal/edit-adminstrative-fees-modal.component';
import { ConfigratoinReviewSettingsComponent } from './components/configratoin-review-settings/configratoin-review-settings.component';
import { StatisticDashbourdComponent } from './components/statistic-dashbourd/statistic-dashbourd.component';
import { EditUserComponent } from './components/users-list/edit-user/edit-user.component';
import { TypesStatusDashbourdComponent } from './components/statistic-dashbourd/types-status-dashbourd/types-status-dashbourd.component';
import { ListAdminReportComponent } from './components/list-dashboard/list-admin-report.component';
import { AllStagesStatisticsComponent } from './components/statistic-dashbourd/all-stages-statistics/all-stages-statistics/all-stages-statistics.component';
import { ReviewersreformersarbitratorsreportComponent } from './components/statistic-dashbourd/reviewersreformersarbitratorsreport/reviewersreformersarbitratorsreport.component';

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
    path: Configuration.pages.usersManagement.updateUser,
    component: EditUserComponent,
  },
  {
    path: Configuration.pages.usersManagement.admistrativeFees,
    component: ConfigrationAdminstrativeFeesComponent,
  },
  {
    path: Configuration.pages.usersManagement.createAdmistrativeFees,
    component: AdminstrativeFeesModalComponent,
  },
  {
    path: Configuration.pages.usersManagement.updateAdmistrativeFees,
    component: EditAdminstrativeFeesModalComponent,
     pathMatch: 'full'
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
    path: Configuration.pages.usersManagement.reviewSettings,
    component: ConfigratoinReviewSettingsComponent,
  },
  {
    path: Configuration.pages.usersManagement.arbitirationFees,
    component: ConfigrationArbitrationFeesSettingsComponent,
  },
  {
    path: Configuration.pages.usersManagement.arbitirationsettings,
    component: ConfigrationArbitrationSettingstageComponent,
  },
  {
    path: Configuration.pages.usersManagement.TermsSettings,
    component: TermsConditionComponent,
  },
  {
    path: Configuration.pages.usersManagement.HomePage,
    component: HomePageComponent,
  },
  {
    path: Configuration.pages.usersManagement.Dashbourd,
    component: StatisticDashbourdComponent,
  },
  {
    path: Configuration.pages.usersManagement.DashbourdTypes,
    component: TypesStatusDashbourdComponent,
  },
  {
    path: Configuration.pages.usersManagement.ListOfLitigationForAdminReport,
    component: ListAdminReportComponent,
  },
  {
    path: Configuration.pages.usersManagement.AllStagesStatisiticsForAdminReport,
    component: AllStagesStatisticsComponent,
  },
  {
    path: Configuration.pages.usersManagement.AllPersonasForAdminReport,
    component: ReviewersreformersarbitratorsreportComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersManagementRoutingModule { }
