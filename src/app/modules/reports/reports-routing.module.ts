import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { StatisticsReviewComponent } from './components/litigation/statistics-review/statistics-review.component';
import { StatisticsReformerComponent } from './components/litigation/statistics-reformer/statistics-reformer.component';
import { StatisticsArbitrationComponent } from './components/litigation/statistics-arbitration/statistics-arbitration.component';
import {  StatisticsReviewReportComponent } from './components/litigation/statistics-review-report/statistics-review-report.component';
import { ListReviewReportComponent } from './components/litigation/list-review-report/list-review-report.component';
import { ListReformerReportComponent } from './components/litigation/list-reformer-report/list-reformer-report.component';
import { ListArbitratorReportComponent } from './components/litigation/list-arbitrator-report/list-arbitrator-report.component';
import { StatisticsReformerReportComponent } from './components/litigation/statistics-reformer-report/statistics-reformer-report.component';
import { StatisticsArbitrationReportComponent } from './components/litigation/statistics-arbitration-report/statistics-arbitration-report.component';
import { ReviewersReportComponent } from './components/litigation/reviewers-report/reviewers-report.component';
import { ReformersReportComponent } from './components/litigation/reformers-report/reformers-report.component';
import { ArbitratorsReportComponent } from './components/litigation/arbitrators-report/arbitrators-report.component';
import { ReviewDashbourdComponent } from './components/litigation/review-dashbourd/review-dashbourd.component';
import { ReconcilationDashbourdComponent } from './components/litigation/reconcilation-dashbourd/reconcilation-dashbourd.component';
import { ArbitrationDashbourdComponent } from './components/litigation/arbitration-dashbourd/arbitration-dashbourd.component';
import { permissionGuard } from '../layout/services/AuthGaurd/permission-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: Configuration.pages.reports.statisticsReview,
    pathMatch: "full"
  },
  {
    path: Configuration.pages.reports.statisticsReview,
    component: StatisticsReviewComponent,
    canActivate: [permissionGuard],
       data: { 
         permissions: ['Review.View'] 
       }
  },
  {
    path: Configuration.pages.reports.statisticsReformer,
    component: StatisticsReformerComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Reconciliation.View'] 
    }
  },
  {
    path: Configuration.pages.reports.StatiscsReformerReport,
    component: StatisticsReformerReportComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Reconciliation.View'] 
    }
  },
  {
    path: Configuration.pages.reports.StatiscsArbitirationReport,
    component: StatisticsArbitrationReportComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Arbitration.View'] 
    }
  },
  {
    path: Configuration.pages.reports.statisticsArbitration,
    component: StatisticsArbitrationComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Arbitration.View'] 
    }
  },
  {
    path: Configuration.pages.reports.statisticsReviewReport,
    component: StatisticsReviewReportComponent,
    canActivate: [permissionGuard],
       data: { 
         permissions: ['Review.View'] 
       }
  },
  {
    path: Configuration.pages.reports.listReviewReport,
    component: ListReviewReportComponent,
    canActivate: [permissionGuard],
       data: { 
         permissions: ['Review.View'] 
       }
  },
  {
    path: Configuration.pages.reports.listReformerReport,
    component: ListReformerReportComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Reconciliation.View'] 
    }
  },
  {
    path: Configuration.pages.reports.listArbitratorReport,
    component: ListArbitratorReportComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Arbitration.View'] 
    }
  },
  {
    path: Configuration.pages.reports.ReviewersReport,
    component: ReviewersReportComponent,
    canActivate: [permissionGuard],
       data: { 
         permissions: ['Review.View'] 
       }
  },
    
  {
    path: Configuration.pages.reports.ReformersReport,
    component: ReformersReportComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Reconciliation.View'] 
    }
  },
  {
    path: Configuration.pages.reports.ArbitratorsReport,
    component: ArbitratorsReportComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Arbitration.View'] 
    }
  },
  {
    path: Configuration.pages.reports.ReviewDashbourd,
    component: ReviewDashbourdComponent,
    canActivate: [permissionGuard],
       data: { 
         permissions: ['Review.View'] 
       }
  },
  {
    path: Configuration.pages.reports.ReformerDashbourd,
    component: ReconcilationDashbourdComponent,
     data: { 
      permissions: ['Reconciliation.View'] 
    }
  },
  {
    path: Configuration.pages.reports.ArbitratorDashbourd,
    component: ArbitrationDashbourdComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: ['Arbitration.View'] 
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
