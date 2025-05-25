import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { forkJoin, takeUntil } from 'rxjs';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { DashbourdRequestDto, RequestCategory } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { AreaResponse } from '@app/modules/features/citizen-requests/models/area-response.model';
import { CityResponse } from '@app/modules/features/citizen-requests/models/city-response.model';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { DepartmentType } from '@app/core/models/enums/department-type.model';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-statistics-review-report',
  templateUrl: './statistics-review-report.component.html',
  styleUrls: ['./statistics-review-report.component.scss']
})
export class StatisticsReviewReportComponent  extends BaseComponent implements OnInit  {


   filterVisibility: FilterVisibility = {
      employee: false,
      reformers: false,
      arbitrators: false,
      requestCode: false,
      fromDate: true,
      toDate: true,
      areaIds: true,
      citiesIds: true,
      litigationRequestCategoryIds: true,
      litigationRequestStatusIds: false,
      litigationRequestAmountId: true,
    };
  
    onFilterChange(values: any) {
      console.log('Filter values:', values);
      debugger;
      // You can now use these values to fetch data or perform other actions
      const request: DashbourdRequestDto = {
        fromDate: values.fromDate != null ?new Date(values.fromDate).toISOString().split('T')[0]:null,
        toDate:values.toDate != null ?new Date(values.toDate).toISOString().split('T')[0]:null,
        areaIds: values.areaIds,
        citiesIds: values.citiesIds,
        litigationRequestCategoryIds:values.litigationRequestCategoryIds,
        isAdmin: this.isAdmin,
        litigationRequestAmountId: values.litigationRequestAmountId,
      };
  
      this._reportsService.getAllLitigationStatistics(request).subscribe(
        (response: any) => {
          this.LitigationStatisticsData = response.data;
          this.fetchLitigationStatistics();
        },
        (error: any) => {
          console.error('Error loading data:', error);
        }
      );
    }

    departmentType: DepartmentType | null = null;
    isAdmin: boolean=false;
    DepartmentType = DepartmentType;
  // Chart data
  public statusPieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public typePieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public pieChartType: ChartType = 'pie';
  public doughnutChartType: ChartType = 'doughnut';
  public labelSumData: ChartData<'doughnut'> = { labels: [], datasets: [] };
 RequestCategory = RequestCategory;

    // Chart configuration options
    public chartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    };
    public chartLegend = true; 

  filterForm!: FormGroup;
  LitigationStatisticsData?: any;
    areasDropDownList: AreaResponse[] = [];
    selectedArea: AreaResponse = {} as AreaResponse;
    selectedCity: CityResponse = {} as CityResponse;
    citiesDropDownList: CityResponse[] = [];
    allCitiesDropDownList: CityResponse[] = [];


  constructor(
     private _reportsService: ReportsService,
          private _storageService :StorageService,
          private _breadcrumbService: BreadcrumbService,
          private _translateService: TranslateService,
  ) {
    super();

    this.isAdmin = this._storageService.getUserType()=='true' ? true : false;
    this.departmentType = Number(this._storageService.getDepartmentType());
  }

  ngOnInit(): void {
    this.setBreadcrumb();
    this.filterDataByDateRange();
  }

  fetchLitigationStatistics(): void {
    const data = this.LitigationStatisticsData?.[0];
    if (!data) return;
  
    const finishedCount = data.finishedCount || 0;
    const notFinishedCount = data.notFinishedCount || 0;
    const dueCount = data.totalReviewDueDateCount || 0;
    const realEstateCount = data.realEstateBrokerageCount || 0;
    const propertiesCount = data.propertiesCount || 0;
    const rentCount = data.rentCount || 0;
    const wafiCount = data.wafiCount || 0;
    const otherCount = data.otherServicesCount || 0;
  
    // Total Chart
    this.labelSumData = {
      labels: [`إجمالى عدد الدعاوى (${data.totalLitigationCount})`],
      datasets: [{
        data: [data.totalLitigationCount || 0],
        backgroundColor: ['#4CAF50'],
        hoverBackgroundColor: ['#388E3C'],
        borderWidth: 1
      }]
    };
  
    // Status Pie Chart
    this.statusPieChartData = {
      labels: [
        `منتهية (${finishedCount}) - ${data.finishedRatio?.toFixed(1) || 0}%`,
        `قيد الدراسة (${notFinishedCount - dueCount}) - ${data.notFinishedRatio?.toFixed(1) || 0}%`,
        `متأخرة (${dueCount}) - ${data.totalReviewDueDateRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [finishedCount, notFinishedCount - dueCount, dueCount],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#388E3C', '#FFA000', '#D32F2F'],
        borderWidth: 1
      }]
    };
  
    // Type Pie Chart
    this.typePieChartData = {
      labels: [
        `وساطة عقارية (${realEstateCount}) - ${data.realEstateBrokerageRatio?.toFixed(1) || 0}%`,
        `ملاك (${propertiesCount}) - ${data.propertiesRatio?.toFixed(1) || 0}%`,
        `إيجار (${rentCount}) - ${data.rentRatio?.toFixed(1) || 0}%`,
        `وافي (${wafiCount}) - ${data.wafiRatio?.toFixed(1) || 0}%`,
        `أخرى (${otherCount}) - ${data.otherServicesRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [realEstateCount, propertiesCount, rentCount, wafiCount, otherCount],
        backgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        borderWidth: 1
      }]
    };
  }


  filterDataByDateRange(): void {
    const request: DashbourdRequestDto = {isAdmin: this.isAdmin};
    this._reportsService.getAllLitigationStatistics(request).subscribe(
      (response: any) => {
        this.LitigationStatisticsData = response.data;
        this.fetchLitigationStatistics();
      },
      (error: any) => {
        console.error('Error loading data:', error);
      }
    );
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
        { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
        { label: this._translateService.instant(this.translations.layout.sidebar.litigationStatisticsReviewReport) }
    ])
}
}
