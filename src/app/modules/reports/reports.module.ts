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


@NgModule({
  declarations: [
    StatisticsReviewComponent,
    StatisticsReformerComponent,
    StatisticsArbitrationComponent,
    ListReviewReportComponent,
    StatisticsReviewReportComponent
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
