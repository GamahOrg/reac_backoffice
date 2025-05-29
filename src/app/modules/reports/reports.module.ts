import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsService } from './services/reports-service';
import { StatisticsReviewComponent } from './components/litigation/statistics-review/statistics-review.component';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsReformerComponent } from './components/litigation/statistics-reformer/statistics-reformer.component';
import { BreadcrumbsComponent } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { StatisticsArbitrationComponent } from './components/litigation/statistics-arbitration/statistics-arbitration.component';
import {  StatisticsReviewReportComponent } from './components/litigation/statistics-review-report/statistics-review-report.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { NgChartsModule } from 'ng2-charts';
import { LookupsService } from '@app/shared/services/lookups/lookups.service';
import { ListReviewReportComponent } from './components/litigation/list-review-report/list-review-report.component';
import { ListReformerReportComponent } from './components/litigation/list-reformer-report/list-reformer-report.component';
import { ListArbitratorReportComponent } from './components/litigation/list-arbitrator-report/list-arbitrator-report.component';
import { StatisticsReformerReportComponent } from './components/litigation/statistics-reformer-report/statistics-reformer-report.component';
import { StatisticsArbitrationReportComponent } from './components/litigation/statistics-arbitration-report/statistics-arbitration-report.component';
import { ReviewersReportComponent } from './components/litigation/reviewers-report/reviewers-report.component';
import { ReformersReportComponent } from './components/litigation/reformers-report/reformers-report.component';
import { ArbitratorsReportComponent } from './components/litigation/arbitrators-report/arbitrators-report.component';
import { ReformersReportChartComponent } from './components/litigation/reformers-report-chart/reformers-report-chart.component';
import { ArbitratorsReportChartComponent } from './components/litigation/arbitrators-report-chart/arbitrators-report-chart.component';
import { ReviewersReportChartComponent } from './components/litigation/reviewers-report-chart/reviewers-report-chart.component';


@NgModule({
  declarations: [
    StatisticsReviewComponent,
    StatisticsReformerComponent,
    StatisticsArbitrationComponent,
    ListReviewReportComponent,
    ListReformerReportComponent,
    ListArbitratorReportComponent,
    StatisticsReviewReportComponent,
    StatisticsReformerReportComponent,
    StatisticsArbitrationReportComponent,
    ReviewersReportComponent,
    ReformersReportComponent,
    ArbitratorsReportComponent,
    ReformersReportChartComponent,
    ArbitratorsReportChartComponent,
    ReviewersReportChartComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsRoutingModule,
    PaginationComponent,
    ReactiveFormsModule,
    OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeModule,
    BreadcrumbsComponent,
    NgChartsModule

  ],
  providers:[
    ReportsService,
    LookupsService
  ]
})
export class ReportsModule { }
