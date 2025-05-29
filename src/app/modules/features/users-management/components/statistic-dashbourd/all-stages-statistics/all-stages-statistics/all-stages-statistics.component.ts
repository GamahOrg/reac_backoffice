import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DepartmentType } from '@app/core/models/enums/department-type.model';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { AreaResponse } from '@app/modules/features/citizen-requests/models/area-response.model';
import { CityResponse } from '@app/modules/features/citizen-requests/models/city-response.model';
import { DashbourdRequestDto, RequestCategory } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { ChartData, ChartType, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-all-stages-statistics',
  templateUrl: './all-stages-statistics.component.html',
  styleUrl: './all-stages-statistics.component.scss'
})
export class AllStagesStatisticsComponent extends BaseComponent implements OnInit {
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
  litigationRequestStageIds: true,
  reviewerName: false,
  reviewerStatus: false
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
        litigationRequestStageIds: values.litigationRequestStageIds
      };
  
      this._reportsService.getLitigationStatisticsForAdminReport(request).subscribe(
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
  public reviewStatusPieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public reconciliationStatusPieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public arbitrationStatusPieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public reviewTypePieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public reconciliationTypePieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public arbitrationTypePieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public pieChartType: ChartType = 'pie';
  public doughnutChartType: ChartType = 'doughnut';
  public reviewLabelSumData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public reconciliationLabelSumData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  public arbitrationLabelSumData: ChartData<'doughnut'> = { labels: [], datasets: [] };

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
    reviewStatisticsData?: any;
    reconciliationStatisticsData?: any;
    arbitrationStatisticsData?: any;
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

    debugger;

    this.reviewStatisticsData = this.LitigationStatisticsData.find((item: any) => item.litigationRequestStage === "التدقيق");
    this.reconciliationStatisticsData = this.LitigationStatisticsData?.find((item: any) => item.litigationRequestStage === "الصلح");
    this.arbitrationStatisticsData = this.LitigationStatisticsData?.find((item: any) => item.litigationRequestStage === "التحكيم");


    // const data = this.LitigationStatisticsData?.[0];
    // if (!data) return;
  
    // Review Statistics
    const reviewFinishedCount = this.reviewStatisticsData?.finishedCount || 0;
    const reviewNotFinishedCount = this.reviewStatisticsData?.notFinishedCount || 0;
    const reviewDueCount = this.reviewStatisticsData?.totalReviewDueDateCount || 0;
    const reviewRealEstateCount = this.reviewStatisticsData?.realEstateBrokerageCount || 0;
    const reviewPropertiesCount = this.reviewStatisticsData?.propertiesCount || 0;
    const reviewRentCount = this.reviewStatisticsData?.rentCount || 0;
    const reviewWafiCount = this.reviewStatisticsData?.wafiCount || 0;
    const reviewOtherCount = this.reviewStatisticsData?.otherServicesCount || 0;

    // Reconciliation Statistics
    const reconciliationFinishedCount = this.reconciliationStatisticsData?.finishedCount || 0;
    const reconciliationNotFinishedCount = this.reconciliationStatisticsData?.notFinishedCount || 0;
    const reconciliationDueCount = this.reconciliationStatisticsData?.totalReviewDueDateCount || 0;
    const reconciliationRealEstateCount = this.reconciliationStatisticsData?.realEstateBrokerageCount || 0;
    const reconciliationPropertiesCount = this.reconciliationStatisticsData?.propertiesCount || 0;
    const reconciliationRentCount = this.reconciliationStatisticsData?.rentCount || 0;
    const reconciliationWafiCount = this.reconciliationStatisticsData?.wafiCount || 0;
    const reconciliationOtherCount = this.reconciliationStatisticsData?.otherServicesCount || 0;
    
    // Arbitration Statistics
    const arbitrationFinishedCount = this.arbitrationStatisticsData?.finishedCount || 0;
    const arbitrationNotFinishedCount = this.arbitrationStatisticsData?.notFinishedCount || 0;
    const arbitrationDueCount = this.arbitrationStatisticsData?.totalReviewDueDateCount || 0;
    const arbitrationRealEstateCount = this.arbitrationStatisticsData?.realEstateBrokerageCount || 0;
    const arbitrationPropertiesCount = this.arbitrationStatisticsData?.propertiesCount || 0;
    const arbitrationRentCount = this.arbitrationStatisticsData?.rentCount || 0;
    const arbitrationWafiCount = this.arbitrationStatisticsData?.wafiCount || 0;
    const arbitrationOtherCount = this.arbitrationStatisticsData?.otherServicesCount || 0;


    // const finishedCount = data.finishedCount || 0;
    // const notFinishedCount = data.notFinishedCount || 0;
    // const dueCount = data.totalReviewDueDateCount || 0;
    // const realEstateCount = data.realEstateBrokerageCount || 0;
    // const propertiesCount = data.propertiesCount || 0;
    // const rentCount = data.rentCount || 0;
    // const wafiCount = data.wafiCount || 0;
    // const otherCount = data.otherServicesCount || 0;
  
    // Review Total Chart
    this.reviewLabelSumData = {
      labels: [`إجمالى عدد الدعاوى (${this.reviewStatisticsData?.totalLitigationCount})`],
      datasets: [{
        data: [this.reviewStatisticsData?.totalLitigationCount || 0],
        backgroundColor: ['#4CAF50'],
        hoverBackgroundColor: ['#388E3C'],
        borderWidth: 1
      }]
    };
    // Reconciliation Total Chart
    this.reconciliationLabelSumData = {
      labels: [`إجمالى عدد الدعاوى (${this.reconciliationStatisticsData?.totalLitigationCount})`],
      datasets: [{
        data: [this.reconciliationStatisticsData?.totalLitigationCount || 0],
        backgroundColor: ['#4CAF50'],
        hoverBackgroundColor: ['#388E3C'],
        borderWidth: 1
      }]
    };
    // Arbitration Total Chart
    this.arbitrationLabelSumData = {
      labels: [`إجمالى عدد الدعاوى (${this.arbitrationStatisticsData?.totalLitigationCount})`],
      datasets: [{
        data: [this.arbitrationStatisticsData?.totalLitigationCount || 0],
        backgroundColor: ['#4CAF50'],
        hoverBackgroundColor: ['#388E3C'],
        borderWidth: 1
      }]
    };
  
    // Status Pie Chart
    this.reviewStatusPieChartData = {
      labels: [
        `منتهية (${reviewFinishedCount}) - ${this.reviewStatisticsData?.finishedRatio?.toFixed(1) || 0}%`,
        `قيد الدراسة (${reviewNotFinishedCount - reviewDueCount}) - ${this.reviewStatisticsData?.notFinishedRatio?.toFixed(1) || 0}%`,
        `متأخرة (${reviewDueCount}) - ${this.reviewStatisticsData?.totalReviewDueDateRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [reviewFinishedCount, reviewNotFinishedCount - reviewDueCount, reviewDueCount],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#388E3C', '#FFA000', '#D32F2F'],
        borderWidth: 1
      }]
    };
    // Status Pie Chart
    this.reconciliationStatusPieChartData = {
      labels: [
        `منتهية (${reconciliationFinishedCount}) - ${this.reconciliationStatisticsData?.finishedRatio?.toFixed(1) || 0}%`,
        `قيد الدراسة (${reconciliationNotFinishedCount - reconciliationDueCount}) - ${this.reconciliationStatisticsData?.notFinishedRatio?.toFixed(1) || 0}%`,
        `متأخرة (${reconciliationDueCount}) - ${this.reconciliationStatisticsData?.totalReviewDueDateRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [reconciliationFinishedCount, reconciliationNotFinishedCount - reconciliationDueCount, reconciliationDueCount],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#388E3C', '#FFA000', '#D32F2F'],
        borderWidth: 1
      }]
    };
    // Status Pie Chart
    this.arbitrationStatusPieChartData = {
      labels: [
        `منتهية (${arbitrationFinishedCount}) - ${this.arbitrationStatisticsData?.finishedRatio?.toFixed(1) || 0}%`,
        `قيد الدراسة (${arbitrationNotFinishedCount - arbitrationDueCount}) - ${this.arbitrationStatisticsData?.notFinishedRatio?.toFixed(1) || 0}%`,
        `متأخرة (${arbitrationDueCount}) - ${this.arbitrationStatisticsData?.totalReviewDueDateRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [arbitrationFinishedCount, arbitrationNotFinishedCount - arbitrationDueCount, arbitrationDueCount],
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        hoverBackgroundColor: ['#388E3C', '#FFA000', '#D32F2F'],
        borderWidth: 1
      }]
    };
    
  
    // Type Pie Chart
    this.reviewTypePieChartData = {
      labels: [
        `وساطة عقارية (${reviewRealEstateCount}) - ${this.reviewStatisticsData?.realEstateBrokerageRatio?.toFixed(1) || 0}%`,
        `ملاك (${reviewPropertiesCount}) - ${this.reviewStatisticsData?.propertiesRatio?.toFixed(1) || 0}%`,
        `إيجار (${reviewRentCount}) - ${this.reviewStatisticsData?.rentRatio?.toFixed(1) || 0}%`,
        `وافي (${reviewWafiCount}) - ${this.reviewStatisticsData?.wafiRatio?.toFixed(1) || 0}%`,
        `أخرى (${reviewOtherCount}) - ${this.reviewStatisticsData?.otherServicesRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [reviewRealEstateCount, reviewPropertiesCount, reviewRentCount, reviewWafiCount, reviewOtherCount],
        backgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        borderWidth: 1
      }]
    };
    // Type Pie Chart
    this.reconciliationTypePieChartData = {
      labels: [
        `وساطة عقارية (${reconciliationRealEstateCount}) - ${this.reviewStatisticsData?.realEstateBrokerageRatio?.toFixed(1) || 0}%`,
        `ملاك (${reconciliationPropertiesCount}) - ${this.reconciliationStatisticsData?.propertiesRatio?.toFixed(1) || 0}%`,
        `إيجار (${reconciliationRentCount}) - ${this.reconciliationStatisticsData?.rentRatio?.toFixed(1) || 0}%`,
        `وافي (${reconciliationWafiCount}) - ${this.reconciliationStatisticsData?.wafiRatio?.toFixed(1) || 0}%`,
        `أخرى (${reconciliationOtherCount}) - ${this.reconciliationStatisticsData?.otherServicesRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [reconciliationRealEstateCount, reconciliationPropertiesCount, reconciliationRentCount, reconciliationWafiCount, reconciliationOtherCount],
        backgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        borderWidth: 1
      }]
    };
    // Type Pie Chart
    this.arbitrationTypePieChartData = {
      labels: [
        `وساطة عقارية (${arbitrationRealEstateCount}) - ${this.arbitrationStatisticsData?.realEstateBrokerageRatio?.toFixed(1) || 0}%`,
        `ملاك (${arbitrationPropertiesCount}) - ${this.arbitrationStatisticsData?.propertiesRatio?.toFixed(1) || 0}%`,
        `إيجار (${arbitrationRentCount}) - ${this.arbitrationStatisticsData?.rentRatio?.toFixed(1) || 0}%`,
        `وافي (${arbitrationWafiCount}) - ${this.arbitrationStatisticsData?.wafiRatio?.toFixed(1) || 0}%`,
        `أخرى (${arbitrationOtherCount}) - ${this.arbitrationStatisticsData?.otherServicesRatio?.toFixed(1) || 0}%`
      ],
      datasets: [{
        data: [arbitrationRealEstateCount, arbitrationPropertiesCount, arbitrationRentCount, arbitrationWafiCount, arbitrationOtherCount],
        backgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        hoverBackgroundColor: ['#FF6384', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC24A'],
        borderWidth: 1
      }]
    };
  }


  filterDataByDateRange(): void {
    const request: DashbourdRequestDto = {isAdmin: this.isAdmin};
    this._reportsService.getLitigationStatisticsForAdminReport(request).subscribe(
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
        { label: this._translateService.instant(this.translations.layout.sidebar.reports) }
    ])
}
}
