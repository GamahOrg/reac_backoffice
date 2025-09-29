import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ComplainDto, ComplainSearchDto, getComplaintStatusName, getComplaintTypeName, getStatusBadgeClass } from '../../../models/ComplainDto';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { ComplaintService } from '../../../services/ComplaintService.service';
declare var html2pdf: any;

@Component({
  selector: 'app-complaint-report',
  templateUrl: './compliant-report.component.html',
  styleUrl: './compliant-report.component.scss'
})
export class ComplaintReportComponent extends BaseComponent implements OnInit {
  complaints: ComplainDto[] = [];
  allComplaintsForExport: ComplainDto[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  totalPages = 0;
  loading = false;
  isStaff = true; 
  Math = Math;
  currentDate: Date = new Date();
  // Search filters
  searchDto: ComplainSearchDto = {
    pageNumber: 1,
    pageSize: 10
  };

  // Dropdown options
  complaintTypes: any[] = [];
  complaintStatuses: any[] = [];

  @ViewChild('pdfContent') pdfContent!: ElementRef;

  constructor(
    private _complaintService: ComplaintService,
    private _translateService: TranslateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.isStaff = true;
    this.complaintTypes = this._complaintService.getLocalComplaintTypes();
    this.complaintStatuses = this._complaintService.getLocalComplaintStatuses(this.isStaff);
    
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.loading = true;
    this.searchDto.isStaff = this.isStaff;
    this._complaintService.getComplaints(this.searchDto).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.complaints = response.data.items;
          this.totalCount = response.data.totalCount;
          this.pageNumber = response.data.pageNumber;
          this.pageSize = response.data.pageSize;
          this.totalPages = response.data.totalPages;

          console.log('Loaded complaints:', this.complaints);
        } else {
          console.error('Error loading complaints:', response.message);
        }
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading complaints:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.searchDto.pageNumber = 1;
    this.loadComplaints();
  }

  onPageChange(page: number): void {
    this.searchDto.pageNumber = page;
    this.loadComplaints();
  }

  onPageSizeChange(event: any): void {
    var size = event.target.value;
    this.searchDto.pageSize = Number(size);
    this.searchDto.pageNumber = 1;
    this.loadComplaints();
  }

  clearFilters(): void {
    this.searchDto = {
      pageNumber: 1,
      pageSize: this.pageSize
    };
    this.loadComplaints();
  }

  // Export to Excel functionality
  exportToExcel(): void {
    const exportSearchDto = { ...this.searchDto };
    exportSearchDto.pageNumber = 1;
    exportSearchDto.pageSize = 1000000; // Large number to get all records

    this._complaintService.getComplaints(exportSearchDto).subscribe(
      (response: any) => {
        if (response.success) {
          this.allComplaintsForExport = response.data.items as ComplainDto[];
          
          if (this.allComplaintsForExport.length > 0) {
            const headers = [
              'رقم التذكرة',
              'النوع',
              'الوصف',
              'الحالة',
              'تاريخ الإرسال',
              'وقت الإرسال',
              'اسم مقدم الطلب',
              'رقم الجوال'
            ];

            const data = this.allComplaintsForExport.map(item => [
              item.ticketNumber,
              this.getComplaintTypeName(item.complainsTypeId),
              item.ticketDescription,
              this.getComplaintStatusName(item.complainsStatusId),
              item.createdDate,
              this.formatTime(item.createdTime),
              item.customerName,
              item.mobileNo
            ]);

            const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
            const colWidths = headers.map(() => ({ width: 20 }));
            ws['!cols'] = colWidths;

            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            
            const formattedDate = new Date().toISOString().split('T')[0];
            const fileName = `تقرير_الشكاوى_والاستفسارات_${formattedDate}.xlsx`;
            XLSX.writeFile(wb, fileName);
          } else {
            console.warn('No data available for export');
            alert('لا توجد بيانات للتصدير');
          }
        } else {
          console.error('Error exporting data:', response.message);
          alert('خطأ في تصدير البيانات: ' + response.message);
        }
      },
      (error: any) => {
        console.error('Error exporting data:', error);
        alert('حدث خطأ أثناء تصدير البيانات');
      }
    );
  }

  // Download chart as PDF
  downloadPDF(): void {
    const element = this.pdfContent.nativeElement;
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.setProperty('display', 'block');
    clonedElement.style.width = '265mm';
    clonedElement.style.transform = 'scale(0.77)';
    
    // // Convert all canvas elements to images
    // const canvases = this.pdfContent.nativeElement.querySelectorAll('canvas');
    // const clonedCanvases = clonedElement.querySelectorAll('canvas');

    // canvases.forEach((canvas: any, index: any) => {
    //   const img = document.createElement('img');
    //   img.src = canvas.toDataURL('image/png');
    //   img.style.width = canvas.style.width;
    //   img.style.height = canvas.style.height;

    //   const clonedCanvas = clonedCanvases[index];
    //   clonedCanvas.parentNode?.replaceChild(img, clonedCanvas);
    // });

    const formattedDate = new Date().toISOString().split('T')[0];
    const fileName = `تقرير_الشكاوى_والاستفسارات_${formattedDate}.pdf`;

    const options = {
      margin: [0, 0, 0, 0],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.99 },
      html2canvas: {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        logging: false,
        scrollY: 0
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'landscape'
      },
      pagebreak: {
        mode: ['css', 'legacy']
      }
    };

    html2pdf()
      .from(clonedElement)
      .set(options)
      .save()
      .then(() => {
        clonedElement.remove();
      })
      .catch((error: any) => {
        console.error('Error generating PDF:', error);
        alert('حدث خطأ أثناء تصدير ملف PDF');
        clonedElement.remove();
      });
  }

  // Utility methods
  getComplaintTypeName(typeId: number): string {
    return getComplaintTypeName(typeId);
  }

  getComplaintStatusName(statusId: number): string {
    return getComplaintStatusName(statusId, this.isStaff);
  }

  getStatusBadgeClass(statusId: number): string {
    return getStatusBadgeClass(statusId);
  }

  formatTime(timeString: string): string {
    return timeString ? timeString.substring(0, 5) : '';
  }

  onStatusFilterChange(statusIds: number[]): void {
    this.searchDto.statusIds = statusIds;
  }
}