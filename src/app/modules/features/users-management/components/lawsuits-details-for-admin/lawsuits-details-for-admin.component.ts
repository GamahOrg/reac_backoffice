import { Component, inject, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseResponse } from '@app/core/models/base-response';
import { LawsuitDataComponent } from '@app/modules/features/lawsuits/components/lawsuit-data/lawsuit-data.component';
import { LawsuitEventsComponent } from '@app/modules/features/lawsuits/components/lawsuit-events/lawsuit-events.component';
import { LawsuitReeditReasonComponent } from '@app/modules/features/lawsuits/components/lawsuit-reedit-reason/lawsuit-reedit-reason.component';
import { LawsuitStatus } from '@app/modules/features/lawsuits/models/enums/lawsuit-status.model';
import { LawsuitTypeEnum } from '@app/modules/features/lawsuits/models/enums/lawsuit-type.model';
import { GetWorkflowStepEventsForEmployeeDto } from '@app/modules/features/lawsuits/models/get-workflow-step-events-for-employee-dto.model';
import { LawsuitItemDetails } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { LawsuitRequestDetailsService } from '@app/modules/features/lawsuits/services/lawsuit-request-details/lawsuit-request-details.service';
import { LawsuitReviewService } from '@app/modules/features/lawsuits/services/lawsuit-review/lawsuit-review.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Tabs } from '@app/shared/models/tabs.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TabsService } from '@app/shared/services/tabs-service/tabs.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { translations } from 'translation-keys.enum';

@Component({
  selector: 'app-lawsuits-details-for-admin',
  templateUrl: './lawsuits-details-for-admin.component.html',
  styleUrl: './lawsuits-details-for-admin.component.scss'
})
export class LawsuitsDetailsForAdminComponent extends BaseComponent{
 private _tabsService = inject(TabsService)
    private _translateService = inject(TranslateService)
    private _breadcrumbService = inject(BreadcrumbService)
    private modalService = inject(NgbModal);
    // private _lawsuitReviewService = inject(LawsuitReviewService);

    id: string | null = null;
    reason: string = '';
    selectedReason!: string;

    isLawsuitDetails: boolean = true;
    buttonActions!: GetWorkflowStepEventsForEmployeeDto

    charCounts: { [key: string]: number } = {
        subject: 0,
        notes: 0
    };

    tabContent: Tabs = {
        verticalTabs: false,
        activeTabIndex: 0,
        tabsComponentList: [
            {
                icon: '',
                title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitData),
                Component: LawsuitDataComponent,
                disabled: false,
                isVisible: true,
            },
            {
                icon: '',
                title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitEvents),
                Component: LawsuitEventsComponent,
                disabled: false,
                isVisible: true,
            },
            // {
            //   icon: '',
            //   title: this._translateService.instant(translations.lawsuits.lawsuitDetails.reasonForReturningLawsuitForModification),
            //   Component: LawsuitReeditReasonComponent,
            //   disabled: false,
            //   isVisible: true,
            // },
        ],
    };
    backForEditTabContent: Tabs = {
        verticalTabs: false,
        activeTabIndex: 0,
        tabsComponentList: [
            {
                icon: '',
                title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitData),
                Component: LawsuitDataComponent,
                disabled: false,
                isVisible: true,
            },
            {
                icon: '',
                title: this._translateService.instant(translations.lawsuits.lawsuitDetails.lawsuitEvents),
                Component: LawsuitEventsComponent,
                disabled: false,
                isVisible: true,
            },
            {
                icon: '',
                title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.LawsuitEditReasons),
                Component: LawsuitReeditReasonComponent,
                disabled: false,
                isVisible: true,
            },
        ],
    };
    lawsuitDetails!: LawsuitItemDetails;
    get LawsuitStatus() {
        return LawsuitStatus
    }
    lawsuitStatus: { [key: number]: string } = {
        [LawsuitStatus.New]: this.translations.lawsuits.lawsuitsList.new,
        [LawsuitStatus.Received]: this.translations.lawsuits.lawsuitsList.received,
        [LawsuitStatus.AsessionTimeHasBeenSet]: this.translations.lawsuits.lawsuitsList.asessionTimeHasBeenSet,
        [LawsuitStatus.TheSessionWasCompleted]: this.translations.lawsuits.lawsuitsList.theSessionWasCompleted,
        [LawsuitStatus.TheMinutesOfTheMeetingWereWritten]: this.translations.lawsuits.lawsuitsList.theMinutesOfTheMeetingWereWritten,
        [LawsuitStatus.WaiverOfRight]: this.translations.lawsuits.lawsuitsList.waiverOfRight,
        // [LawsuitStatus.WaiverOfRight]: this.translations.lawsuits.lawsuitsList.WaiverOfRight,
        [LawsuitStatus.ReconciliationWasNotMade]: this.translations.lawsuits.lawsuitsList.ReconciliationWasNotMade,
        [LawsuitStatus.SaveAndClose]: this.translations.lawsuits.lawsuitsList.saveAndClose,
        [LawsuitStatus.SaveAsDraft]: this.translations.lawsuits.lawsuitsList.saveAsDraft,
        [LawsuitStatus.Rejected]: this.translations.lawsuits.lawsuitsList.Rejected,
        [LawsuitStatus.SentBackForEdit]: this.translations.lawsuits.lawsuitsList.SentBackForEdit,
        [LawsuitStatus.Edited]: this.translations.lawsuits.lawsuitsList.Edited,
        [LawsuitStatus.CharterRequestSent]: this.translations.lawsuits.lawsuitsList.CharterRequestSent,
        [LawsuitStatus.AcceptanceOfTheReconciliationReport]: this.translations.lawsuits.lawsuitsList.AcceptanceOfTheReconciliationReport,
        [LawsuitStatus.RejectionOfTheReconciliationReport]: this.translations.lawsuits.lawsuitsList.RejectionOfTheReconciliationReport,
        [LawsuitStatus.ReconciliationWasMade]: this.translations.lawsuits.lawsuitsList.ReconciliationWasMade,


        [LawsuitStatus.CollectionOfLitigationFeesRequestIsBeingSent]: this.translations.lawsuits.lawsuitsList.CollectionOfLitigationFeesRequestIsBeingSent,
        [LawsuitStatus.LitigationFeesHaveBeenCollected]: this.translations.lawsuits.lawsuitsList.LitigationFeesHaveBeenCollected,
        [LawsuitStatus.CollectionOfReconciliationFeesRequestIsBeingSent]: this.translations.lawsuits.lawsuitsList.CollectionOfReconciliationFeesRequestIsBeingSent,
        [LawsuitStatus.ReconciliationFeesHaveBeenCollected]: this.translations.lawsuits.lawsuitsList.ReconciliationFeesHaveBeenCollected,
        [LawsuitStatus.CollectionOfArbitrationFeesRequestIsBeingSent]: this.translations.lawsuits.lawsuitsList.CollectionOfArbitrationFeesRequestIsBeingSent,
        [LawsuitStatus.ArbitrationFeesHaveBeenCollected]: this.translations.lawsuits.lawsuitsList.ArbitrationFeesHaveBeenCollected,
        [LawsuitStatus.LitigationApprovedCollectionOfReconciliationFeesRequestIsBeingSend]: this.translations.lawsuits.lawsuitsList.LitigationApprovedCollectionOfReconciliationFeesRequestIsBeingSend,

    }
    get LawsuitType() {
        return LawsuitTypeEnum;
    }
    lawsuitTypeTranslation: { [key: number]: string } = {
        [LawsuitTypeEnum.Rent]: this.translations.lawsuits.lawsuitsList.ejar,
        [LawsuitTypeEnum.Properties]: this.translations.lawsuits.lawsuitsList.mullak,
        [LawsuitTypeEnum.Wafi]: this.translations.lawsuits.lawsuitsList.wafi,
        [LawsuitTypeEnum.RealEstateBrokerage]: this.translations.lawsuits.lawsuitsList.wasatah,
        [LawsuitTypeEnum.OtherServices]: this.translations.lawsuits.lawsuitsList.others,
    }
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _lawsuitRequestDetailsService: LawsuitRequestDetailsService
    ) {
        super()
    }
    ngOnInit(): void {
        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            this.id = res['id']
            if (this.id){
                this.getLitigationById();
                // this.GetWorkflowStepEventsForEmployee(this.id);
            } 
        })
    }

    private getLitigationById() {
        this._lawsuitRequestDetailsService.GetLitigationById({ litigationId: (this.id as string) }).subscribe({
            next: (res) => {
                if (res) {
                    
                    this.lawsuitDetails = res.data as LawsuitItemDetails;
                    this._breadcrumbService.updateBreadcrumbListContent([
                        { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
                        { label: this._translateService.instant(this.translations.lawsuits.lawsuitsList.lawsuitsList) },
                        { label: `${this._translateService.instant(this.translations.lawsuits.lawsuitDetails.lawsuit)} ${this._translateService.instant(this.lawsuitTypeTranslation[this.lawsuitDetails.contract.litigationRequestContractTypeId])} ${this._translateService.instant(this.translations.lawsuits.lawsuitDetails.number)} #${this.lawsuitDetails.requestCode}` },
                    ]);
                    this._lawsuitRequestDetailsService.litigationDetails.set(this.lawsuitDetails);
                }
                if (
                    this.lawsuitDetails.internalStatusId ==
                    this.LawsuitStatus['SentBackForEdit']
                ) {
                    this.updateTabContent(this.backForEditTabContent);
                } else {
                    this.updateTabContent(this.tabContent);
                }
            }
        })
    }

    private restVerticalTabIndex(): void {
        this._tabsService.updateActiveVerticalTabIndex(0)
    }

    public updateActiveTabIndex(event: any) {
        this.tabContent.activeTabIndex = event.index;
        this.restVerticalTabIndex()
        this._tabsService.updateActiveTabIndex(event.index)
    }

    private updateTabContent(tabs: Tabs) {
        this._tabsService.updateTabContent(tabs)
        // this._tabsService.tabContent.set(tabs)
    }

    public openReasonModal(content: TemplateRef<any>) {
        const modalOptions: NgbModalOptions = {
            modalDialogClass: 'modal-lg'
        };

        const modalRef = this.modalService.open(content, modalOptions);
    }

    public openAuditorsModal(content: TemplateRef<any>) {
        const modalOptions: NgbModalOptions = {
            modalDialogClass: 'auditors-modal'
        };

        const modalRef = this.modalService.open(content, modalOptions);
    }

    public updateCharCount(event: any, field: string) {
        this.charCounts[field] = event.target.value.length;
    }

    public updateIsLawsuitDetails(value: boolean): void {
        
        if( !value && this.buttonActions && this.buttonActions.workFlowStepEventShortDtos.length == 0){
            this.isLawsuitDetails = true;
        }else{

            this.isLawsuitDetails = value
        }
    }

    // private GetWorkflowStepEventsForEmployee(requestId :any) {
    //     this._lawsuitReviewService.GetWorkflowStepEventsForEmployee(requestId).pipe(takeUntil(this.destroy$)).subscribe((res: BaseResponse<GetWorkflowStepEventsForEmployeeDto>) => {
    //         if (res.data && res.isDone){
                
    //             this.buttonActions = res.data

    //         }
    //         console.log("this.buttonActions", this.buttonActions);

    //     })
    // }
}
