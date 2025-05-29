import { Component, inject, OnInit } from '@angular/core';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { DashbourdRequestDto, FilterRequestDto } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { FilterReformerRequestDto, ListReformersReportResult } from '@app/modules/reports/models/Reformers-Report/reformers-report';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { pagination } from '@app/shared/models/pagination.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-reformers-report',
  templateUrl: './reformers-report.component.html',
  styleUrl: './reformers-report.component.scss'
})
export class ReformersReportComponent  extends BaseComponent implements OnInit{
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

  listReformersReport: ListReformersReportResult[] = [];

  filterRequest: FilterReformerRequestDto | undefined ;

  filterVisibility: FilterVisibility = {
        employee: false,
        reformers: false,
        arbitrators: false,
        requestCode: false,
        fromDate: false,
        toDate: false,
        areaIds: false,
        citiesIds: false,
        litigationRequestCategoryIds: false,
        litigationRequestStatusIds: false,
        litigationRequestAmountId: false,
    litigationRequestStageIds: false,
        reviewerName: true, 
        reviewerStatus: true,
        experienceYears: true
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
  // this.filterVisibility.employee = this.isAdmin;
  
}

ngOnInit(): void {

  this.filterRequest = {
    reformerName: null,
    reformerStatus: null,
    isAdmin: this.isAdmin,
    skip: this.pagintationData.currentPage - 1,
    take: this.pagintationData.pageSize
  }; 

  this.updateBreadcrumb();
  
  this.getReformersReport(this.filterRequest);
  this.watchPaginationActions();
}

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.ReformersReport) }
    ])
  };


      onFilterChange(values: any) {
        debugger;
        // You can now use these values to fetch data or perform other actions
        this.filterRequest = {
          reformerName: values.reviewerName,
          reformerStatus: values.reviewerStatus,
          isAdmin: this.isAdmin,
          skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
          take: this.pagintationData.pageSize
        };
    
        this.getReformersReport(this.filterRequest);
      }

      getReformersReport(request: DashbourdRequestDto): void {
        this._reportsService.getListOfReformersReport(request).subscribe(
          (response: any) => {
            this.listReformersReport = response.data.results as ListReformersReportResult[];
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
