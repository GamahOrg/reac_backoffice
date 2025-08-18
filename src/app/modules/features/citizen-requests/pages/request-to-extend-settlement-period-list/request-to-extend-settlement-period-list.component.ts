import { Component, OnInit } from '@angular/core';
import { LitigationRequestMircoDto } from '../../models/litigation-request-mirco-dto';
import { pagination, Pagination } from '@app/shared/models/pagination.model';
import { Subscription, takeUntil } from 'rxjs';
import { RequestToExtendSettlementPeriodService } from '../../services/request-to-extend-settlement-period.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Configuration } from '@app/core/configurations/shared.config';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-request-to-extend-settlement-period-list',
    templateUrl: './request-to-extend-settlement-period-list.component.html',
    styleUrl: './request-to-extend-settlement-period-list.component.scss'
})
export class RequestToExtendSettlementPeriodListComponent extends BaseComponent implements OnInit {
    reqList: Pagination<LitigationRequestMircoDto[]> = {} as Pagination<LitigationRequestMircoDto[]>;
    subscriptions: Subscription[] = [];
   
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
      currentPage: 1,
      // pageCount: 0,
      pageSize: 10,
      totalCount: 0,
    };
    detailsRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.requestToExtendSettlementPeriodDetails}`

    constructor(
        private _requestToExtendSettlementPeriodService: RequestToExtendSettlementPeriodService,
        private _paginationService: PaginationService,
        private router: Router,
        private _translate: TranslateService,
        private _breadcrumbService: BreadcrumbService
    ) { super(); }

    ngOnInit(): void {
         
        this.getLitigationRequestExtendPeriodForEmployee();
        this.updateBreadcrumb();
        this.watchPaginationActions();
    }
    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translate.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translate.instant(this.translations.layout.sidebar.requestToExtendSettlementPeriod), link: Configuration.pages.citizenRequests.requestToExtendSettlementPeriodList },
        ])
    };

    getLitigationRequestExtendPeriodForEmployee(): void {
         
        this.subscriptions.push(
            this._requestToExtendSettlementPeriodService.getLitigationRequestExtendPeriodForEmployee(this.pagintationData.currentPage, this.pagintationData.pageSize)
                .subscribe((res: Pagination<LitigationRequestMircoDto[]> | null) => {
                    if (res && res.results.length > 0)
                        this.updateRequestList(res as Pagination<LitigationRequestMircoDto[]>)
                })

        )
    }
    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoDto[]>): void {
        this.reqList = TypeListView;
        this.setPaginationData(
            this.reqList.pageSize,
            this.reqList.totalCount,
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
            
            this.newPageNo = pageNo;
            this.loadNextPage(this.newPageNo);
    
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
        this.getLitigationRequestExtendPeriodForEmployee()
      }
    goToDetailsPage(requestId: string) {
        this.router.navigate([this.detailsRequestUrl, requestId]);
    }

    lawsuitFullDetailsURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitFullDetails
    public navigateToEditOrDetails(lawsuitId: string | undefined)
    {
            this.router.navigate([this.lawsuitFullDetailsURL, lawsuitId]);
    }
}
