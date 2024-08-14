import { Component, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ArbitratorNominationListRequestPayload, LitigationRequestForAllArbitratorNominationListDto, LitigationRequestForArbitratorSelectionDurationDto } from '../../models/litigation-request-for-arbitrator-selection-duration-dto';
import { ArbitratorSelectionDurationRequestPayload } from '../../models/arbitrator-selection-duration-request-payload';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DeterminearbitratorperiodService } from '../../services/determinearbitratorperiod.service';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { CitizenService } from '../../services/citizen.service';
import { CitizenFullLookupArbirator } from '../../models/citizen.model';
import { takeUntil } from 'rxjs';



@Component({
  selector: 'app-assign-arbitration-member-details',
  templateUrl: './assign-arbitration-member-details.component.html',
  styleUrls: ['./assign-arbitration-member-details.component.scss']
})
export class AssignArbitrationMemberDetailsComponent extends BaseComponent implements OnInit {
  litigationRequestForReportDto?: LitigationRequestForAllArbitratorNominationListDto
  arbitratorSelectionDurationRequestPayload = {} as ArbitratorSelectionDurationRequestPayload
  requestId?: string;
  constructor(private activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
    private _determinearbitratorperiodService: DeterminearbitratorperiodService,
    private toastrNotificationService: ToastrNotificationService,
    private citizenService: CitizenService,
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _activatedRoute : ActivatedRoute
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
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
      this.requestId = res['id'];
      if (this.requestId) {
        this.getLitigationRequestForSession(this.requestId);
      }
    })

    this.getArbitratorsFullLookup();
  }

  getLitigationRequestForSession(requestId: string) {
    this._determinearbitratorperiodService.GetLitigationRequestForAddArbitratorsNominationListByRequestId(requestId).subscribe(res => {
      debugger;
      this.litigationRequestForReportDto = res as LitigationRequestForAllArbitratorNominationListDto;
      this.fillData()
      this.fillfirstPartyData()
      this.fillsecondPartyData()

      // this.form.controls.arbitratorSelectionDuration.setValue(this.litigationRequestForReportDto.listCount)
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

    if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility) {
      this.secondParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translate.instant(this.translations.LitigationRequest.facilityName),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
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

    if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen) {

      this.secondParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translate.instant(this.translations.arbitrator.fullName),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translate.instant(this.translations.arbitrator.identityNumber),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translate.instant(this.translations.arbitrator.workPhone),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translate.instant(this.translations.arbitrator.homePhone),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/send-square.svg',
          title: this._translate.instant(this.translations.arbitrator.fax),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/location.svg',
          title: this._translate.instant(this.translations.auth.email),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translate.instant(this.translations.auth.phoneNumber),
          value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
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

  citizens: CitizenFullLookupArbirator[] = [];
  getArbitratorsFullLookup() {
    if (this.requestId) this.citizenService.getArbitratorsFullLookup('', this.requestId).subscribe(res => {
      if (res.data)
        this.citizens = res.data;
    })
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
      this.toastrNotificationService.showError(`يجب اختيار ${this.litigationRequestForReportDto?.listCount} أعضاء هيئة المحكمين`)
      return;
    }

    this._determinearbitratorperiodService.AddLitigationRequestArbitratorsNominationList({
      requestId: this.litigationRequestForReportDto?.litigationRequestShortDto?.id,
      arbitrators: this.selectedCitizens
    } as ArbitratorNominationListRequestPayload).subscribe(result => {
      if (result.isDone) {
        this.litigationRequestForReportDto = result.data as LitigationRequestForAllArbitratorNominationListDto;
        this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
      }
    })
  }

}
