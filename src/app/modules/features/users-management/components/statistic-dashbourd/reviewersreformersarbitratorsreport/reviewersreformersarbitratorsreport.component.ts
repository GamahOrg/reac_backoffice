import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { ListArbitratorsReportResult, FilterArbitratorRequestDto } from '@app/modules/reports/models/arbitrators-report/arbitrators-report';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { pagination } from '@app/shared/models/pagination.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ReviewReformerArbitratorDto, ReviewReformerArbitratorFilterDto } from '../../../models/review-reformer-arbitratorDto';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import * as XLSX from 'xlsx';
import { Configuration } from '@app/core/configurations/shared.config';
import html2pdf from 'html2pdf.js';
@Component({
  selector: 'app-reviewersreformersarbitratorsreport',
  templateUrl: './reviewersreformersarbitratorsreport.component.html',
  styleUrl: './reviewersreformersarbitratorsreport.component.scss'
})
export class ReviewersreformersarbitratorsreportComponent extends BaseComponent implements OnInit {

  private _paginationService = inject(PaginationService);
    private _breadcrumbService = inject(BreadcrumbService);
    private _translateService = inject(TranslateService);
    @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  
    chart: Chart | null = null;
    selectedChartType: ChartType = 'bar';
    selectedDataView: string = 'litigation';


    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
    };
  
    isAdmin: boolean = false;
  
    listAllPersonasReport: ReviewReformerArbitratorDto[] = [];
    listAllPersonasReportForExcel: ReviewReformerArbitratorDto[] = []; // Add this line
  
    filterRequest: ReviewReformerArbitratorFilterDto | undefined;
  
    filterVisibility: FilterVisibility = {
      employee: true,
      reformers: true,
      arbitrators: true,
      requestCode: false,
      fromDate: false,
      toDate: false,
      areaIds: false,
      citiesIds: false,
      litigationRequestCategoryIds: false,
      litigationRequestStatusIds: false,
      litigationRequestAmountId: false,
      litigationRequestStageIds: true,
      reviewerName: false,
      reviewerStatus: true,
      experienceYears: false,
      arbitratorClass: true // Assuming this is a typo and should be part of the visible filters
    };
  
    /**
     *
     */
    constructor(
      private _reportsService: ReportsService,
      private _storageService: StorageService
    ) {
      super();
      this.createChart();
  
      this.isAdmin = this._storageService.getUserType() == 'true' ? true : false;
  
    }
  
    ngOnInit(): void {
  
      this.filterRequest  = {
        employeeIds: null,
        reformersIds: null,
        arbitratorsIds: null,
        arbitratorClassIds: null,
        personnelStatusId: null,
        personnelTypeId: null,
        experienceYears: null,
        skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
        take: this.pagintationData.pageSize
      }
  
      this.updateBreadcrumb();
  
      this.getAllPersonasReport(this.filterRequest);
      this.watchPaginationActions();
    }
  
    ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
    if (this.listAllPersonasReport.length === 0) {
      this.chart?.destroy();
      this.chart = null;
    }else{
      this.updateChart();
    }
  }


    private updateBreadcrumb(): void {
      this._breadcrumbService.updateBreadcrumbListContent([
        { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
        { label: this._translateService.instant(this.translations.layout.sidebar.allPersonasStatisticsForAdminReport) }
      ])
    };
  
  
    onFilterChange(values: any) {
      // You can now use these values to fetch data or perform other actions
      this.filterRequest = {
        employeeIds: values.employeeIds,
        reformersIds: values.reformersIds,
        arbitratorsIds: values.arbitratorsIds,
        arbitratorClassIds: values.arbitratorClassIds,
        personnelStatusId: values.reviewerStatus,
        personnelTypeId: values.litigationRequestStageIds ?? values.personnelTypeId,
        experienceYears: values.experienceYears,
        skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
        take: this.pagintationData.pageSize
      };
  
      this.getAllPersonasReport(this.filterRequest);
    }
  
    getAllPersonasReport(request: any): void {
      this._reportsService.getAllPersonasReport(request).subscribe(
        (response: any) => {
          this.listAllPersonasReport = response.data.results as ReviewReformerArbitratorDto[];
          this.pageCount = response.data.pageCount;
  
          this.setPaginationData(
            response.data.pageSize,
            response.data.totalCount
          );

             this.createChart();
    
        },
        (error: any) => {
          console.error('Error loading data:', error);
        }
      );
    }
  
    private setPaginationData(pageSize: number, total: number): void {
      this.pagintationData.pageSize = pageSize
      this.pagintationData.totalCount = total
      this._paginationService.updatePaginationData(this.pagintationData);
    }
  
    private watchPaginationActions(): void {
      this.watchPagechanged();
      this.watchPaginationClicked();
    }
  
    private watchPagechanged(): void {
      this._paginationService.pageChanged
        .pipe(takeUntil(this.destroy$))
        .subscribe((pageNo) => {
          
          this.loadNextPage(pageNo);
          this.newPageNo = pageNo;
        })
    }
  
    private watchPaginationClicked(): void {
      this._paginationService.pageClicked
        .pipe(takeUntil(this.destroy$))
        .subscribe((nextPage: number) => {
          
          if (this.pagintationData.currentPage != nextPage) {
            this.loadNextPage(nextPage);
            this.pagintationData.currentPage = this.newPageNo;
          }
        })
    }
  
    private loadNextPage(nextPage: number): void {
      this.pagintationData.currentPage = nextPage;
      this.onFilterChange(this.filterRequest);
  
    }
  
    createChart() {

      debugger;

    if (this.listAllPersonasReport.length === 0) {
      this.chart?.destroy();
      this.chart = null;
      return;
    }
  
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;
  
    const chartConfig = this.getChartConfiguration();
    
    if (this.chart) {
      this.chart.destroy();
    }
    
    this.chart = new Chart(ctx, chartConfig);
  }

    updateChart() {
    this.createChart();
    
  }

  getTotalCases(): number {
    return this.listAllPersonasReport.reduce((sum, item) => sum + (typeof item.totalLitigationCount === 'number' ? item.totalLitigationCount : 0), 0);
  }
  
  getAverageCompletionRate(): string {
    const avgFinished = this.listAllPersonasReport.reduce((sum, item) => sum + (typeof item.finishedRatio === 'number' ? item.finishedRatio : 0), 0) / this.listAllPersonasReport.length;
    return avgFinished.toFixed(1);
  }

getChartConfiguration(): ChartConfiguration {
    const datasets = this.getDatasets();
    const labels = this.getLabels();
  
    return {
      type: this.selectedChartType,
      data: {
        labels: labels,
        datasets: datasets?? []
         
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: this.getChartTitle(),
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: this.getScales()
      }
    };
  }

   getDatasets() {
    switch (this.selectedDataView) {
      case 'litigation':
        return [
          {
            label: 'الحاليه',
            data: this.listAllPersonasReport.map(item => typeof item.notFinishedCount === 'string' ? parseFloat(item.notFinishedCount) : item.notFinishedCount ?? null),
            backgroundColor: '#ff6b6b',
            borderColor: '#ff5252',
            borderWidth: 1
          },
          {
            label: 'مكتملة',
            data: this.listAllPersonasReport.map(item => typeof item.finishedCount === 'string' ? parseFloat(item.finishedCount) : item.finishedCount ?? null),
            backgroundColor: '#4ecdc4',
            borderColor: '#26a69a',
            borderWidth: 1
          },
          {
            label: ' المتاخره',
            data: this.listAllPersonasReport.map(item => typeof item.dueDateCount === 'string' ? parseFloat(item.dueDateCount) : item.dueDateCount ?? null),
            backgroundColor: '#45b7d1',
            borderColor: '#2196f3',
            borderWidth: 1
          }
        ];
      
      case 'ratios':
        return [
          {
            label: 'نسبه الحاليه %',
            data: this.listAllPersonasReport.map(item => typeof item.notFinishedRatio === 'string' ? parseFloat(item.notFinishedRatio) : item.notFinishedRatio ?? null),
            backgroundColor: '#ff6b6b',
            borderColor: '#ff5252',
            borderWidth: 1
          },
          {
            label: 'نسبة المكتملة %',
            data: this.listAllPersonasReport.map(item => typeof item.finishedRatio === 'string' ? parseFloat(item.finishedRatio) : item.finishedRatio ?? null),
            backgroundColor: '#4ecdc4',
            borderColor: '#26a69a',
            borderWidth: 1
          },
          {
            label: 'نسبة  المتاخره %',
            data: this.listAllPersonasReport.map(item => typeof item.dueDateRatio === 'string' ? parseFloat(item.dueDateRatio) : item.dueDateRatio ?? null),
            backgroundColor: '#45b7d1',
            borderColor: '#2196f3',
            borderWidth: 1
          }
        ];
      
      default:
        return [];
    }
  }
  
  getLabels(): string[] {
    return this.listAllPersonasReport.map(item => (item.personnelName ?? 'غير محدد') as string);
  }

  getScales(): any {
    if (this.selectedChartType === 'pie' || this.selectedChartType === 'doughnut') {
      return {};
    }
  
    return {
      x: {
        display: true,
        title: {
          display: true,
          text: 'المصلحون'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: this.selectedDataView === 'ratios' ? 'النسبة المئوية (%)' : 'العدد'
        },
        beginAtZero: true
      }
    };
  }

  getChartTitle(): string {
    switch (this.selectedDataView) {
      case 'litigation':
        return 'الدعاوى  حسب الحالة';
      case 'ratios':
        return 'نسب الإنجاز حسب المصلح';
      default:
        return 'إحصائيات الدعاوى ';
    }
  }

  exportToExcel(): void {
    this.filterRequest!.skip = 0;
    this.filterRequest!.take = 1000000;

    this._reportsService.getAllPersonasReport(this.filterRequest!).subscribe(
        (response: any) => {
            this.listAllPersonasReportForExcel = response.data.results as ReviewReformerArbitratorDto[];
            
            if (this.listAllPersonasReportForExcel.length > 0) {
                const headers = [
                    this._translateService.instant(this.translations.Reports.personnelName),
                    this._translateService.instant(this.translations.Reports.employeeStatus),
                    this._translateService.instant(this.translations.Reports.department),
                    this._translateService.instant(this.translations.Reports.totalLitigationCount),
                    this._translateService.instant(this.translations.Reports.notFinishedCount),
                    this._translateService.instant(this.translations.Reports.finishedCount),
                    this._translateService.instant(this.translations.Reports.totalReviewDueDateCount),
                    this._translateService.instant(this.translations.Reports.notFinishedRatio),
                    this._translateService.instant(this.translations.Reports.finishedRatio),
                    this._translateService.instant(this.translations.Reports.totalReviewDueDateRatio)
                ];

                const data = this.listAllPersonasReportForExcel.map(item => [
                    item.personnelName,
                    item.personnelStatus,
                    item.personnelType,
                    item.totalLitigationCount,
                    item.notFinishedCount,
                    item.finishedCount,
                    item.dueDateCount,
                    item.notFinishedRatio,
                    item.finishedRatio,
                    item.dueDateRatio
                ]);

                const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
                const colWidths = headers.map(() => ({ width: 20 }));
                ws['!cols'] = colWidths;

                const wb: XLSX.WorkBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb, 'تقرير إحصائيات المدققين والمصلحين والمحكمين.xlsx');
            } else {
                console.warn('No data available for export');
            }
        },
        (error: any) => {
            console.error('Error exporting data:', error);
        }
    );
  }

   ///download chart as pdf 
      @ViewChild('pdfContent') pdfContent!: ElementRef;
      downloadPDF() {
        const element = this.pdfContent.nativeElement;
        const clonedElement = element.cloneNode(true) as HTMLElement;
        clonedElement.style.setProperty('display', 'block');
        clonedElement.style.width ='265mm';
        
        // clonedElement.style.width = '1120px';
        clonedElement.style.transform = 'scale(0.77)';
        // Convert all canvas elements to images
        const canvases = this.pdfContent.nativeElement.querySelectorAll('canvas');
        const clonedCanvases = clonedElement.querySelectorAll('canvas');
      
        canvases.forEach((canvas:any, index:any) => {
          const img = document.createElement('img');
          img.src = canvas.toDataURL('image/png');
          img.style.width = canvas.style.width;
          img.style.height = canvas.style.height;
      
          const clonedCanvas = clonedCanvases[index];
          clonedCanvas.parentNode?.replaceChild(img, clonedCanvas);
        });
        const formattedDate = new Date().toISOString().split('T')[0]; // "2025-06-04"
        const fileName = `لوحة_ إحصائيات_المدققين_المصلحين_المحكمين_${formattedDate}.pdf`;
      
        const options = {
          margin: [0,0, 0, 0],
          filename: fileName,
          image: { type: 'jpeg', quality: 0.99 },
          html2canvas: {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            logging: false,
            scrollY: 0 // avoid scroll offset
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape'
          },
          pagebreak: {
            mode: ['css', 'legacy'],
           
          }
        };
      
        html2pdf()
          .from(clonedElement)
          .set(options)
          .save()
          .then(() => {
            clonedElement.remove(); // Clean up after download
          });
      }
}
