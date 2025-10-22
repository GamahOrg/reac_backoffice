import { Component, effect, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CitizenRequestService } from '../../services/citizen-request.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { CitizenRequestShortDataDto } from '../../models/citizen-request.model';
import { CitizenRequestType } from '../../models/enums/citizen-request-type.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { Subscription, takeUntil } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination.model';

@Component({
    selector: 'app-arbitrator-request-list',
    templateUrl: './arbitrator-request-list.component.html',
    styleUrls: ['./arbitrator-request-list.component.scss']
})
export class ArbitratorRequestListComponent extends BaseComponent implements OnInit {

    detailsArbitratorRequest: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/arbitrator/`
    // detailsReformerRequest:string=`/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/reformer/`

    constructor(
        private _injector: Injector,
        private _paginationService: PaginationService,
        private _breadcrumbService: BreadcrumbService,
        public _translateService: TranslateService,
        private _citizenRequestService: CitizenRequestService
    ) {
        super();
    }
    citizenRequestsLists!: CitizenRequestShortDataDto[] | undefined;
        subscriptions: Subscription[] = [];
        reqList: Pagination<CitizenRequestShortDataDto[]> = {} as Pagination<CitizenRequestShortDataDto[]>;
    
     page = 1;
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }
    ngOnInit(): void {
        // this.observePageChange();
        this.observePageChange();
        this.setBreadcrumb();
        // this.list();
        this.watchPaginationActions();

    }

    get citizenRequestType() {
        return CitizenRequestType;
    }
    private list(): void {
        this.subscriptions.push(
        this._citizenRequestService.GetCitizenRequestsForEmployee(this.pagintationData.currentPage, this.pagintationData.pageSize, CitizenRequestType.Arbitrator,false)
        .subscribe((response) => {
            const res = response?.data;
            if (res && res.results.length > 0) {
                this.updateRequestList(res);
            }
        })
        )
    }

     private updateRequestList(TypeListView: Pagination<CitizenRequestShortDataDto[]>): void {
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
              this.list()
            }


    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}` },
            { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorRequestList) }
        ])
    }

     private observePageChange(): void {
            effect(() => {
                this.pagintationData.currentPage = this._paginationService.currentPage();
                this.list();
            }, {
                injector: this._injector,
                allowSignalWrites: true
            });
        }
}
