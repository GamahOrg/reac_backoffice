import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-statistics-arbitration',
  templateUrl: './statistics-arbitration.component.html',
  styleUrl: './statistics-arbitration.component.scss'
})
export class StatisticsArbitrationComponent extends BaseComponent implements OnInit  {
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
      XLSX.writeFile(wb, 'تقرير أعداد الدعاوى في مرحلة التحكيم.xlsx');
    }
}
