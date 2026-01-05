import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { ArbitratorSelectionDurationRequestPayload } from '@app/modules/features/citizen-requests/models/arbitrator-selection-duration-request-payload';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ArbitrationService } from '../../services/arbitration.service';
import { LitigationRequestForAllArbitratorNominationListWithPartiesValueDto, CitizenArbitratorShortStatusWithValueDto, ArbitratorNominationListRequestItem, ArbitratorNominationListRequestReplyPayload } from '@app/modules/features/citizen-requests/models/assign-arbitrators.model';

@Component({
  selector: 'app-assign-arbitrators-for-duedate-lawsuits-details',
  templateUrl: './assign-arbitrators-for-duedate-lawsuits-details.component.html',
  styleUrl: './assign-arbitrators-for-duedate-lawsuits-details.component.scss'
})
export class AssignArbitratorsForDuedateLawsuitsDetailsComponent extends BaseComponent implements OnInit {
litigationRequestForReportDto?: LitigationRequestForAllArbitratorNominationListWithPartiesValueDto
    arbitratorSelectionDurationRequestPayload = {} as ArbitratorSelectionDurationRequestPayload
    requestId?: string;
    defendantCitizen: any;
    defendantFacility: any;
    constructor(private activatedRoute: ActivatedRoute,
        private _translate: TranslateService,
        private arbitrationService: ArbitrationService,
        private toastrNotificationService: ToastrNotificationService,
        private _formBuilder: FormBuilder,
        private modalService: NgbModal,
        private _activatedRoute: ActivatedRoute,
        private _breadcrumbService: BreadcrumbService,
        private _router: Router
    ) {
        super();
    }
    showValidation: boolean = false;
    form = this._formBuilder.group({
        arbitratorSelectionDuration: this._formBuilder.control<number | null>(null, [Validators.required, Validators.pattern(Configuration.validators.decimal), Validators.min(0)]),
    });

    get controls() {
        return this.form.controls
    }

    ngOnInit() {
        this.setBreadcrumb();

        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            this.requestId = res['id']
            if (this.requestId) {
                this.getLitigationRequestForSession(this.requestId);
            }
        });

    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translate.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translate.instant(this.translations.layout.sidebar.assignArbitrationMemberList) }
        ])
    }

    renotifyPartiesToSelectArbitrators() {
      if (this.requestId) {
        this.arbitrationService.ReNotifyPartiesToSelectArbitrators(this.requestId).subscribe(res => {
              debugger;
              if(res.isDone){
                
                this.toastrNotificationService.showSuccess(res?.message);
              }else{
                this.toastrNotificationService.showError(res?.message);
              }
            });
        }
    }

    getLitigationRequestForSession(requestId: string) {
        this.arbitrationService.GetCitizenLitigationRequestForArbitratorsNominationListReplyByRequestId(requestId).subscribe(res => {

            this.litigationRequestForReportDto = res as LitigationRequestForAllArbitratorNominationListWithPartiesValueDto;
            this.fillData()
            this.fillfirstPartyData()
            this.fillsecondPartyData()

            if (res?.citizenArbitratorShortStatusDtos && res?.citizenArbitratorShortStatusDtos.length > 0) {
                res?.citizenArbitratorShortStatusDtos.forEach(element => {
                    this.addCitizen(element)
                });
            }

        
             // Set arbitrator count (you should set this based on your business logic)
                this.arbitratorCount =res?.litigationRequestShortDto?.arbitratorsCount ?? 0;
                debugger;
                // Set selected counts from the DTO list
                const statusDtos = res?.citizenArbitratorShortStatusDtos ?? [];
                if(statusDtos.filter(dto => dto?.isDefendantSelected === true).length > 0){

                  this.defendantSelectedCount = statusDtos.filter(dto => dto?.isDefendantSelected === true).length + 1;
                }else if(statusDtos.filter(dto => dto?.isPlaintiffSelected === true).length > 0){

                  this.plaintiffSelectedCount = statusDtos.filter(dto => dto?.isPlaintiffSelected === true).length + 1;
                }
        })
    }

    deleteItem() {
        console.log('Item deleted');
    }

    cancelDeletion() {
        // Handle the cancel action
        console.log('Deletion cancelled');
    }

    dataList: LawsuitDetailsItem[] = [];
    firstParty: LawsuitDetailsItem[] = [];
    secondParty: LawsuitDetailsItem[] = [];
    fillData() {
        this.dataList = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.requestCode),
                value: this.litigationRequestForReportDto?.litigationRequestShortDto?.requestCode ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.cityName),
                value: this.litigationRequestForReportDto?.litigationRequestShortDto?.cityName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.areaName),
                value: this.litigationRequestForReportDto?.litigationRequestShortDto?.areaName ?? '',
                isDownload: false,
            },

            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.contractAddress),
                value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contractAddress ?? '',
                isDownload: false,
            },

            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.litigationRequestCategory),
                value: this.litigationRequestForReportDto?.litigationRequestShortDto?.litigationRequestCategory?.categoryName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.litigationRequestContractType),
                value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.litigationRequestContractType.typeName ?? '',
                isDownload: false,
            },

        ]

    }
    fillfirstPartyData() {

        if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyFacility) {
            this.firstParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyFacility.code ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyFacility.arabicFacilityName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyFacility.commercialRegisterNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyFacility.facility700Number ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

        if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen) {

            this.firstParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.arbitrator.fullName),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.fullName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.arbitrator.identityNumber),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.identityNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.workPhone),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.workTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.homePhone),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.homeTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                    title: this._translate.instant(this.translations.arbitrator.fax),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.fax ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/location.svg',
                    title: this._translate.instant(this.translations.auth.email),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.email ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.auth.phoneNumber),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCitizen.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

    }

    fillsecondPartyData() {

        // if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility) {
        //     this.secondParty = [
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/user.svg',
        //             title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/buliding.svg',
        //             title: this._translate.instant(this.translations.LitigationRequest.facilityName),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/call.svg',
        //             title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/call.svg',
        //             title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/call.svg',
        //             title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
        //             isDownload: false,
        //         },
        //     ]
        // }

        // if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen) {

        //     this.secondParty = [
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/user.svg',
        //             title: this._translate.instant(this.translations.arbitrator.fullName),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/buliding.svg',
        //             title: this._translate.instant(this.translations.arbitrator.identityNumber),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/call.svg',
        //             title: this._translate.instant(this.translations.arbitrator.workPhone),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/call.svg',
        //             title: this._translate.instant(this.translations.arbitrator.homePhone),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/send-square.svg',
        //             title: this._translate.instant(this.translations.arbitrator.fax),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/location.svg',
        //             title: this._translate.instant(this.translations.auth.email),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/buliding.svg',
        //             title: this._translate.instant(this.translations.auth.phoneNumber),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
        //             isDownload: false,
        //         },
        //         {
        //             icon: 'assets/images/icons/lawsuit-details/call.svg',
        //             title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
        //             value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
        //             isDownload: false,
        //         },
        //     ]
        // }

          this.defendantCitizen = this.litigationRequestForReportDto?.litigationRequestShortDto?.defendantCitizen;
        this.defendantFacility = this.litigationRequestForReportDto?.litigationRequestShortDto?.defendantFacility;

        if (this.defendantFacility) {
            this.secondParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                    value: this.defendantFacility?.code ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                    value: this.defendantFacility?.arabicFacilityName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                    value: this.defendantFacility?.commercialRegisterNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                    value: this.defendantFacility?.facility700Number ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

        if (this.defendantCitizen) {

            this.secondParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.arbitrator.fullName),
                    value: this.defendantCitizen?.fullName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.arbitrator.identityNumber),
                    value: this.defendantCitizen?.identityNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.workPhone),
                    value: this.defendantCitizen?.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.homePhone),
                    value: this.defendantCitizen?.homeTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                    title: this._translate.instant(this.translations.arbitrator.fax),
                    value: this.defendantCitizen?.fax ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/location.svg',
                    title: this._translate.instant(this.translations.auth.email),
                    value: this.defendantCitizen?.email ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.auth.phoneNumber),
                    value: this.defendantCitizen?.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }



    }

    selectedBrief?: string | null = '';
    open(content: TemplateRef<any>, brief: string | null) {
        this.selectedBrief = brief;
        this.modalService.open(content, { centered: true });
    }
    myForm: FormGroup = this._formBuilder.group({
        citizens: this._formBuilder.array([])
    });


    // Add these properties to your component
     private arbitratorCount: number = 0; // Set this based on your data
     private defendantSelectedCount: number = 0; // Set this based on your data
     private plaintiffSelectedCount: number = 0; // Set this based on your data
     private selectedArbitrators: any[] = [];

    addCitizen(model: CitizenArbitratorShortStatusWithValueDto) {
        const citizen = this._formBuilder.group({
            id: [model.id],
            name: [model.fullName],
            brief: [model.brief],
            selected: [false], // Replace the 'value' control with 'selected'
            mobile: [model.mobile],
            email: [model.email],
            arbitratorClass: [model.arbitratorClass],
            experienceYears: [model.experienceYears],   
            identityNumber: [model.identityNumber],
            isPlaintiffSelected: [model.isPlaintiffSelected],
            isDefendantSelected: [model.isDefendantSelected],
            isArbitratorAdminSelected: [model.isArbitratorAdminSelected],
            isSent: [model.isSent],
            // value: [model.value, [Validators.required, Validators.min(1), Validators.max(this.litigationRequestForReportDto?.citizenArbitratorShortStatusDtos.length ? this.litigationRequestForReportDto?.citizenArbitratorShortStatusDtos.length : 0)]],
        });
        // If the arbitrator is already selected as plaintiff or defendant, set selected to true and disable the checkbox
        if(model.isDefendantSelected || model.isPlaintiffSelected || model.isArbitratorAdminSelected || model.isSent){
            citizen.get('selected')?.disable(); 
            // citizen.get('selected')?.setValue(true);
        }
        this.citizens.push(citizen);
    }

    get citizens() {
        return this.myForm.get('citizens') as FormArray;
    }

    // Calculate required selection count based on arbitrator count
getRequiredSelectionCount(): number {
    switch (this.arbitratorCount) {
        case 3:
            if (this.defendantSelectedCount > 0) {
                return Math.max(0, 3 - this.defendantSelectedCount);
            } else if (this.plaintiffSelectedCount > 0) {
                return Math.max(0, 3 - this.plaintiffSelectedCount);
            }
            return 2;
        case 5:
            if (this.defendantSelectedCount > 0) {
                return Math.max(0, 5 - this.defendantSelectedCount);
            } else if (this.plaintiffSelectedCount > 0) {
                return Math.max(0, 5 - this.plaintiffSelectedCount);
            }
            return 4;
        case 7:
            if (this.defendantSelectedCount > 0) {
                return Math.max(0, 7 - this.defendantSelectedCount);
            } else if (this.plaintiffSelectedCount > 0) {
                return Math.max(0, 7 - this.plaintiffSelectedCount);
            }
            return 6;
        case 9:
            if (this.defendantSelectedCount > 0) {
                return Math.max(0, 9 - this.defendantSelectedCount);
            } else if (this.plaintiffSelectedCount > 0) {
                return Math.max(0, 9 - this.plaintiffSelectedCount);
            }
            return 8;
        default:
            return 1;
    }
}

// Get current selected count
getSelectedCount(): number {
    return this.citizens.controls.filter(control => control.get('selected')?.value === true).length;
}

// Check if selection is valid
isSelectionValid(): boolean {
    return this.getSelectedCount() === this.getRequiredSelectionCount();
}

// Handle checkbox change
onCheckboxChange(index: number): void {
    const control = this.citizens.controls[index];
    const isSelected = control.get('selected')?.value;
    
    if (isSelected) {
        // Check if we've reached the maximum selection limit
        if (this.getSelectedCount() > this.getRequiredSelectionCount()) {
            // Uncheck the current checkbox
            control.get('selected')?.setValue(false);
            this.toastrNotificationService.showInfo(
                `لا يمكن اختيار أكثر من ${this.getRequiredSelectionCount()} محكم`
            );
            return;
        }
    }
}

// Get selected arbitrators in priority order
getSelectedArbitrators(): any[] {
    return this.citizens.controls
        .filter(control => control.get('selected')?.value === true)
        .map(control => ({
            id: control.get('id')?.value,
            name: control.get('name')?.value,
            priority: control.get('priority')?.value
        }));
        // .sort((a, b) => a.priority - b.priority);
}

    AddCitizenLitigationRequestForReportArbitratorsNominationListReply() {
        this.myForm.markAllAsTouched();
         
        this.showValidation = false;

         // Validate selection count
    if (!this.isSelectionValid()) {
        if (this.getSelectedCount() < this.getRequiredSelectionCount()) {
            this.toastrNotificationService.showError(
                `يجب اختيار ${this.getRequiredSelectionCount()} محكم. لقد اخترت ${this.getSelectedCount()} فقط.`
            );
        } else {
            this.toastrNotificationService.showError(
                `لا يمكن اختيار أكثر من ${this.getRequiredSelectionCount()} محكم. لقد اخترت ${this.getSelectedCount()} محكم.`
            );
        }
        return;
    }
        if (this.myForm.valid) {
             

            let arbitratorNominationListRequestItems: any[] = [];
            this.selectedArbitrators = this.getSelectedArbitrators();
            for (let index = 0; index < this.selectedArbitrators.length; index++) {
                const element = this.selectedArbitrators[index] as any;

                console.log(element);

                arbitratorNominationListRequestItems.push({
                    arbitratorListId: element.id,
                    priority: index + 1 
                } as ArbitratorNominationListRequestItem);

            }

            let items = arbitratorNominationListRequestItems.map(x => x.priority);
            const duplicates = items.filter((item, index) => items.indexOf(item) !== index);

            if (duplicates.length > 0) {
                this.toastrNotificationService.showError('يوجد ترتيب مكررة')
                return
            }

            let model = {
                requestId: this.litigationRequestForReportDto?.litigationRequestShortDto?.id,
                arbitratorNominationListRequestItems: arbitratorNominationListRequestItems
            } as ArbitratorNominationListRequestReplyPayload;
            this.arbitrationService.AddCitizenLitigationRequestForReportArbitratorsNominationListReplyForCoAdmin(model).subscribe(res => {
              this.toastrNotificationService.showSuccess(res?.message);
                if(res?.isDone){
                  this._router.navigate(['/' + Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.assignarbitratorlistforduedatelawsuits]);
                }
            })
        } else {
            this.showValidation = true;
        }
    }

    
}
