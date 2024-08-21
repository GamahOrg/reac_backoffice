import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForRequestReformerDto, LitigationRequestMircoForRequestSessionDto } from '../../models/litigation-request.model';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitizenService } from '../../services/citizen.service';
import { AssignRequestPayload, CitizenReformer } from '../../models/citizen.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';

@Component({
    selector: 'app-reformer-list',
    templateUrl: './reformer-list.component.html',
    styleUrls: ['./reformer-list.component.scss']
})
export class ReformerListComponent extends BaseComponent implements OnInit {

    // pagintationData = {
    //     currentPage: this.page,
    //     pageSize: 0,
    //     totalCount: 0,
    //     from: 0,
    //     to: 0,
    // }
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
        currentPage: 1,
        // pageCount: 0,
        pageSize: 10,
        totalCount: 0,
    };

    reformerList: Pagination<LitigationRequestMircoForRequestReformerDto[]> = {} as Pagination<LitigationRequestMircoForRequestReformerDto[]>;
    citizenReformers: CitizenReformer[] = [];

    constructor(private litigationRequestService: LitigationRequestService,
        private _paginationService: PaginationService,
        private toastrNotificationService: ToastrNotificationService,
        private _translate: TranslateService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
        private citizenService: CitizenService
    ) {
        super();
    }

    ngOnInit() {
        this.updateBreadcrumb();
        this.GetLitigationRequestForFullAllReformer();
        this.watchPaginationActions();
    }

    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.assignReformers) }
        ])
    };

    private GetLitigationRequestForFullAllReformer(): void {
        this.litigationRequestService.GetLitigationRequestForFullAllReformer(this.pagintationData.currentPage, this.pagintationData.pageSize)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: BaseResponse<Pagination<LitigationRequestMircoForRequestReformerDto[]>>) => {
                if (res.isDone && res.data) {
                    this.updateRequestList(res.data as Pagination<LitigationRequestMircoForRequestReformerDto[]>);
                    this.pageCount = res.data.pageCount;
                }
            })
    }


    //private methods
    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoForRequestReformerDto[]>): void {
        this.reformerList = TypeListView;

        this.setPaginationData(
            this.reformerList.pageSize,
            this.reformerList.totalCount
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
        this.GetLitigationRequestForFullAllReformer();
    }


    assignReformer(currentReformerId: string, requestId: string, content: TemplateRef<any>) {
         
        this.modalService.open(content)
        this.controls.requestId.setValue(requestId)
        this.citizenService.getReformersLookup(currentReformerId, requestId).subscribe(res => {
            if (res.data)
                this.citizenReformers = res.data;
        })
    }

    selectedReformerId!: string;
    assignRequestForm = this._formBuilder.group({
        reformerId: new FormControl<string | null>(null, [Validators.required]),
        requestId: new FormControl<string | null>(null, [Validators.required]),
    })
    get controls() {
        return this.assignRequestForm.controls
    }

    sendReformerRequest(modal: any) {
        this.assignRequestForm.markAllAsTouched()
        if (this.assignRequestForm.valid) {

            this.litigationRequestService.assign(this.assignRequestForm.value as AssignRequestPayload).subscribe(res => {
                if (res.isDone) {
                    this.assignRequestForm.reset();
                    this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                    modal.dismiss()
                } else {
                    this.toastrNotificationService.showError(res.message)
                }
            })
        }

    }
}
