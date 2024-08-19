import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { LitigationRequestMircoForRequestSessionDto } from '@app/modules/features/citizen-requests/models/litigation-request.model';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArbitrationService } from '../../services/arbitration.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-arbitration-session-list',
    templateUrl: './arbitration-session-list.component.html',
    styleUrls: ['./arbitration-session-list.component.scss']
})
export class ArbitrationSessionListComponent extends BaseComponent implements OnInit {

    page = 1;
    pageSize = 10;
    collectionSize!: number;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
    }

    sessionsList: LitigationRequestMircoForRequestSessionDto[] | undefined = [];

    constructor(private arbitrationService: ArbitrationService,
        private _paginationService: PaginationService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
    ) {
        super();
    }

    ngOnInit() {
        this.setBreadcrumb()
        this.observePageChange()
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.sessionList) }
        ])
    }

    private list(pageIndex: number, pageSize: number): void {
        this.arbitrationService.GetLitigationRequestForFullAllSession(pageIndex, pageSize).subscribe({
            next: (res) => {
                console.log(res);

                this.sessionsList = res?.data?.results;

                this.collectionSize = res?.data?.totalCount || 0;
                this.setPaginationData(this.page, this.pageSize, this.collectionSize)
            }
        })
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


    openSession(content: TemplateRef<any>, url: string | null) {
        this.selectedUrl = url;
        this.modalService.open(content)
    }

    selectedUrl: string | null = ''
    startSession(modal: any) {
        modal.dismiss()
        if (this.selectedUrl)
            window.open(this.selectedUrl, '_blank')
    }



}
