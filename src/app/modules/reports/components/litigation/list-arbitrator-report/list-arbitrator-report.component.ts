import { Component, inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Configuration } from '@app/core/configurations/shared.config';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { pagination } from '@app/shared/models/pagination.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ListArbitratorReportModel } from '../../../models/list-arbitrator-report/list-arbitrator-report.model';
import { DashbourdRequestDto } from '@app/modules/reports/models/litigation-dashbourd-review/DashbourdRequestDto';
import { ReportsService } from '@app/modules/reports/services/reports-service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FilterVisibility } from '@app/shared/components/filter/components/filter/filter.component';

@Component({
  selector: 'app-list-arbitrator-report',
  templateUrl: './list-arbitrator-report.component.html',
  styleUrl: './list-arbitrator-report.component.scss'
})
export class ListArbitratorReportComponent extends BaseComponent implements OnInit  {

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

  listArbitratorReport: ListArbitratorReportModel[] = [];

  listArbitratorReportForExcel: ListArbitratorReportModel[] = []; // Add this line

  filterRequest: DashbourdRequestDto | undefined ;

  filterVisibility: FilterVisibility = {
    employee: false,
    reformers: false,
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
  
  this.getListOfLitigationArbitratorReport(this.filterRequest);
  this.watchPaginationActions();
}

  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}` },
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
          arbitratorsIds: this.isAdmin ? values.arbitratorsIds : null,
          skip: (this.pagintationData.currentPage - 1) * this.pagintationData.pageSize,
          take: this.pagintationData.pageSize
        };
    
        this.getListOfLitigationArbitratorReport(this.filterRequest);
      }

      getListOfLitigationArbitratorReport(request: DashbourdRequestDto): void {
        this._reportsService.getListOfLitigationArbitrationReport(request).subscribe(
          (response: any) => {
            this.listArbitratorReport = response.data.results as ListArbitratorReportModel[];
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

          this._reportsService.getListOfLitigationArbitrationReport(this.filterRequest!).subscribe(
              (response: any) => {
                  this.listArbitratorReportForExcel = response.data.results as ListArbitratorReportModel[];
                  
                  if (this.listArbitratorReportForExcel.length > 0) {
                      // Prepare headers
                      const headers = [
                          this._translateService.instant(this.translations.Reports.requestCode),
                          this._translateService.instant(this.translations.Reports.createdOn),
                          this._translateService.instant(this.translations.Reports.areaName),
                          this._translateService.instant(this.translations.Reports.cityName),
                          this._translateService.instant(this.translations.Reports.categoryName),
                          this._translateService.instant(this.translations.Reports.firstParty),
                          this._translateService.instant(this.translations.Reports.secondParty),
                          this._translateService.instant(this.translations.Reports.arbitratorChairmanName),
                          this._translateService.instant(this.translations.Reports.arbitratorName),
                          this._translateService.instant(this.translations.Reports.requestStatus),
                          this._translateService.instant(this.translations.Reports.litigationAmount),
                          this._translateService.instant(this.translations.Reports.contractAddress)
                      ];

                      // Prepare data rows
                      const data = this.listArbitratorReportForExcel.map(item => [
                          item.requestCode,
                          item.createdOn ? new Date(item.createdOn).toLocaleDateString() : '',
                          item.areaName,
                          item.cityName,
                          item.categoryName,
                          item.firstParty,
                          item.secondParty,
                          item.arbitratorChairmanName,
                          item.arbitratorsFullNames,
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
                      XLSX.writeFile(wb, 'تقرير قائمة الدعاوى في مرحلة التحكيم.xlsx');
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
