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
import * as XLSX from 'xlsx';
import { Configuration } from '@app/core/configurations/shared.config';

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
  listReformersDashbourds: ListReformersReportResult[] = [];

  listReformersReportForExcel: ListReformersReportResult[] = []; // Add this line

  filterRequest: FilterReformerRequestDto | undefined ;
  filterDashbourdRequest: FilterReformerRequestDto | undefined ;

  filterVisibility: FilterVisibility = {
        employee: false,
        reformers: false,
        reformersStatus: true,
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
        reviewerName: false, 
        reformerName: true, 
        reviewerStatus: false,
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
    experienceYears: null,
    isAdmin: this.isAdmin,
    skip: this.pagintationData.currentPage - 1,
    take: this.pagintationData.pageSize
  }; 
  this.filterDashbourdRequest = {
    reformerName: null,
    reformerStatus: null,
    experienceYears: null,
    isAdmin: this.isAdmin,
    skip: 0,
    take: 100 // Fetch all records for the dashboard
  };

  this.updateBreadcrumb();
  
  this.getReformersForDashbourd(this.filterDashbourdRequest);
  this.getReformersReport(this.filterRequest);
  this.watchPaginationActions();
}

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerassigningrequestforall}` },
      { label: this._translateService.instant(this.translations.layout.sidebar.ReformersReport) }
    ])
  };


      onFilterChange(values: any) {
        
        this.filterDashbourdRequest = {
          reformerName: values.reformerName,
          reformerStatus: values.reformersStatus,
          experienceYears: values.experienceYears,
          isAdmin: this.isAdmin,
          skip: 0,
          take: 100 // Fetch all records for the dashboard
        };
        // You can now use these values to fetch data or perform other actions
        this.filterRequest = {
          reformerName: values.reformerName,
          reformerStatus: values.reformersStatus,
          experienceYears: values.experienceYears,
          isAdmin: this.isAdmin,
          skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
          take: this.pagintationData.pageSize
        };
    
        this.getReformersReport(this.filterRequest);
        this.getReformersForDashbourd(this.filterDashbourdRequest);
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

      getReformersForDashbourd(request: DashbourdRequestDto): void {

    
        this._reportsService.getListOfReformersReport(request).subscribe(
          (response: any) => {
            this.listReformersDashbourds = response.data.results as ListReformersReportResult[];
           
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

        exportToExcel(): void {
          this.filterRequest!.skip = 0;
          this.filterRequest!.take = 1000000;

          this._reportsService.getListOfReformersReport(this.filterRequest!).subscribe(
              (response: any) => {
                  this.listReformersReportForExcel = response.data.results as ListReformersReportResult[];
                  
                  if (this.listReformersReportForExcel.length > 0) {
                      const headers = [
                          this._translateService.instant(this.translations.Reports.reformerName),
                          this._translateService.instant(this.translations.Reports.employeeStatus),
                          this._translateService.instant(this.translations.Reports.totalLitigationCount),
                          this._translateService.instant(this.translations.Reports.notFinishedCount),
                          this._translateService.instant(this.translations.Reports.finishedCount),
                          this._translateService.instant(this.translations.Reports.totalReviewDueDateCount),
                          this._translateService.instant(this.translations.Reports.notFinishedRatio),
                          this._translateService.instant(this.translations.Reports.finishedRatio),
                          this._translateService.instant(this.translations.Reports.totalReviewDueDateRatio)
                      ];

                      const data = this.listReformersReportForExcel.map(item => [
                          item.reformerName,
                          item.reformerStatus,
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
                      XLSX.writeFile(wb, 'تقرير المصلحين.xlsx');
                  } else {
                      console.warn('No data available for export');
                  }
              },
              (error: any) => {
                  console.error('Error exporting data:', error);
              }
          );
        }
}
