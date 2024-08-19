import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Pagination } from '@app/shared/models/pagination.model';
import { LitigationRequestMircoDto } from '../../models/litigation-request-mirco-dto';
import { Router } from '@angular/router';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { RequestToExtendArbitrationPeridService } from '../../services/request-to-extend-arbitration-perid.service';
import { Subscription } from 'rxjs';
import { Configuration } from '@app/core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-request-to-extend-arbitration-period-list',
    templateUrl: './request-to-extend-arbitration-period-list.component.html',
    styleUrl: './request-to-extend-arbitration-period-list.component.scss'
})
export class RequestToExtendArbitrationPeriodListComponent extends BaseComponent implements OnInit {
    reqList: Pagination<LitigationRequestMircoDto[]> = {} as Pagination<LitigationRequestMircoDto[]>;
    subscriptions: Subscription[] = [];
    newPageNo: number = 1;
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }
    detailsRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodDetails}`

    constructor(
        private _requestToExtendArbitrationPeridService: RequestToExtendArbitrationPeridService,
        private _paginationService: PaginationService,
        private router: Router,
        private _translate: TranslateService,
        private _breadcrumbService: BreadcrumbService
    ) { super(); }
    ngOnInit(): void {
        debugger;
        this.getLitigationRequestExtendPeriodForEmployee();
        this.updateBreadcrumb();
    }
    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translate.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translate.instant(this.translations.layout.sidebar.requestToExtendArbitrationPeriodList), link: Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodList },
        ])
    };
    getLitigationRequestExtendPeriodForEmployee(): void {
        debugger;
        this.subscriptions.push(
            this._requestToExtendArbitrationPeridService.getLitigationRequestExtendPeriodForEmployee(this.pagintationData.currentPage, this.pagintationData.pageSize)
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
    goToDetailsPage(requestId: string) {
        this.router.navigate([this.detailsRequestUrl, requestId]);
    }
}
