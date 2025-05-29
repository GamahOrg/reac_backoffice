import { Component, inject, OnInit } from '@angular/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { pagination } from '@app/shared/models/pagination.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DashbourdRequestDto } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { ListAdminReportModel } from '../../models/ListAdminReportModel';

@Component({
  selector: 'app-list-admin-report',
  templateUrl: './list-admin-report.component.html',
  styleUrl: './list-admin-report.component.scss'
})
export class ListAdminReportComponent extends BaseComponent implements OnInit  {

    private _paginationService = inject(PaginationService);
    private _breadcrumbService = inject(BreadcrumbService);
    private _translateService = inject(TranslateService);
  
  newPageNo: number = 1;
  pageCount: number = 0;
   pagintationData: pagination = {
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
    };

  isAdmin: boolean=false;

  listAdminReport: ListAdminReportModel[] = [];

  filterRequest: DashbourdRequestDto | undefined ;

  filterVisibility: FilterVisibility = {
    employee: true,
    reformers: true,
    arbitrators: true,
    requestCode: true,
    fromDate: true,
    toDate: true,
    areaIds: true,
    citiesIds: true,
    litigationRequestCategoryIds: true,
    litigationRequestStatusIds: true,
    litigationRequestAmountId: true,
    litigationRequestStageIds: false,
    reviewerName: false,
    reviewerStatus: false
  };
    
/**
 *
 */
constructor(
  private _reportsService: ReportsService,
  private _storageService :StorageService
) {
  super();

  this.isAdmin = this._storageService.getUserType()=='true' ? true : false;
  
}

ngOnInit(): void {

  this.filterRequest = {
    fromDate: null,
    toDate: null,
    areaIds: [],
    citiesIds: [],
    litigationRequestCategoryIds: [],
    isAdmin: this.isAdmin,
    litigationRequestAmountId: null,
    skip: this.pagintationData.currentPage - 1,
    take: this.pagintationData.pageSize
  }; 

  this.updateBreadcrumb();
  
  this.getListOfLitigationAdminReport(this.filterRequest);
  this.watchPaginationActions();
}

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorCount), link: Configuration.pages.arbitration.arbitratorCountList }
    ])
  };


      onFilterChange(values: any) {
        debugger;
        // You can now use these values to fetch data or perform other actions
        this.filterRequest = {
          fromDate: values.fromDate != null && values.fromDate !== "" ?new Date(values.fromDate).toISOString().split('T')[0]:null,
          toDate:values.toDate != null && values.toDate !== "" ?new Date(values.toDate).toISOString().split('T')[0]:null,
          areaIds: values.areaIds,
          citiesIds: values.citiesIds,
          litigationRequestCategoryIds:values.litigationRequestCategoryIds,
          litigationRequestStatusIds: values.litigationRequestStatusIds,
          requestCode: values.requestCode != null && values.requestCode !== "" ? values.requestCode : null,
          isAdmin: this.isAdmin,
          litigationRequestAmountId: values.litigationRequestAmountId,
          arbitratorsIds: values.arbitratorsIds,
          reformersIds: values.reformersIds,
          employeeIds: values.employeeIds,
          skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
          take: this.pagintationData.pageSize
        };
    
        this.getListOfLitigationAdminReport(this.filterRequest);
      }

      getListOfLitigationAdminReport(request: DashbourdRequestDto): void {
        this._reportsService.getListOfLitigationForAdminReport(request).subscribe(
          (response: any) => {
            this.listAdminReport = response.data.results as ListAdminReportModel[];
            this.pageCount = response.data.pageCount;

            this.setPaginationData(
              response.data.pageSize,
              response.data.totalCount
            );
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
              debugger;
              this.loadNextPage(pageNo);
              this.newPageNo = pageNo;
            })
        }
      
        private watchPaginationClicked(): void {
          this._paginationService.pageClicked
            .pipe(takeUntil(this.destroy$))
            .subscribe((nextPage: number) => {
              debugger;
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

}
