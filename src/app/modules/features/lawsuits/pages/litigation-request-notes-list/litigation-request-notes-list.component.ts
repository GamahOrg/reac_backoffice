import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestReformerAssigningRequestStatus } from '@app/modules/features/arbitration/models/enums/litigation-request-reformer-assigning-request-status';
import { LitigationRequestMircoDtoReformer } from '@app/modules/features/citizen-requests/models/litigation-request-mirco-dto-reformer';
import { RequestToExtendSettlementPeriodService } from '@app/modules/features/citizen-requests/services/request-to-extend-settlement-period.service';
import { Pagination } from '@app/shared/models/pagination.model';
import { Subscription } from 'rxjs';
import { LitigationRequestNotesService } from '../../services/litigation-request-notes/litigation-request-notes.service';
import { BaseResponse } from '@app/core/models/base-response';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
  selector: 'app-litigation-request-notes-list',
  templateUrl: './litigation-request-notes-list.component.html',
  styleUrl: './litigation-request-notes-list.component.scss'
})
export class LitigationRequestNotesListComponent extends BaseComponent implements OnInit {
    detailsRequestUrl: string = `/${Configuration.modules.lawsuits}/${Configuration.pages.litigation.litigationRequestNotesDetails}`

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
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }
    constructor(
        private _litigationRequestNotes: LitigationRequestNotesService,
        private _paginationService: PaginationService,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,

        private router: Router
    ) { super(); }

    ngOnInit(): void {
        this.setBreadcrumb()
        this.GetLitigationRequestReformerAssigningRequests();
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home),  link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
            { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorRequestTaskList) }
        ])
    }

    GetLitigationRequestReformerAssigningRequests(): void {

        this.subscriptions.push(
            this._litigationRequestNotes.GetLitigationRequestNotes(this.pagintationData.currentPage, this.pagintationData.pageSize,1)
                .subscribe((res: BaseResponse<Pagination<LitigationRequestMircoDtoReformer[]>> | null) => {
                    
                    if (res?.data?.results && res?.data?.results?.length > 0)
                        this.updateRequestList(res.data)
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
    
    goToDetailsPage(requestId: string) {

        this.router.navigate([this.detailsRequestUrl, requestId]);
    }
}
