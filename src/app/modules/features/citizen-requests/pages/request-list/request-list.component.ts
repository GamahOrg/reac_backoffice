import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CitizenRequestService } from '../../services/citizen-request.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CitizenRequestShortDataDto } from '../../models/citizen-request.model';
import { CitizenRequestType } from '../../models/enums/citizen-request-type.model';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
    selector: 'app-request-list',
    templateUrl: './request-list.component.html',
    styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent extends BaseComponent implements OnInit {
    detailsArbitratorRequest: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/arbitrator/`
    detailsReformerRequest: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/reformer/`

    constructor(
        private _injector: Injector,
        private _paginationService: PaginationService,
        _breadcrumbService: BreadcrumbService,
        _translateService: TranslateService,

        private _citizenRequestService: CitizenRequestService
    ) {
        super();
    }
    page = 1;
    pageSize = 10;
    collectionSize!: number;
    citizenRequestsLists!: CitizenRequestShortDataDto[] | undefined;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
    }

    ngOnInit(): void {
        this.page = this._paginationService.currentPage();
        this.list();
    }

    get citizenRequestType() {
        return CitizenRequestType;
    }
    private list(): void {

        this._citizenRequestService.GetCitizenRequestsForEmployee(this.page, this.pageSize, CitizenRequestType.Arbitrator).subscribe({
            next: (res) => {
                this.citizenRequestsLists = res?.data?.results;
                console.log();

                console.log(this.citizenRequestsLists);

                this.collectionSize = res?.data?.totalCount || 0;
                this.setPaginationData(this.page, this.pageSize, this.collectionSize)
            }
        })
    }


    private setPaginationData(currentPage: number, pageSize: number, totalCount: number): void {
        this.pagintationData.currentPage = currentPage
        this.pagintationData.pageSize = pageSize
        this.pagintationData.totalCount = totalCount
        this._paginationService.updatePaginationData(this.pagintationData);
    }
}
