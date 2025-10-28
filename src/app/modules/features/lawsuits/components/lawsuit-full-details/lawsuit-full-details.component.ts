import {
    ChangeDetectorRef,
    Component,
    Input,
    TemplateRef,
    inject,
} from '@angular/core';
import { Tabs } from '@app/shared/models/tabs.model';
import { TabsService } from '@app/shared/services/tabs-service/tabs.service';
import { TranslateService } from '@ngx-translate/core';
import { LawsuitDataComponent } from '../lawsuit-data/lawsuit-data.component';
import { LawsuitEventsComponent } from '../lawsuit-events/lawsuit-events.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseResponse } from '@app/core/models/base-response';
import { LawsuitStatus } from '../../models/enums/lawsuit-status.model';
import { takeUntil } from 'rxjs';
import { LawsuitTypeEnum } from '../../models/enums/lawsuit-type.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { StorageService } from '@app/core/services/storage-service/storage.service';
import { LitigationRequestService } from '@app/modules/features/citizen-requests/services/litigation-request.service';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
    selector: 'app-lawsuits-details',
    templateUrl: './lawsuit-full-details.component.html',
    styleUrl: './lawsuit-full-details.component.scss',
})
export class LawsuitFullDetailsComponent extends BaseComponent {
    private _tabsService = inject(TabsService)
    private _translateService = inject(TranslateService)
    private _lawsuitRequestDetailsService = inject(LawsuitRequestDetailsService)
    private _activatedRoute = inject(ActivatedRoute)
    private cd = inject(ChangeDetectorRef)

    litigationFees?: string;
    @Input() tabClassName?: string = '';
    private _breadcrumbService = inject(BreadcrumbService);
    public litigationId: string = "";
    public editLawsuitURL =
        '/' +
        Configuration.modules.lawsuits +
        '/' +
        Configuration.pages.lawsuits.editLawsuit;
    tabContent: Tabs = {
        verticalTabs: false,
        activeTabIndex: 0,
        tabsComponentList: [
            {
                icon: '',
                title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.lawsuitData),
                Component: LawsuitDataComponent,
                disabled: false,
                isVisible: true,
            },
            {
                icon: '',
                title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.lawsuitEvents),
                Component: LawsuitEventsComponent,
                disabled: false,
                isVisible: true,
            },
        ],
    };
    backForEditTabContent: Tabs = {
        verticalTabs: false,
        activeTabIndex: 0,
        tabsComponentList: [
            {
                icon: '',
                title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.lawsuitData),
                Component: LawsuitDataComponent,
                disabled: false,
                isVisible: true,
            },
            {
                icon: '',
                title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.lawsuitEvents),
                Component: LawsuitEventsComponent,
                disabled: false,
                isVisible: true,
            },
            // {
            //     icon: '',
            //     title: this._translateService.instant(this.translations.lawsuits.lawsuitDetails.LawsuitEditReasons),
            //     Component: LawsuitEditReasonsComponent,
            //     disabled: false,
            //     isVisible: true,
            // },
        ],
    };

    charterRequestTabContent: Tabs = {
        verticalTabs: false,
        activeTabIndex: 0,
        tabsComponentList: [
            {
                icon: '',
                title: this._translateService.instant(
                    this.translations.lawsuits.lawsuitDetails.lawsuitData
                ),
                Component: LawsuitDataComponent,
                disabled: false,
                isVisible: true,
            },
            {
                icon: '',
                title: this._translateService.instant(
                    this.translations.lawsuits.lawsuitDetails.lawsuitEvents
                ),
                Component: LawsuitEventsComponent,
                disabled: false,
                isVisible: true,
            },
            // {
            //     icon: '',
            //     title: this._translateService.instant(
            //         this.translations.lawsuits.lawsuitDetails.InvitationTypeTemplate
            //     ),
            //     Component: LawsuitInvitationTypeComponent,
            //     disabled: false,
            //     isVisible: true,
            // },
        ],
    };

    lawsuitDetails!: LawsuitItemDetails;
    litigationRequestForSessionDto: any;
    get LawsuitStatus() {
        return LawsuitStatus;
    }
    get LawsuitType() {
        return LawsuitTypeEnum;
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
    lawsuitTypeTranslation: { [key: number]: string } = {
        [LawsuitTypeEnum.Rent]: this.translations.lawsuits.lawsuitsList.ejar,
        [LawsuitTypeEnum.Properties]: this.translations.lawsuits.lawsuitsList.mullak,
        [LawsuitTypeEnum.Wafi]: this.translations.lawsuits.lawsuitsList.wafi,
        [LawsuitTypeEnum.RealEstateBrokerage]: this.translations.lawsuits.lawsuitsList.wasatah,
        [LawsuitTypeEnum.OtherServices]: this.translations.lawsuits.lawsuitsList.others,
    }

    /**
     *
     */
    constructor(
        private _formBuilder: FormBuilder,
        private litigationRequestService: LitigationRequestService,
        private modalService: NgbModal,
        private toastrNotificationService: ToastrNotificationService,
        // private _jWTDecoderService: JWTDecoderService,
        private _storageService: StorageService
    ) {
        super();
        
    }

    ngOnInit(): void {
        this.observeActivatedRoute()
    }
    private observeActivatedRoute(): void {
        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            this.litigationId = res['id'];
            if (this.litigationId && this.litigationId.length > 0) this.getLitigationById();
        })
    };
    getLitigationById() {
        this._lawsuitRequestDetailsService
            .GetLitigationFullDetailsById(this.litigationId as string)
            .subscribe({
                next: (res: BaseResponse<LawsuitItemDetails>) => {
                    if (res) {

                        
                        
                        this.lawsuitDetails = res.data as LawsuitItemDetails;
                        // this.litigationFees = this.lawsuitDetails.internalStatusId === LawsuitStatus['CollectionOfLitigationFeesRequestIsBeingSent'] ?
                        // this.lawsuitDetails.feesDifference !=0 ? this.lawsuitDetails.feesDifference.toString() :this.lawsuitDetails.litigationRequestAmount.fees.toString() 
                        // : this.lawsuitDetails.internalStatusId === LawsuitStatus['CollectionOfReconciliationFeesRequestIsBeingSent'] ? this.lawsuitDetails.reconciliationFees.toString() : undefined;

                        this._breadcrumbService.updateBreadcrumbListContent([
                                 { label: this._translateService.instant(this.translations.layout.sidebar.home),  link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },

                            {
                                label: this._translateService.instant(
                                    this.translations.lawsuits.lawsuitsList.lawsuitsList
                                ),
                                link: Configuration.modules.lawsuits,
                            },
                            { label: `${this._translateService.instant(this.translations.lawsuits.lawsuitDetails.lawsuit)} ${this._translateService.instant(this.lawsuitTypeTranslation[this.lawsuitDetails.contract.litigationRequestContractTypeId])} ${this._translateService.instant(this.translations.lawsuits.lawsuitDetails.number)} #${this.lawsuitDetails.requestCode}` },
                        ]);
                        this._lawsuitRequestDetailsService.litigationDetails.set(
                            this.lawsuitDetails
                        );
                        console.log(res);

                        if (
                            this.lawsuitDetails.externalStatusId ==
                            this.LawsuitStatus['SentBackForEdit']
                        ) {
                            this.updateTabContent(this.backForEditTabContent);
                        } else if (
                            this.lawsuitDetails.externalStatusId ==
                            this.LawsuitStatus['CharterRequestSent']
                        ) {
                            this.updateTabContent(this.charterRequestTabContent);
                        } else {
                            this.updateTabContent(this.tabContent);
                        }
                    }
                },
            });
    }

    private resetVerticalTabIndex(): void {
        this._tabsService.updateActiveVerticalTabIndex(0);
    }

    public updateActiveTabIndex(event: any) {
        this.tabContent.activeTabIndex = event.index;
        this.resetVerticalTabIndex();
        this._tabsService.updateActiveTabIndex(event.index);
    }

    public updateTabContent(tabs: Tabs) {
        this.tabContent = { ...tabs };
        this._tabsService.updateTabContent(tabs);
        this.cd.detectChanges();
    }

    // SendLitigationFeesRequestPaid() {
        
    //     this._litigationRequestFeesService.SendLitigationFeesRequestPaid(this.litigationId)
    //         .subscribe(res => {
                
    //             if (res.isDone) {
    //                 this.lawsuitDetails.internalStatusId = res.data?.InternalStatusId;
    //             }
    //         })
    // }
    // SendReconciliationFeesRequestPaid() {
        
    //     this._litigationRequestFeesService.SendReconciliationFeesRequestPaid(this.litigationId)
    //         .subscribe(res => {
                
    //             if (res.isDone) {
    //                 this.lawsuitDetails.internalStatusId = res.data?.InternalStatusId;
    //             }
    //         })
    // }

modificationRequestForm = this._formBuilder.group({
        modificationRequest: new FormControl<string | null>(null, [Validators.required]),

    })

      openModificationRequest(content: TemplateRef<any>) {
            
            this.modalService.open(content, { centered: true });
           
        }


    // addModificationRequest(modal: any){
            
    //         if(this.modificationRequestForm.valid){
            
    //             let model = {
    //                 litigationRequestId: this.litigationId,
                    
                    
    //                 modificationRequest: this.modificationRequestForm.controls.modificationRequest.value,
    //                 actorType: 6
    //             } as unknown as LitigationRequestModificationRequestCreateUpdateDto
                
    //             this.litigationRequestService.addModificationRequest(model)
    //             .subscribe(result => {
                    
    //                 if (result.isDone) {
    //                 this.toastrNotificationService.showSuccess(result.message)
                        
    //                     modal.dismiss()
    
    //                 }
    //             })
    
    //         }
    //     }

        // checkIfLoginApplicant(){
            
        //     var token = this._storageService.getToken();
        //     var payload = this._jWTDecoderService.getDecodedAccessToken(token!);
        //     return payload.ReferenceId == this.lawsuitDetails.applicantCitizenId
           
        // }
}
