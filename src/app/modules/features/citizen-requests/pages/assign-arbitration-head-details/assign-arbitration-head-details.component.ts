import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ArbitratorNominationListRequestPayload, CitizenArbitratorShortStatusDto, LitigationRequestForAllArbitratorNominationCharmanListDto, LitigationRequestForAllArbitratorNominationListDto, LitigationRequestForArbitratorSelectionDurationDto } from '../../models/litigation-request-for-arbitrator-selection-duration-dto';
import { ArbitratorSelectionDurationRequestPayload } from '../../models/arbitrator-selection-duration-request-payload';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeterminearbitratorperiodService } from '../../services/determinearbitratorperiod.service';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { CitizenService } from '../../services/citizen.service';
import { CitizenFullLookupArbirator } from '../../models/citizen.model';
import { takeUntil } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { BaseResponse } from '@app/core/models/base-response';


@Component({
    selector: 'app-assign-arbitration-head-details',
    templateUrl: './assign-arbitration-head-details.component.html',
    styleUrls: ['./assign-arbitration-head-details.component.scss']
})
export class AssignArbitrationHeadDetailsComponent extends BaseComponent implements OnInit {
    litigationRequestForReportDto?: LitigationRequestForAllArbitratorNominationCharmanListDto
    arbitratorSelectionDurationRequestPayload = {} as ArbitratorSelectionDurationRequestPayload
    requestId?: string;
    displayedColumns: string[] = ['totalPriority', 'identityNumber', 'fullName', 'requestsCount',
        'experienceYears', 'arbitratorClass', 'mobile', 'email', 'status', 'brief'];
    dataSource: any;
    arbitratorChairmanId: string = ""
    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    searchForm!: FormGroup;
    defendantCitizen: any;
    defendantFacility: any;
    constructor(private activatedRoute: ActivatedRoute,
        private _translate: TranslateService,
        private _determinearbitratorperiodService: DeterminearbitratorperiodService,
        private toastrNotificationService: ToastrNotificationService,
        private citizenService: CitizenService,
        private _formBuilder: FormBuilder,
        private modalService: NgbModal,
        private _activatedRoute: ActivatedRoute,
        private _breadcrumbService: BreadcrumbService,
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
        this.initializeForm();
        this.setBreadcrumb()

        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            this.requestId = res['id'];
            if (this.requestId) {
                this.getLitigationRequestForSession(this.requestId);
            }
        })

        this.getArbitratorsFullLookup()
    }

    initializeForm(): void {
        this.searchForm = this._formBuilder.group({
          fullName: [''],
          area: [''],
          arbitratorClass: [''],
        });
      }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translate.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}` },
            { label: this._translate.instant(this.translations.layout.sidebar.assignArbitrationHeadList) }
        ])
    }

    getLitigationRequestForSession(requestId: string) {
        this._determinearbitratorperiodService.GetLitigationRequestForAddArbitratorsChairmanNominationListByRequestId(requestId).subscribe(res => {
            ;
            this.litigationRequestForReportDto = res as LitigationRequestForAllArbitratorNominationCharmanListDto;
            this.dataSource = new MatTableDataSource<CitizenArbitratorShortStatusDto>(this.litigationRequestForReportDto.citizenArbitratorCharmanShortStatusDtos);
            this.dataSource.paginator = this.paginator;
            this.fillData()
            this.fillfirstPartyData()
            this.fillsecondPartyData()

            // this.form.controls.arbitratorSelectionDuration.setValue(this.litigationRequestForReportDto.arbitratorSelectionDuration)
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

        this.defendantFacility = this.litigationRequestForReportDto?.litigationRequestShortDto?.defendantFacility;
        this.defendantCitizen = this.litigationRequestForReportDto?.litigationRequestShortDto?.defendantCitizen
            ?? (this.defendantFacility ? this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.secondPartyCitizen : null);

        this.secondParty = [];
        if (this.defendantFacility) {
            this.secondParty.push(
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
            );
        }

        if (this.defendantCitizen) {
            this.secondParty.push(
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
            );
        }

        this.secondParty.push({
            icon: 'assets/images/icons/lawsuit-details/call.svg',
            title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
            value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
            isDownload: false,
        });

    }


    citizens: CitizenFullLookupArbirator[] = [];
    getArbitratorsFullLookup() {
        const searchCriteria = this.searchForm.value;
        console.log('Search criteria:', searchCriteria);
        this.citizenService.getArbitratorsFullLookup('', this.requestId as string,searchCriteria).subscribe(res => {
            if (res.data)
                this.citizens = res.data;
        })
    }

    resetFilter(){
        this.searchForm.reset();
        this.getArbitratorsFullLookup()
    }
    selectedBrief?: string | null = '';
    open(content: TemplateRef<any>, brief: string | null) {
        this.selectedBrief = brief;
        this.modalService.open(content)
    }

    selectedCitizens: string[] = [];
    onSelectedChange(event: any, citizen: string) {
        console.log(event);

        if (event.target.checked) {
            this.selectedCitizens.push(citizen);
        } else {
            this.selectedCitizens = this.selectedCitizens.filter(x => x != citizen);
        }
        console.log(this.selectedCitizens);

    }

    AddLitigationRequestArbitratorsNominationList() {
        if (this.selectedCitizens.length == 0) {
            this.toastrNotificationService.showError("لابد من إضافة أعضاء هيئة المحكمين")
            return;
        }

        if (this.selectedCitizens.length != this.litigationRequestForReportDto?.listCount) {
            this.toastrNotificationService.showError(`يجب اختيار ${this.litigationRequestForReportDto?.listCount} رئيس هيئة المحكمين`)
            return;
        }

        this._determinearbitratorperiodService.AddLitigationRequestArbitratorsChairmanNominationList({
            requestId: this.litigationRequestForReportDto?.litigationRequestShortDto?.id,
            arbitrators: this.selectedCitizens
        } as ArbitratorNominationListRequestPayload).subscribe(result => {
            if (result.isDone) {
                this.litigationRequestForReportDto = result.data as LitigationRequestForAllArbitratorNominationCharmanListDto;
                // for test
                this.dataSource = new MatTableDataSource<CitizenArbitratorShortStatusDto>(this.litigationRequestForReportDto.citizenArbitratorCharmanShortStatusDtos);
                this.dataSource.paginator = this.paginator;
                this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
            }
        })
    }
    public addLitigationRequestArbitratorsChairmandecision(): void {
        console.log("this.requestId", this.requestId);
        console.log("this.arbitratorChairmanId", this.arbitratorChairmanId);
        if (this.arbitratorChairmanId == "") {
            this.toastrNotificationService.showError("لابد من أختيار رئيس أعضاء هيئة المحكمين")
            return;
        }
        this.citizenService.AddLitigationRequestArbitratorsChairmandecision(this.requestId as string, this.arbitratorChairmanId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: BaseResponse<any>) => {
                if (res.isDone && this.requestId) {

                    this.getLitigationRequestForSession(this.requestId);
                    this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                }
            })
    }
}
