import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestMircoForRequestReformerDto, LitigationRequestMircoForRequestSessionDto } from '../../models/litigation-request.model';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitizenService } from '../../services/citizen.service';
import { AssignRequestPayload, CitizenReformer } from '../../models/citizen.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-reformer-list',
    templateUrl: './reformer-list.component.html',
    styleUrls: ['./reformer-list.component.scss']
})
export class ReformerListComponent extends BaseComponent implements OnInit {

    page = 1;
    pageSize = 10;
    collectionSize!: number;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
    }

    reformerList: LitigationRequestMircoForRequestReformerDto[] | undefined = [];
    citizenReformers: CitizenReformer[] = [];

    constructor(private litigationRequestService: LitigationRequestService,
        private _paginationService: PaginationService,
        private toastrNotificationService: ToastrNotificationService,
        private _translate: TranslateService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private citizenService: CitizenService
    ) {
        super();
    }

    ngOnInit() {
        this.observePageChange()
    }



    private list(pageIndex: number, pageSize: number): void {
        this.litigationRequestService.GetLitigationRequestForFullAllReformer(pageIndex, pageSize).subscribe({
            next: (res) => {
                console.log(res);

                this.reformerList = res?.data?.results;

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

    assignReformer(currentReformerId: string, requestId: string, content: TemplateRef<any>) {
        debugger
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
