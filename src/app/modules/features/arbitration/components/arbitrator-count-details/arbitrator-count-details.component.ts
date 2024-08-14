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

@Component({
  selector: 'app-arbitrator-count-details',
  templateUrl: './arbitrator-count-details.component.html',
  styleUrl: './arbitrator-count-details.component.scss'
})
export class ArbitratorCountDetailsComponent extends BaseComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _formBuilder = inject(FormBuilder);
  private _modalService = inject(NgbModal);
  private _translateService = inject(TranslateService);
  private _breadcrumbService = inject(BreadcrumbService);
  private _toastrNotificationService = inject(ToastrNotificationService);
  private _arbitratorCountDetailsService = inject(ArbitratorCountDetailsService);


  private requestId: string = "";
  arbitratorsCountByRequestId!: GetArbitratorsCountByRequestIdResponseDto;
  dataList: LawsuitDetailsItem[] = [];
  firstParty: LawsuitDetailsItem[] = [];
  secondParty: LawsuitDetailsItem[] = [];

  addArbitratoCount = this._formBuilder.group({
    requestId: ["", Validators.required],
    arbitratorCount: this._formBuilder.control<string|null>(null, Validators.required)
  })
  // getter
  get controls() {
    return this.addArbitratoCount.controls
  }
  showValidation: boolean = false
  arbitratorCountListURL: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.arbitratorCountList}/`
  countDropdown: ArbitratorCountResponseDto[] = []

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
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorCount), link: Configuration.pages.arbitration.arbitratorCountList },
      { label: this._translateService.instant(this.translations.arbitrator.arbitratorCountDetails) }
    ])
  };

  private observeActivatedRoute(): void {
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
      this.requestId = res['id'];
      if (this.requestId && this.requestId.length > 0) {
        this.GetArbitratorsCountByRequestId();
        this.controls.requestId.setValue(this.requestId);
      }
    })
  };

  private GetArbitratorsCountByRequestId(): void {
    console.log("GetArbitratorsCountByRequestId");
    this._arbitratorCountDetailsService.GetLitigationRequestForAddArbitratorsCountByRequestId(this.requestId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<GetArbitratorsCountByRequestIdResponseDto>) => {
        if (res.isDone && res.data) {
          this.arbitratorsCountByRequestId = res.data;
          this.fillData()
          this.fillfirstPartyData()
          this.fillsecondPartyData()
        }
      })
  };



  public onClickSave(): void {
    if (this.addArbitratoCount.valid) {
      this.showValidation = false
      this._arbitratorCountDetailsService.AddArbitratorsCount(this.addArbitratoCount.value as AddArbitratorsCountRequestDto)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: BaseResponse<any>) => {
          if (res.isDone) {
            this.showSuccess(this._translateService.instant(this.translations.arbitrator.arbitratorsCountAddedSuccessfully));
            this.dismissModal();
            this.navigateToList();
          };
        });
    } else {
      this.showValidation = true
    };
  }
  // helper methods
  private fillData(): void {
    this.dataList = [
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.requestCode),
        value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.requestCode ?? '',
        isDownload: false,
      },
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.cityName),
        value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.cityName ?? '',
        isDownload: false,
      },
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.areaName),
        value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.areaName ?? '',
        isDownload: false,
      },

      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.contractAddress),
        value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contractAddress ?? '',
        isDownload: false,
      },

      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.litigationRequestCategory),
        value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.litigationRequestCategory?.categoryName ?? '',
        isDownload: false,
      },
      {
        icon: 'assets/images/icons/lawsuit-details/user.svg',
        title: this._translateService.instant(this.translations.LitigationRequest.litigationRequestContractType),
        value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.litigationRequestContractType.typeName ?? '',
        isDownload: false,
      },

    ]

  }
  private fillfirstPartyData(): void {
    if (this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyFacility) {
      this.firstParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facilityCode),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyFacility.code ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facilityName),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyFacility.arabicFacilityName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.commercialRegisterNumber),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyFacility.commercialRegisterNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facility700Number),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyFacility.facility700Number ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.firstPartyCapacity),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
          isDownload: false,
        },
      ]
    }

    if (this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen) {

      this.firstParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translateService.instant(this.translations.arbitrator.fullName),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.fullName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.arbitrator.identityNumber),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.identityNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.arbitrator.workPhone),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.workTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.arbitrator.homePhone),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.homeTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/send-square.svg',
          title: this._translateService.instant(this.translations.arbitrator.fax),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.fax ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/location.svg',
          title: this._translateService.instant(this.translations.auth.email),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.email ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.auth.phoneNumber),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCitizen.mobile ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.firstPartyCapacity),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
          isDownload: false,
        },
      ]
    }

  }
  private fillsecondPartyData(): void {
    if (this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyFacility) {
      this.secondParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facilityCode),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facilityName),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.commercialRegisterNumber),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.LitigationRequest.facility700Number),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
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

    if (this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen) {

      this.secondParty = [
        {
          icon: 'assets/images/icons/lawsuit-details/user.svg',
          title: this._translateService.instant(this.translations.arbitrator.fullName),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.arbitrator.identityNumber),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.arbitrator.workPhone),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/call.svg',
          title: this._translateService.instant(this.translations.arbitrator.homePhone),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/send-square.svg',
          title: this._translateService.instant(this.translations.arbitrator.fax),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/location.svg',
          title: this._translateService.instant(this.translations.auth.email),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
          isDownload: false,
        },
        {
          icon: 'assets/images/icons/lawsuit-details/buliding.svg',
          title: this._translateService.instant(this.translations.auth.phoneNumber),
          value: this.arbitratorsCountByRequestId?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
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
    this._router.navigate([this.arbitratorCountListURL])
  }
}
