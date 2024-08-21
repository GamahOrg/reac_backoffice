import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForArbitratorsSelectionDurationDto } from '../../models/litigation-request-mirco-for-arbitrators-selection-duration-dto';
import { Subscription, takeUntil } from 'rxjs';
import { DeterminearbitratorperiodService } from '../../services/determinearbitratorperiod.service';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';

@Component({
    selector: 'app-litigation-request-for-arbitrator-selection-duration-list',
    templateUrl: './litigation-request-for-arbitrator-selection-duration-list.component.html',
    styleUrl: './litigation-request-for-arbitrator-selection-duration-list.component.scss'
})
export class LitigationRequestForArbitratorSelectionDurationListComponent extends BaseComponent implements OnInit {
    reqList?: Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>
    subscriptions: Subscription[] = [];

    detailsRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.litigationRequestForArbitratorSelectionDurationDetails}`
    private _paginationService = inject(PaginationService);

    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
        currentPage: 1,
        // pageCount: 0,
        pageSize: 10,
        totalCount: 0,
    };
    constructor(
        private _determinearbitratorperiodService: DeterminearbitratorperiodService,
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
            { label: this._translate.instant(this.translations.layout.sidebar.litigationRequestForArbitratorSelectionDurationList), link: Configuration.pages.citizenRequests.litigationRequestForArbitratorSelectionDurationList },
        ])
    };
    // getLitigationRequestExtendPeriodForEmployee(): void {
    
    //   this.subscriptions.push(
    //     this._determinearbitratorperiodService.getLitigationRequestForArbitratorSelectionDuration()
    //       .subscribe((res: LitigationRequestMircoForArbitratorsSelectionDurationDto[] |null) => {
    //        this.reqList=res as LitigationRequestMircoForArbitratorsSelectionDurationDto[]
    //     private router: Router
    //   ) { super(); }
    // ngOnInit(): void {
    //   this.getLitigationRequestExtendPeriodForEmployee();
    //   this.watchPaginationActions();
    // }

    getLitigationRequestExtendPeriodForEmployee(): void {
         
        this.subscriptions.push(
            this._determinearbitratorperiodService.getLitigationRequestForArbitratorSelectionDuration(this.pagintationData.currentPage, this.pagintationData.pageSize)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res: Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]> | null) => {
                    if (res) {
                        //  this.reqList=res as LitigationRequestMircoForArbitratorsSelectionDurationDto[]
                        this.updateRequestList(res as Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>);
                        this.pageCount = res.pageCount;
                    }
                })

        )
    }

    //private methods
    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoForArbitratorsSelectionDurationDto[]>): void {
        this.reqList = TypeListView
        this.setPaginationData(
            this.reqList.pageSize,
            this.reqList.totalCount
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
}
