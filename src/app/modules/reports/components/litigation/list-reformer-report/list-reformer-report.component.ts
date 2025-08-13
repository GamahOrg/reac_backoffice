import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Configuration } from '@app/core/configurations/shared.config';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { ListReformerReportModel } from '@app/modules/reports/models/list-reformer-report/list-reformer-report.model';
import { DashbourdRequestDto } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';
import { pagination } from '@app/shared/models/pagination.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-list-reformer-report',
  templateUrl: './list-reformer-report.component.html',
  styleUrl: './list-reformer-report.component.scss'
})
export class ListReformerReportComponent extends BaseComponent implements OnInit  {

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

  listReformerReport: ListReformerReportModel[] = [];

  listReformerReportForExcel: ListReformerReportModel[] = []; // Add this line

  filterRequest: DashbourdRequestDto | undefined ;

  filterVisibility: FilterVisibility = {
    employee: false,
    reformers: this.isAdmin,
    arbitrators: false,
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
  this.filterVisibility.reformers = this.isAdmin;
  
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
  
  this.getListOfLitigationReformerReport(this.filterRequest);
  this.watchPaginationActions();
}

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorCount), link: Configuration.pages.arbitration.arbitratorCountList }
    ])
  };


      onFilterChange(values: any) {
        
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
          reformersIds: this.isAdmin ? values.reformersIds : null,
          skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
          take: this.pagintationData.pageSize
        };
    
        this.getListOfLitigationReformerReport(this.filterRequest);
      }

      getListOfLitigationReformerReport(request: DashbourdRequestDto): void {
        this._reportsService.getListOfLitigationReformerReport(request).subscribe(
          (response: any) => {
            this.listReformerReport = response.data.results as ListReformerReportModel[];
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

          this._reportsService.getListOfLitigationReformerReport(this.filterRequest!).subscribe(
              (response: any) => {
                  this.listReformerReportForExcel = response.data.results as ListReformerReportModel[];
                  
                  if (this.listReformerReportForExcel.length > 0) {
                      // Prepare headers
                      const headers = [
                          this._translateService.instant(this.translations.Reports.requestCode),
                          this._translateService.instant(this.translations.Reports.createdOn),
                          this._translateService.instant(this.translations.Reports.areaName),
                          this._translateService.instant(this.translations.Reports.cityName),
                          this._translateService.instant(this.translations.Reports.categoryName),
                          this._translateService.instant(this.translations.Reports.firstParty),
                          this._translateService.instant(this.translations.Reports.secondParty),
                          this._translateService.instant(this.translations.Reports.reformerName),
                          this._translateService.instant(this.translations.Reports.requestStatus),
                          this._translateService.instant(this.translations.Reports.litigationAmount),
                          this._translateService.instant(this.translations.Reports.contractAddress)
                      ];

                      // Prepare data rows
                      const data = this.listReformerReportForExcel.map(item => [
                          item.requestCode,
                          item.createdOn ? new Date(item.createdOn).toLocaleDateString() : '',
                          item.areaName,
                          item.cityName,
                          item.categoryName,
                          item.firstParty,
                          item.secondParty,
                          item.reformerName,
                          item.requestStatus,
                          item.litigationAmount,
                          item.contractAddress
                      ]);

                      // Create worksheet
                      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

                      // Set column widths
                      const colWidths = headers.map(() => ({ width: 20 }));
                      ws['!cols'] = colWidths;

                      // Create workbook and add worksheet
                      const wb: XLSX.WorkBook = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

                      // Save file
                      XLSX.writeFile(wb, 'تقرير قائمة الدعاوى في مرحلة الصلح.xlsx');
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
