import { Component, Input, OnInit } from '@angular/core';
import { GetLitigationStatisticsMainReportResult } from '@app/modules/reports/models/litigation-statistics-review/litigation-statistics-review.model';
import { ReportFilter } from '@app/modules/reports/models/report-filter-request/report-filter-request.model';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-statistics-reformer',
  templateUrl: './statistics-reformer.component.html',
  styleUrl: './statistics-reformer.component.scss'
})
export class StatisticsReformerComponent extends BaseComponent implements OnInit {
  // reportData: GetLitigationStatisticsMainReportResult | undefined;
  // input: ReportFilter = new ReportFilter();

  @Input() reportData: any;
  constructor(

  ) {
    super();
    
  }

  ngOnInit(): void {
  
  }

 
exportToExcel(): void {
    const element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'تقرير أعداد الدعاوى في مرحلة الصلح.xlsx');
  }

}
