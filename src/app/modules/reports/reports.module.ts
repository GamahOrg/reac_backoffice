import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsService } from './services/reports-service';
import { StatisticsReviewComponent } from './components/litigation/statistics-review/statistics-review.component';
import { SharedModule } from '@app/shared/shared.module';
import { StatisticsReformerComponent } from './components/litigation/statistics-reformer/statistics-reformer.component';
import { BreadcrumbsComponent } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { StatisticsArbitrationComponent } from './components/litigation/statistics-arbitration/statistics-arbitration.component';


@NgModule({
  declarations: [
    StatisticsReviewComponent,
    StatisticsReformerComponent,
    StatisticsArbitrationComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportsRoutingModule,
    BreadcrumbsComponent,

  ],
  providers:[
    ReportsService
  ]
})
export class ReportsModule { }
