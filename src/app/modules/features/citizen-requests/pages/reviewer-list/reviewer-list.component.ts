import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignRequestPayload } from '../../models/citizen.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Pagination, pagination } from '@app/shared/models/pagination.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { AssignEmployeePayload, EmployeeReviewer, LitigationRequestMircoForRequestReviewerDto } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-reviewer-list',
    templateUrl: './reviewer-list.component.html',
    styleUrls: ['./reviewer-list.component.scss']
})
export class ReviewerListComponent extends BaseComponent implements OnInit {

    
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData: pagination = {
        currentPage: 1,
        // pageCount: 0,
        pageSize: 10,
        totalCount: 0,
    };

    reviewerList: Pagination<LitigationRequestMircoForRequestReviewerDto[]> = {} as Pagination<LitigationRequestMircoForRequestReviewerDto[]>;
    employeeReviewer: EmployeeReviewer[] = [];

    constructor(private litigationRequestService: LitigationRequestService,
        private _paginationService: PaginationService,
        private toastrNotificationService: ToastrNotificationService,
        private _translate: TranslateService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
        private employeeService: EmployeeService
    ) {
        super();
    }

    ngOnInit() {
        this.updateBreadcrumb();
        this.GetLitigationRequestForFullAllReviewer();
        this.watchPaginationActions();
    }

    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.assignReviewers) }
        ])
    };

    private GetLitigationRequestForFullAllReviewer(): void {
        this.litigationRequestService.GetLitigationRequestForFullAllReviewer(this.pagintationData.currentPage, this.pagintationData.pageSize)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: BaseResponse<Pagination<LitigationRequestMircoForRequestReviewerDto[]>>) => {
                if (res.isDone && res.data) {
                    this.updateRequestList(res.data as Pagination<LitigationRequestMircoForRequestReviewerDto[]>);
                    this.pageCount = res.data.pageCount;
                }
            })
    }


    //private methods
    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoForRequestReviewerDto[]>): void {
        this.reviewerList = TypeListView;

        this.setPaginationData(
            this.reviewerList.pageSize,
            this.reviewerList.totalCount
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
        this.GetLitigationRequestForFullAllReviewer();
    }


    assignReviewer(currentReviewerId: string, requestId: string, content: TemplateRef<any>) {
         
        this.modalService.open(content)
        this.controls.requestId.setValue(requestId)
        this.employeeService.getReviewesLookup(currentReviewerId, requestId).subscribe(res => {
            if (res.data)
                this.employeeReviewer = res.data;
            console.log("res",res)
        })
    }

    selectedReviewerId!: string;
    assignRequestForm = this._formBuilder.group({
        employeeId: new FormControl<string | null>(null, [Validators.required]),
        requestId: new FormControl<string | null>(null, [Validators.required]),
    })
    get controls() {
        return this.assignRequestForm.controls
    }

    sendReviewerRequest(modal: any) {
        this.assignRequestForm.markAllAsTouched()
        if (this.assignRequestForm.valid) {

            this.litigationRequestService.assignReviewer(this.assignRequestForm.value as AssignEmployeePayload).subscribe(res => {
                if (res.isDone) {
                    this.assignRequestForm.reset();
                    this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                    modal.dismiss()
                    this.GetLitigationRequestForFullAllReviewer();

                } else {
                    this.toastrNotificationService.showError(res.message)
                }
            })
        }

    }
}
