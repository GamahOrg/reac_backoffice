import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { GetLitigationStatisticsMainReportResult } from '@app/modules/reports/models/litigation-statistics-review/litigation-statistics-review.model';
import { ReportFilter } from '@app/modules/reports/models/report-filter-request/report-filter-request.model';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-statistics-review',
  templateUrl: './statistics-review.component.html',
  styleUrl: './statistics-review.component.scss'
})
export class StatisticsReviewComponent extends BaseComponent implements OnInit {
  
  // reportData: GetLitigationStatisticsMainReportResult | undefined;
   @Input() reportData: any;
  input: ReportFilter = new ReportFilter();
  constructor(
    private _reportsService: ReportsService,
   
  
  ) {
    super();
    
  }

  ngOnInit(): void {
   

    // this.getReportData();
  }

  getReportData(){
    
    this._reportsService.GetLitigationStatisticsMainReportResult(this.input)
    .subscribe({
      next: (res) => {
        
          console.log(res);

          this.reportData = res?.data?.[0];

      }
  })
}
  exportToExcel(): void {
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'تقرير أعداد الدعاوى في مرحلة التدقيق.xlsx');
  }
}
