import { Component, inject, Inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { ArbitratorCountDetailsService } from '../../services/Arbitrator-count-details/arbitrator-count-details.service';
import { GetArbitratorsCountByRequestIdResponseDto } from '../../models/get-arbitrators-count-by-request-id-response-dto.model';
import { BaseResponse } from '@app/core/models/base-response';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { AddArbitratorsCountRequestDto } from '../../models/add-arbitrators-count-request-dto.model';
import { ArbitratorCountResponseDto } from '../../models/arbitrator-count-response-dto.model';
import { ArbitrationService } from '../../services/arbitration.service';
@Component({
  selector: 'app-approve-arbitration-fees-paid-details',
  templateUrl: './approve-arbitration-fees-paid-details.component.html',
  styleUrls: ['./approve-arbitration-fees-paid-details.component.scss']
})
export class ApproveArbitrationFeesPaidDetailsComponent extends BaseComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _formBuilder = inject(FormBuilder);
  private _modalService = inject(NgbModal);
  private _translateService = inject(TranslateService);
  private _breadcrumbService = inject(BreadcrumbService);
  private _toastrNotificationService = inject(ToastrNotificationService);
  private _arbitratorCountDetailsService = inject(ArbitratorCountDetailsService);
  private _arbitrationService = inject(ArbitrationService);


  private requestId: string = "";
  arbitratorsRequest!: GetArbitratorsCountByRequestIdResponseDto;
  dataList: LawsuitDetailsItem[] = [];
  firstParty: LawsuitDetailsItem[] = [];
  secondParty: LawsuitDetailsItem[] = [];

  showValidation: boolean = false
  approveArbitrationFeesPaidListURL: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.approveArbitrationFeesPaidList}/`
  countDropdown: ArbitratorCountResponseDto[] = []
  defendantCitizen: any;
  defendantFacility: any;
  arbitratorsCountByRequestId: any;

  ngOnInit(): void {
    this.updateBreadcrumb();
    this.observeActivatedRoute();
    this.getSysArbitratorCount();
  }

  private getSysArbitratorCount(): void {
    this._arbitratorCountDetailsService.GetSysArbitratorCount()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<ArbitratorCountResponseDto[]>) => {
        if (res.isDone && res.data) this.countDropdown = res.data
      })
  }
  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}` },
      { label: this._translateService.instant(this.translations.layout.sidebar.approveArbitrationFeesPaid), link: Configuration.pages.arbitration.approveArbitrationFeesPaidList },
      { label: this._translateService.instant(this.translations.arbitrator.approveArbitrationFeesPaidDetails) }
    ])
  };

  private observeActivatedRoute(): void {
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
      this.requestId = res['id'];
      if (this.requestId && this.requestId.length > 0) {
        this.GetArbitratorsCountByRequestId();
        this.requestId = this.requestId;
      }
    })
  };

  private GetArbitratorsCountByRequestId(): void {
    console.log("GetArbitratorsCountByRequestId");
    this._arbitratorCountDetailsService.GetLitigationRequestForAddArbitratorsCountByRequestId(this.requestId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<GetArbitratorsCountByRequestIdResponseDto>) => {
        if (res.isDone && res.data) {
          this.arbitratorsRequest = res.data;
          this.fillData()
          this.fillfirstPartyData()
          this.fillsecondPartyData()
        }
      })
  };



  // helper methods
  private fillData(): void {
    this.dataList = [
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.requestCode),
        value: this.arbitratorsRequest?.litigationRequestShortDto?.requestCode ?? '',
        isDownload: false,
      },
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.cityName),
        value: this.arbitratorsRequest?.litigationRequestShortDto?.cityName ?? '',
        isDownload: false,
      },
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.areaName),
        value: this.arbitratorsRequest?.litigationRequestShortDto?.areaName ?? '',
        isDownload: false,
      },

      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.contractAddress),
        value: this.arbitratorsRequest?.litigationRequestShortDto?.contractAddress ?? '',
        isDownload: false,
      },

      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.litigationRequestCategory),
        value: this.arbitratorsRequest?.litigationRequestShortDto?.litigationRequestCategory?.categoryName ?? '',
        isDownload: false,
      },
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.litigationRequestContractType),
        value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.litigationRequestContractType.typeName ?? '',
        isDownload: false,
      },

    ]

  }
  private fillfirstPartyData(): void {
    if (this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyFacility) {
      this.firstParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facilityCode),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyFacility.code ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facilityName),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyFacility.arabicFacilityName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.commercialRegisterNumber),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyFacility.commercialRegisterNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facility700Number),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyFacility.facility700Number ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.firstPartyCapacity),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
          isDownload: false,
        },
      ]
    }

    if (this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen) {

      this.firstParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translateService.instant(this.translations.arbitrator.fullName),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.fullName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.arbitrator.identityNumber),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.identityNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.arbitrator.workPhone),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.workTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.arbitrator.homePhone),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.homeTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/send-square.svg',
          title: this._translateService.instant(this.translations.arbitrator.fax),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.fax ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/location.svg',
          title: this._translateService.instant(this.translations.auth.email),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.email ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.auth.phoneNumber),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCitizen.mobile ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.firstPartyCapacity),
          value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
          isDownload: false,
        },
      ]
    }

  }
  private fillsecondPartyData(): void {
    // if (this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyFacility) {
    //   this.secondParty = [
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/user.svg',
    //       title: this._translateService.instant(this.translations.LitigationRequest.facilityCode),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/buliding.svg',
    //       title: this._translateService.instant(this.translations.LitigationRequest.facilityName),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/call.svg',
    //       title: this._translateService.instant(this.translations.LitigationRequest.commercialRegisterNumber),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/call.svg',
    //       title: this._translateService.instant(this.translations.LitigationRequest.facility700Number),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/call.svg',
    //       title: this._translateService.instant(this.translations.LitigationRequest.secondPartyCapacity),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
    //       isDownload: false,
    //     },
    //   ]
    // }

    // if (this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen) {

    //   this.secondParty = [
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/user.svg',
    //       title: this._translateService.instant(this.translations.arbitrator.fullName),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/buliding.svg',
    //       title: this._translateService.instant(this.translations.arbitrator.identityNumber),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/call.svg',
    //       title: this._translateService.instant(this.translations.arbitrator.workPhone),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/call.svg',
    //       title: this._translateService.instant(this.translations.arbitrator.homePhone),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/send-square.svg',
    //       title: this._translateService.instant(this.translations.arbitrator.fax),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/location.svg',
    //       title: this._translateService.instant(this.translations.auth.email),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/buliding.svg',
    //       title: this._translateService.instant(this.translations.auth.phoneNumber),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
    //       isDownload: false,
    //     },
    //     {
    //       icon: 'assets/images/icons/lawsuit-details/call.svg',
    //       title: this._translateService.instant(this.translations.LitigationRequest.secondPartyCapacity),
    //       value: this.arbitratorsRequest?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
    //       isDownload: false,
    //     },
    //   ]
    // }

    this.defendantCitizen = this.arbitratorsRequest?.litigationRequestShortDto?.defendantCitizen;
        this.defendantFacility = this.arbitratorsRequest?.litigationRequestShortDto?.defendantFacility;

        if (this.defendantFacility) {
            this.secondParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translateService.instant(this.translations.LitigationRequest.facilityCode),
                    value: this.defendantFacility?.code ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translateService.instant(this.translations.LitigationRequest.facilityName),
                    value: this.defendantFacility?.arabicFacilityName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translateService.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                    value: this.defendantFacility?.commercialRegisterNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translateService.instant(this.translations.LitigationRequest.facility700Number),
                    value: this.defendantFacility?.facility700Number ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translateService.instant(this.translations.LitigationRequest.secondPartyCapacity),
                    value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

        if (this.defendantCitizen) {

            this.secondParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translateService.instant(this.translations.arbitrator.fullName),
                    value: this.defendantCitizen?.fullName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translateService.instant(this.translations.arbitrator.identityNumber),
                    value: this.defendantCitizen?.identityNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translateService.instant(this.translations.arbitrator.workPhone),
                    value: this.defendantCitizen?.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translateService.instant(this.translations.arbitrator.homePhone),
                    value: this.defendantCitizen?.homeTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                    title: this._translateService.instant(this.translations.arbitrator.fax),
                    value: this.defendantCitizen?.fax ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/location.svg',
                    title: this._translateService.instant(this.translations.auth.email),
                    value: this.defendantCitizen?.email ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translateService.instant(this.translations.auth.phoneNumber),
                    value: this.defendantCitizen?.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translateService.instant(this.translations.LitigationRequest.secondPartyCapacity),
                    value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }


  }

  ApprovePayment(modal: any) {
    this._arbitrationService.ApproveArbitrationFeesPaid(this.requestId).subscribe(res => {
      if (res.isDone) {
        modal.dismiss()
        this._toastrNotificationService.showSuccess(this._translateService.instant(this.translations.general.successfullySave))
        this.navigateToList()
      } else {
        this._toastrNotificationService.showError(res.message)
      }
    })
  }

  public open(content: TemplateRef<any>): void {
    this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
  }
  private dismissModal(): void {
    this._modalService.dismissAll()
  };

  private showSuccess(msg: string): void {
    this._toastrNotificationService.showSuccess(msg)
  };
  private navigateToList(): void {
    this._router.navigate([this.approveArbitrationFeesPaidListURL])
  }
}
