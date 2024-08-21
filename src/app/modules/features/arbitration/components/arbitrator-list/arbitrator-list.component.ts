import { Component, effect, Injector, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ArbitratorsLookupDto } from '../../models/arbitrators-lookup-dto';
import { AssignArbitorService } from '../../services/assign-arbitor.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LitigationRequestMircoArbitratorDto } from '../../models/litigation-request-mirco-arbitrator-dto';
import { AssignArbitratorRequestPayload } from '../../models/assign-arbitrator-request-payload';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
  selector: 'app-arbitrator-list',
  templateUrl: './arbitrator-list.component.html',
  styleUrl: './arbitrator-list.component.scss'
})
export class ArbitratorListComponent  extends BaseComponent implements OnInit{
  page = 1;
    pageSize = 10;
    collectionSize!: number;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
    }
    assignArbitratorRequestPayload={} as AssignArbitratorRequestPayload;
    ArbitratorList: LitigationRequestMircoArbitratorDto[] | undefined = [];
    arbitrators: ArbitratorsLookupDto[] = [];

    constructor(private _assignArbitorService: AssignArbitorService,
        private _paginationService: PaginationService,
        private toastrNotificationService: ToastrNotificationService,
        private _translate: TranslateService,
        private _injector: Injector,
        private modalService: NgbModal,
        private _formBuilder: FormBuilder,
        private _breadcrumbService :BreadcrumbService
    ) {
        super();
    }

    ngOnInit() {
        this.observePageChange();
        this.updateBreadcrumb();
    }

    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
          { label: this._translate.instant(this.translations.layout.sidebar.home), link: '/' },
          { label: this._translate.instant(this.translations.layout.sidebar.assignarbitratorlist), link: Configuration.pages.arbitration.assignarbitratorlist }
        ])
      };

    private list(pageIndex: number, pageSize: number): void {
        this._assignArbitorService.getAllArbitrationLitigationRequest(pageIndex, pageSize).subscribe({
            next: (res) => {
                console.log(res);

                this.ArbitratorList = res?.data?.results;

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

    assignArbitrator(litigationRequestMircoArbitrator:LitigationRequestMircoArbitratorDto, content: TemplateRef<any>) {
         
        this.modalService.open(content)
        this.assignArbitratorRequestPayload.requestId=litigationRequestMircoArbitrator.id;
        this.assignArbitratorRequestPayload.litigationRequestArbitratorListId=litigationRequestMircoArbitrator.litigationRequestArbitratorListId;
        this.assignArbitratorRequestPayload.arbitratorAssigningRequestTypeId=litigationRequestMircoArbitrator.arbitratorAssigningRequestTypeId;
        this._assignArbitorService.getArbitratorsLookup(litigationRequestMircoArbitrator.arbitratoId, this.assignArbitratorRequestPayload.requestId).subscribe(res => {
            if (res.data)
                this.arbitrators = res.data;
        })
    }

    selectedArbitratorId!: string;
    assignForm = this._formBuilder.group({
      arbitratorId: new FormControl<string | null>(null, [Validators.required]),
    })
    get controls() {
        return this.assignForm.controls
    }

    sendArbitratorRequest(modal: any) {
        this.assignForm.markAllAsTouched()
        if (this.assignForm.valid) {
this.assignArbitratorRequestPayload.arbitratorId=this.assignForm.controls.arbitratorId.value as string;
            this._assignArbitorService.assign(this.assignArbitratorRequestPayload as AssignArbitratorRequestPayload).subscribe(res => {
                if (res.isDone) {
                    this.assignForm.reset();
                    this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                    modal.dismiss()
                } else {
                    this.toastrNotificationService.showError(res.message)
                }
            })
        }

    }
}
