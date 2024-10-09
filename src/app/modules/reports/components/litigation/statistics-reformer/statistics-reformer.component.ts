import { Component, OnInit } from '@angular/core';
import { GetLitigationStatisticsMainReportResult } from '@app/modules/reports/models/litigation-statistics-review/litigation-statistics-review.model';
import { ReportFilter } from '@app/modules/reports/models/report-filter-request/report-filter-request.model';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics-reformer',
  templateUrl: './statistics-reformer.component.html',
  styleUrl: './statistics-reformer.component.scss'
})
export class StatisticsReformerComponent extends BaseComponent implements OnInit {
  reportData: GetLitigationStatisticsMainReportResult | undefined;
  input: ReportFilter = new ReportFilter();
  constructor(
    private _reportsService: ReportsService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
  ) {
    super();
    
  }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.getReportData();
  }

  getReportData(){
    debugger;
    this._reportsService.GetLitigationStatisticsReformerReportResult(this.input)
    .subscribe({
      next: (res) => {
        debugger;
          console.log(res);

          this.reportData = res?.data?.[0];

      }
  })
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
        { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
        { label: this._translateService.instant(this.translations.layout.sidebar.litigationStatisticsReformerReport) }
    ])
}

}
