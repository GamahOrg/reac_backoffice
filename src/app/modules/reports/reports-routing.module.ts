import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { StatisticsReviewComponent } from './components/litigation/statistics-review/statistics-review.component';
import { StatisticsReformerComponent } from './components/litigation/statistics-reformer/statistics-reformer.component';
import { StatisticsArbitrationComponent } from './components/litigation/statistics-arbitration/statistics-arbitration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: Configuration.pages.reports.statisticsReview,
    pathMatch: "full"
  },
  {
    path: Configuration.pages.reports.statisticsReview,
    component: StatisticsReviewComponent,
  },
  {
    path: Configuration.pages.reports.statisticsReformer,
    component: StatisticsReformerComponent,
  },
  {
    path: Configuration.pages.reports.statisticsArbitration,
    component: StatisticsArbitrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
