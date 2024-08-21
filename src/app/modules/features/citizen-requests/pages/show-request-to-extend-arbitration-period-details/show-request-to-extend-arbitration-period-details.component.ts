import { Component, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestForExtendPeriodRequestDto } from '../../models/litigation-request-for-extend-period-request-dto';
import { LitigationRequestExtendPeriodRequestCreateUpdateEmployeeDto, LitigationRequestExtendPeriodRequestStatus } from '../../models/litigation-request-extend-period-request-create-update-employee-dto';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { RequestToExtendArbitrationPeridService } from '../../services/request-to-extend-arbitration-perid.service';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { environment } from '@environment/environment';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-show-request-to-extend-arbitration-period-details',
  templateUrl: './show-request-to-extend-arbitration-period-details.component.html',
  styleUrl: './show-request-to-extend-arbitration-period-details.component.scss'
})
export class ShowRequestToExtendArbitrationPeriodDetailsComponent extends BaseComponent implements OnInit {
  litigationRequestForReportDto?: LitigationRequestForExtendPeriodRequestDto
  litigationRequestExtendPeriodRequestCreateUpdateEmployee = {} as LitigationRequestExtendPeriodRequestCreateUpdateEmployeeDto
  requestId?: string;
  litigationRequestExtendPeriodRequestStatus = LitigationRequestExtendPeriodRequestStatus;
  constructor(private activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
    private _requestToExtendArbitrationPeridService: RequestToExtendArbitrationPeridService,
    private toastrNotificationService: ToastrNotificationService,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _breadcrumbService: BreadcrumbService,
    private _activatedRoute: ActivatedRoute
  ) {
    super();
  }
  baseUrl = `${environment.baseURL}/`;
  showValidation: boolean = false;
  form = this._formBuilder.group({
    finishStatusReason: [''],
  });

  get controls() {
    return this.form.controls
  }

  ngOnInit() {
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
      this.requestId = res['id']
      if (this.requestId) {
        this.getLitigationRequestForSession(this.requestId);
      }
    })
    this.updateBreadcrumb();
  }
  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translate.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translate.instant(this.translations.layout.sidebar.requestToExtendArbitrationPeriodList), link: Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodList },
      { label: this._translate.instant(this.translations.layout.sidebar.details) },
    ])
  };
  getLitigationRequestForSession(requestId: string) {
    this._requestToExtendArbitrationPeridService.getLitigationRequestExtendPeriodForEmployeeByRequestId(requestId).subscribe(res => {
       
      this.litigationRequestForReportDto = res as LitigationRequestForExtendPeriodRequestDto;
      this.fillData()
      this.fillfirstPartyData()
      this.fillsecondPartyData()
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

  open(content: TemplateRef<any>) {
    this.modalService.open(content)
  }

  addArbitrationExtendPeriodForEmployee(modal: any, litigationRequestExtendPeriodRequestStatus: LitigationRequestExtendPeriodRequestStatus) {
    if (litigationRequestExtendPeriodRequestStatus == this.litigationRequestExtendPeriodRequestStatus.Reject) {
      this.litigationRequestExtendPeriodRequestCreateUpdateEmployee.finishStatusReason = this.form.controls.finishStatusReason.value as string;
      if (!this.litigationRequestExtendPeriodRequestCreateUpdateEmployee.finishStatusReason) {
        this.showValidation = true;
        return;
      }
    }
    this.litigationRequestExtendPeriodRequestCreateUpdateEmployee.litigationRequestId = this.requestId as string;
    this.litigationRequestExtendPeriodRequestCreateUpdateEmployee.litigationRequestExtendPeriodRequestStatusId=litigationRequestExtendPeriodRequestStatus;
    // console.log(this.litigationRequestExtendPeriodRequestCreateUpdateEmployee);
    
    this._requestToExtendArbitrationPeridService.addArbitrationExtendPeriodForEmployee(this.litigationRequestExtendPeriodRequestCreateUpdateEmployee as LitigationRequestExtendPeriodRequestCreateUpdateEmployeeDto).subscribe(result => {
       
      if (result) {
        this.litigationRequestForReportDto = result as LitigationRequestForExtendPeriodRequestDto;
        this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
        modal.dismiss()
      }
    })
  }
}
