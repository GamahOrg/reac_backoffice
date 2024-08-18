import { Component, OnInit } from '@angular/core';
import { LitigationRequestMircoDtoReformer } from '../../models/litigation-request-mirco-dto-reformer';
import { Pagination } from '@app/shared/models/pagination.model';
import { Subscription } from 'rxjs';
import { RequestToExtendSettlementPeriodService } from '../../services/request-to-extend-settlement-period.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Router } from '@angular/router';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-reformer-assigning-request-for-all',
    templateUrl: './reformer-assigning-request-for-all.component.html',
    styleUrl: './reformer-assigning-request-for-all.component.scss'
})
export class ReformerAssigningRequestForAllComponent extends BaseComponent implements OnInit {
    reqList: Pagination<LitigationRequestMircoDtoReformer[]> = {} as Pagination<LitigationRequestMircoDtoReformer[]>;
    subscriptions: Subscription[] = [];
    newPageNo: number = 1;
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }
    constructor(
        private _requestToExtendSettlementPeriodService: RequestToExtendSettlementPeriodService,
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
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorRequestTaskList) }
        ])
    }

    GetLitigationRequestReformerAssigningRequests(): void {

        this.subscriptions.push(
            this._requestToExtendSettlementPeriodService.GetLitigationRequestReformerAssigningRequestsAll(this.pagintationData.currentPage, this.pagintationData.pageSize)
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

}
