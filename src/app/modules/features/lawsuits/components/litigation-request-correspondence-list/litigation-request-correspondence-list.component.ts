import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LitigationRequestReformerAssigningRequestStatus } from '@app/modules/features/arbitration/models/enums/litigation-request-reformer-assigning-request-status';
import { LitigationRequestMircoDtoReformer } from '@app/modules/features/citizen-requests/models/litigation-request-mirco-dto-reformer';
import { RequestToExtendSettlementPeriodService } from '@app/modules/features/citizen-requests/services/request-to-extend-settlement-period.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Pagination } from '@app/shared/models/pagination.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, takeUntil } from 'rxjs';
import { LitigationRequestCorrespondencesService } from '../../services/litigation-request-correspondence/litigation-request-correspondence-service';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
  selector: 'app-litigation-request-correspondence-list',
  templateUrl: './litigation-request-correspondence-list.component.html',
  styleUrl: './litigation-request-correspondence-list.component.scss'
})
export class LitigationRequestCorrespondenceListComponent extends BaseComponent implements OnInit {
    detailsRequestUrl: string = `/${Configuration.modules.lawsuits}/${Configuration.pages.litigation.litigationRequestCorrespondencesDetails}`

  reqList: Pagination<LitigationRequestMircoDtoReformer[]> = {} as Pagination<LitigationRequestMircoDtoReformer[]>;
    subscriptions: Subscription[] = [];
    localization = {
        ///<summary>لم يتم الرد</summary>
        [LitigationRequestReformerAssigningRequestStatus.None]: this.translations.TasksRequestsList.None,
        ///<summary>تمت الموافقة</summary>
        [LitigationRequestReformerAssigningRequestStatus.Approve]: this.translations.TasksRequestsList.Approve,
        ///<summary>تم الرفض</summary>
        [LitigationRequestReformerAssigningRequestStatus.Reject]: this.translations.TasksRequestsList.Reject,
        ///<summary>تم الإلغاء</summary>
        [LitigationRequestReformerAssigningRequestStatus.Cancelled]: this.translations.TasksRequestsList.Cancelled,
    }
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }
    constructor(
        private _paginationService: PaginationService,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
        private _litigationRequestCorrespondencesService : LitigationRequestCorrespondencesService,
        private router: Router
    ) { super(); }

    ngOnInit(): void {
        this.setBreadcrumb()
        this.GetLitigationRequestReformerAssigningRequests();
        this.watchPaginationActions();
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home),  link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
            { label: this._translateService.instant(this.translations.layout.sidebar.litigationRequestCorrespondences) }
        ])
    }

    GetLitigationRequestReformerAssigningRequests(): void {

        this.subscriptions.push(
            this._litigationRequestCorrespondencesService.GetLitigationRequestLitigationCorrespondence(this.pagintationData.currentPage, this.pagintationData.pageSize)
                .subscribe((res: Pagination<LitigationRequestMircoDtoReformer[]> | null) => {
                    if (res && res.results.length > 0)
                        this.updateRequestList(res as Pagination<LitigationRequestMircoDtoReformer[]>)
                })

        )
    }
    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoDtoReformer[]>): void {
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
        this.GetLitigationRequestReformerAssigningRequests()
      }

    goToDetailsPage(requestId: string) {
        ;
       this.router.navigate([this.detailsRequestUrl, requestId]);
   }

   lawsuitFullDetailsURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitFullDetails
   public navigateToEditOrDetails(lawsuitId: string | undefined)
   {
           this.router.navigate([this.lawsuitFullDetailsURL, lawsuitId]);
   }


}
