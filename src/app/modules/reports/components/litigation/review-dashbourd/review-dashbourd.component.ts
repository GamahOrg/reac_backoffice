import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { LitigationStatisticsDashbourd } from '@app/modules/reports/models/Dashbourd/review-dashbourd';
import { DashbourdRequestDto } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { Chart, ChartType } from 'chart.js';
declare let html2pdf: any;

@Component({
  selector: 'app-review-dashbourd',
  templateUrl: './review-dashbourd.component.html',
  styleUrl: './review-dashbourd.component.scss'
})
export class ReviewDashbourdComponent  implements OnInit, AfterViewInit  {
  @ViewChild('statusChart') statusChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('typeChart') typeChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('reviewChart') reviewChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('overdueChart') overdueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('finishedChart') finishedChartRef!: ElementRef<HTMLCanvasElement>;
  
  selectedChartType: ChartType = 'doughnut';
  selectedDataView: string = 'all';
  statisticsData: LitigationStatisticsDashbourd | null = null;
    private _breadcrumbService = inject(BreadcrumbService);
  filterRequest: DashbourdRequestDto | undefined ;
  isAdmin: boolean=false;
    filterVisibility: FilterVisibility = {
          employee: false,
          reformers: false,
          arbitrators: false,
          requestCode: false,
          fromDate: true,
          toDate: true,
          areaIds: false,
          citiesIds: false,
          litigationRequestCategoryIds: false,
          litigationRequestStatusIds: false,
          litigationRequestAmountId: false,
          litigationRequestStageIds: false,
          reviewerName: false,
          reviewerStatus: false,
           
        };
constructor(
     private _reportsService: ReportsService,
     private translations: TranslateService,
      private _storageService :StorageService,
  ) {
    this.isAdmin = this._storageService.getUserType()=='true' ? true : false;

  }

  private statusChart?: any;
  private typeChart?: any;
  private reviewChart?: any;
  private overdueChart?: any;
  private finishedChart?: any;
  
  // Arabic labels for contract types
  contractTypeLabels = {
    realEstate: 'وساطة عقارية',
    wafi: 'وافي',
    otherServices: 'خدمات أخرى',
    rent: 'إيجار',
    properties: 'عقارات'
  };
  
  // Arabic labels for status
  statusLabels = {
    finished: 'منتهية',
    notFinished: 'غير منتهية',
    dueDate: 'متأخرة'
  };
  
  // Color schemes
  colors = {
    primary: ['#17a2b8', '#20c997', '#ffc107', '#dc3545', '#6f42c1'],
    status: ['#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1'],
    background: ['rgba(23, 162, 184, 0.2)', 'rgba(32, 201, 151, 0.2)', 'rgba(255, 193, 7, 0.2)', 'rgba(220, 53, 69, 0.2)', 'rgba(111, 66, 193, 0.2)']
  };
  
  ngOnInit() {
    this.filterRequest = {
      fromDate: null,
      toDate:null,
      isAdmin: this.isAdmin, 
    };

    this.loadStatisticsData(this.filterRequest);
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeInitCharts();
    }, 100);
  }
  

  onFilterChange(values: any) {
    debugger;
    // You can now use these values to fetch data or perform other actions
    this.filterRequest = {
      fromDate: values.fromDate != null && values.fromDate !== "" ?new Date(values.fromDate).toISOString().split('T')[0]:null,
      toDate:values.toDate != null && values.toDate !== "" ?new Date(values.toDate).toISOString().split('T')[0]:null,
      isAdmin: this.isAdmin, // Assuming this is not needed for this report
    };

    this.loadStatisticsData(this.filterRequest);
  }

  loadStatisticsData(filterRequest?: any) {
    // Sample data - replace with actual API call
    this._reportsService.getReviewDashbourdStatistics(filterRequest).subscribe(
      (response: any) => {
        this.statisticsData = response?.data[0] as LitigationStatisticsDashbourd;
        this.initializeInitCharts();
      },
      (error: any) => {
        console.error('Error loading data:', error);
      }
    );
  }
  initializeInitCharts() {
      this.createStatusChart();
      this.createTypeChart();
      this.createReviewChart();
      this.createOverdueChart();
      this.createFinishedChart();
  }
  initializeCharts() {
    if (this.selectedDataView === 'status') {
      this.createStatusChart();
    } 
    else if (this.selectedDataView === 'all') {
      this.initializeInitCharts();
    }
    else {
      this.createTypeChart();
      this.createReviewChart();
      this.createOverdueChart();
      this.createFinishedChart();
    }
  }
  
  // Get chart options based on selected chart type
  getChartOptions() {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' as const,
          rtl: true
        }
      }
    };
  
    // Add specific options for bar charts
    if (this.selectedChartType === 'bar') {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      };
    }
  
    return baseOptions;
  }
  
  createStatusChart() {
    if (!this.statisticsData) return;
    
    const ctx = this.statusChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
  
    this.statusChart = new Chart(ctx, {
      type: this.selectedChartType,
      data: {
        labels: [this.statusLabels.finished, this.statusLabels.notFinished,this.statusLabels.dueDate],
        datasets: [{
          data: [this.statisticsData.finishedCount, this.statisticsData.notFinishedCount, this.statisticsData.TotalReviewDueDateCount],
          backgroundColor: [this.colors.status[0], this.colors.status[1],this.colors.status[2]],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: this.getChartOptions()
    });
  }
  
  createTypeChart() {
    if (!this.statisticsData) return;
    
    const ctx = this.typeChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
  
    this.typeChart = new Chart(ctx, {
      type: this.selectedChartType,
      data: {
        labels: Object.values(this.contractTypeLabels),
        datasets: [{
          data: [
            this.statisticsData.realEstateBrokerageCount,
            this.statisticsData.wafiCount,
            this.statisticsData.otherServicesCount,
            this.statisticsData.rentCount,
            this.statisticsData.propertiesCount
          ],
          backgroundColor: this.colors.primary,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: this.getChartOptions()
    });
  }
  
  createReviewChart() {
    if (!this.statisticsData) return;
    
    const ctx = this.reviewChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
  
    this.reviewChart = new Chart(ctx, {
      type: this.selectedChartType,
      data: {
        labels: Object.values(this.contractTypeLabels),
        datasets: [{
          data: [
            this.statisticsData.realEstateBrokerageNotFinishedCount,
            this.statisticsData.wafiNotFinishedCount,
            this.statisticsData.otherServicesNotFinishedCount,
            this.statisticsData.rentNotFinishedCount,
            this.statisticsData.propertiesNotFinishedCount
          ],
          backgroundColor: this.colors.primary,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: this.getChartOptions()
    });
  }
  
  createOverdueChart() {
    if (!this.statisticsData) return;
    
    const ctx = this.overdueChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
  
    this.overdueChart = new Chart(ctx, {
      type: this.selectedChartType,
      data: {
        labels: Object.values(this.contractTypeLabels),
        datasets: [{
          data: [
            this.statisticsData.realEstateBrokerageDueDateCount,
            this.statisticsData.wafiDueDateCount,
            this.statisticsData.otherServicesDueDateCount,
            this.statisticsData.rentDueDateCount,
            this.statisticsData.propertiesDueDateCount
          ],
          backgroundColor: this.colors.primary,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: this.getChartOptions()
    });
  }
  
  createFinishedChart() {
    if (!this.statisticsData) return;
    
    const ctx = this.finishedChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
  
    this.finishedChart = new Chart(ctx, {
      type: this.selectedChartType,
      data: {
        labels: Object.values(this.contractTypeLabels),
        datasets: [{
          data: [
            this.statisticsData.realEstateBrokerageFinishedCount,
            this.statisticsData.wafiFinishedCount,
            this.statisticsData.otherServicesFinishedCount,
            this.statisticsData.rentFinishedCount,
            this.statisticsData.propertiesFinishedCount
          ],
          backgroundColor: this.colors.primary,
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: this.getChartOptions()
    });
  }
  
  updateChart() {
    // Destroy existing charts and recreate with new settings
    this.destroyCharts();
    setTimeout(() => {
      this.initializeCharts();
    }, 100);
  }
  
  destroyCharts() {
    if (this.statusChart) {
      this.statusChart.destroy();
      this.statusChart = undefined;
    }
    if (this.typeChart) {
      this.typeChart.destroy();
      this.typeChart = undefined;
    }
    if (this.reviewChart) {
      this.reviewChart.destroy();
      this.reviewChart = undefined;
    }
    if (this.overdueChart) {
      this.overdueChart.destroy();
      this.overdueChart = undefined;
    }
    if (this.finishedChart) {
      this.finishedChart.destroy();
      this.finishedChart = undefined;
    }
  }
  
  // Helper methods for template
  getReviewCount(): number {
    return this.statisticsData?.notFinishedCount || 0;
  }
  
  getReviewPercentage(): number {
    return this.statisticsData?.notFinishedRatio || 0;
  }
  
  getOverdueCount(): number {
    if (!this.statisticsData) return 0;
    return (this.statisticsData.dueDateReconciliationCount || 0) + (this.statisticsData.dueDateArbitrationCount || 0);
  }
  
  getOverduePercentage(): number {
    if (!this.statisticsData || this.statisticsData.totalLitigationCount === 0) return 0;
    return Math.round((this.getOverdueCount() / this.statisticsData.totalLitigationCount) * 100 * 100) / 100;
  }
  
  getFinishedCount(): number {
    return this.statisticsData?.finishedCount || 0;
  }
  
  getFinishedPercentage(): number {
    return this.statisticsData?.finishedRatio || 0;
  }
  

  ngOnDestroy() {
    this.destroyCharts();
  }

  @ViewChild('pdfContent') pdfContent!: ElementRef;
  downloadPDF() {
    // Get reference to the button and hide it
    const downloadButton = document.getElementById('downloadPDF');
    if (downloadButton) {
        downloadButton.style.display = 'none';
    }

    const element = this.pdfContent.nativeElement;
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.setProperty('display', 'block');
    clonedElement.style.width = '287mm';
    clonedElement.style.transform = 'scale(0.88)';

    // Convert canvases to images
    const canvases = this.pdfContent.nativeElement.querySelectorAll('canvas');
    const clonedCanvases = clonedElement.querySelectorAll('canvas');

    canvases.forEach((canvas: any, index: any) => {
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.width = canvas.style.width;
        img.style.height = canvas.style.height;

        const clonedCanvas = clonedCanvases[index];
        clonedCanvas.parentNode?.replaceChild(img, clonedCanvas);
    });

    const formattedDate = new Date().toISOString().split('T')[0];
    const fileName = `لوحة_مؤشرات_إدارة_التدقيق_${formattedDate}.pdf`;
    const options = {
      margin: [0,0, 0, 0],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
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
        before: '.break-before',
        after: '.break-after',
        avoid: ['.chart-section, .card']
      }
    };

    html2pdf()
        .from(clonedElement)
        .set(options)
        .save()
        .then(() => {
            // Show the button again and clean up
            if (downloadButton) {
                downloadButton.style.display = 'block';
            }
            clonedElement.remove();
        });
  }
}
