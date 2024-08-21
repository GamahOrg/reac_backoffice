import { Component, effect, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForArbitratorsSelectionDurationDto } from '../../models/litigation-request-mirco-for-arbitrators-selection-duration-dto';
import { Subscription } from 'rxjs';
import { DeterminearbitratorperiodService } from '../../services/determinearbitratorperiod.service';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { LitigationRequestMircoDto } from '../../models/litigation-request-mirco-dto';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-assign-arbitration-head-list',
    templateUrl: './assign-arbitration-head-list.component.html',
    styleUrls: ['./assign-arbitration-head-list.component.scss']
})
export class AssignArbitrationHeadListComponent extends BaseComponent implements OnInit {
    reqList?: LitigationRequestMircoDto[]
    subscriptions: Subscription[] = [];
    page = 1;
    pageSize = 10;
    collectionSize!: number;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
    }
    detailsRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.assignArbitrationHeadDetails}`

    constructor(
        private _determinearbitratorperiodService: DeterminearbitratorperiodService,
        private router: Router,
        private _paginationService: PaginationService,
        private _injector: Injector,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
    ) { super(); }

    ngOnInit(): void {
         
        this.setBreadcrumb()
        this.observePageChange();
    }

    // getLitigationRequestExtendPeriodForEmployee(): void {
    
    //   this.subscriptions.push(
    //     this._determinearbitratorperiodService.getLitigationRequestForArbitratorSelectionDuration()
    //       .subscribe((res: LitigationRequestMircoForArbitratorsSelectionDurationDto[] | null) => {
    //         this.reqList = res as LitigationRequestMircoForArbitratorsSelectionDurationDto[]
    //       })

    //   )
    // }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.assignArbitrationHeadList) }
        ])
    }

    goToDetailsPage(requestId: string) {
        this.router.navigate([this.detailsRequestUrl, requestId]);
    }

    private list(pageIndex: number, pageSize: number): void {

        this.subscriptions.push(
            this._determinearbitratorperiodService.GetLitigationRequestForAddArbitratorsChairmanNominationList(pageIndex, pageSize)
                .subscribe(res => {
                    this.reqList = res.results as LitigationRequestMircoDto[]
                    this.collectionSize = res?.totalCount || 0;
                    this.setPaginationData(this.page, this.pageSize, this.collectionSize)
                })

        )
    }

    private observePageChange(): void {
        effect(() => {
            this.page = this._paginationService.currentPage();
            this.list(this.page, this.pageSize)
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }

    private setPaginationData(currentPage: number, pageSize: number, totalCount: number): void {
        this.pagintationData.currentPage = currentPage
        this.pagintationData.pageSize = pageSize
        this.pagintationData.totalCount = totalCount
        this._paginationService.updatePaginationData(this.pagintationData);
    }



}
