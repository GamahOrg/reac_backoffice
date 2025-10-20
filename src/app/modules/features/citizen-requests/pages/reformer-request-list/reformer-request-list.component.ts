import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CitizenRequestService } from '../../services/citizen-request.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { CitizenRequestShortDataDto } from '../../models/citizen-request.model';
import { CitizenRequestType } from '../../models/enums/citizen-request-type.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { takeUntil } from 'rxjs';
@Component({
    selector: 'app-reformer-request-list',
    templateUrl: './reformer-request-list.component.html',
    styleUrls: ['./reformer-request-list.component.scss']
})
export class ReformerRequestListComponent extends BaseComponent implements OnInit {

    // detailsArbitratorRequest: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/arbitrator/`
    detailsReformerRequest: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/reformer/`
    ascending:boolean=true;
    constructor(
        private _paginationService: PaginationService,
        private _breadcrumbService: BreadcrumbService,
        public _translateService: TranslateService,
        private _citizenRequestService: CitizenRequestService
    ) {
        super();
    }

    collectionSize!: number;
    citizenRequestsLists: Pagination<CitizenRequestShortDataDto[]> | undefined  = {} as Pagination<CitizenRequestShortDataDto[]>;
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
      currentPage: 1,
      // pageCount: 0,
      pageSize: 10,
      totalCount: 0,
    };

    ngOnInit(): void {
        // this.observePageChange();
        this.setBreadcrumb()
        this.list();
        this.watchPaginationActions();
    }

    get citizenRequestType() {
        return CitizenRequestType;
    }
    private list(): void {

        this._citizenRequestService.GetCitizenRequestsForEmployee(this.pagintationData.currentPage, this.pagintationData.pageSize, CitizenRequestType.Reformer,this.ascending).subscribe({
            next: (res) => {
                this.citizenRequestsLists = res?.data;
                console.log();

                console.log(this.citizenRequestsLists);

                this.collectionSize = res?.data?.totalCount || 0;
                this.setPaginationData(res.data!.pageSize,res.data!.totalCount)
            }
        })
    }

    // private observePageChange(): void {
    //     effect(() => {
    //         this.page = this._paginationService.currentPage();
    //         this.list(this.page, this.pageSize)
    //     }, {
    //         injector: this._injector,
    //         allowSignalWrites: true
    //     });
    // }

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
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerassigningrequestforall}` },
            { label: this._translateService.instant(this.translations.layout.sidebar.reformerRequestList) }
        ])
    }
    
    orderList(event:any){
      var ascendingValue= event.target.value;
    if(ascendingValue == "true"){
      this.ascending=true;
      this.list();
    }
    else{
      this.ascending=false;
      this.list();
    }
  }
}
