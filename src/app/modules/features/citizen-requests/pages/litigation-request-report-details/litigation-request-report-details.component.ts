import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { TranslateService } from '@ngx-translate/core';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { LitigationRequestForReportDto } from '../../models/litigation-request-for-extend-period-request-dto';
import { CitizenShortDto } from '../../models/citizen-request.model';
import { takeUntil } from 'rxjs';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { FacilityShortDto } from '@app/modules/features/arbitration/models/arbitration-request.model';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-litigation-request-report-details',
  templateUrl: './litigation-request-report-details.component.html',
  styleUrl: './litigation-request-report-details.component.scss'
})
export class LitigationRequestReportDetailsComponent extends BaseComponent implements OnInit {

  plaintiffDelegatorData: any;
  defendantDelegatorData: any;

  litigationRequestForReportDto: LitigationRequestForReportDto | undefined;

  @ViewChild('reconciliationWasMadePdfContent', { read: ElementRef }) reconciliationWasMadeRef!: ElementRef;
  @ViewChild('reconciliationWasNotMadePdfContent', { read: ElementRef }) reconciliationWasNotMadeRef!: ElementRef;
  @ViewChild('waiverOfRightPdfContent', { read: ElementRef }) waiverOfRightRef!: ElementRef;
  @ViewChild('waiverOfTheLitigationPdfContent', { read: ElementRef }) waiverOfTheLitigationRef!: ElementRef;
  @ViewChild('reconciliationOnTradyPlatformPdfContent', { read: ElementRef }) reconciliationOnTradyPlatformRef!: ElementRef;

  defendantCitizen: CitizenShortDto | undefined;
  defendantFacility: FacilityShortDto | null | undefined;

  constructor(
    private _translate: TranslateService,
    private _litigationRequestService: LitigationRequestService,
    private _activatedRoute: ActivatedRoute,
    private _breadcrumbService: BreadcrumbService,
  ) {
    super();
  }

  ngOnInit() {
    this.setBreadcrumb();
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
      if (res['id']) {
        this.getLitigationRequestForReport(res['id']);
      }
    });
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      {
        label: this._translate.instant(this.translations.layout.sidebar.home),
        link: `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerassigningrequestforall}`
      },
      {
        label: this._translate.instant(this.translations.layout.sidebar.litigationRequestReportList),
        link: `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.litigationRequestReportList}`
      },
      {
        label: this._translate.instant(this.translations.reformer.litigationRequestReportDetails),
      }
    ])
  }

  getLitigationRequestForReport(requestId: string) {
    this._litigationRequestService.getLitigationRequestForReportByRequestId(requestId).subscribe(response => {
      this.litigationRequestForReportDto = response.data;
      if (this.litigationRequestForReportDto?.litigationRequestShortDto) {
        this.fillData();
        this.fillfirstPartyData();
        this.fillsecondPartyData();
      }
    })
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
        value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.litigationRequestContractType?.typeName ?? '',
        isDownload: false,
      },
    ]
  }

  fillfirstPartyData() {
    if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.firstPartyFacility) {
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

    if (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.firstPartyCitizen) {
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
    this.defendantFacility = this.litigationRequestForReportDto?.litigationRequestShortDto?.defendantFacility;
    this.defendantCitizen = this.litigationRequestForReportDto?.litigationRequestShortDto?.defendantCitizen
      ?? (this.defendantFacility ? (this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.secondPartyCitizen ?? undefined) : undefined);

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
      value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.secondPartyCapacity ?? '',
      isDownload: false,
    });
  }

  downloadPDF() {
    const status = this.litigationRequestForReportDto?.report?.reconciliationRequestDecisionStatus ?? this.litigationRequestForReportDto?.litigationRequestShortDto?.internalStatus?.id;

    let elementToExport: HTMLElement | null = null;

    const getByRefOrId = (ref: ElementRef | undefined, id: string) => {
      if (ref && (ref as any)?.nativeElement) return (ref as any).nativeElement as HTMLElement;
      const el = document.getElementById(id);
      return el;
    };

    switch (Number(status)) {
      case 18:
        elementToExport = getByRefOrId(this.reconciliationWasMadeRef, 'reconciliationWasMadePdfContent');
        break;
      case 9:
      case 19:
        elementToExport = getByRefOrId(this.reconciliationWasNotMadeRef, 'reconciliationWasNotMadePdfContent');
        break;
      case 7:
        elementToExport = getByRefOrId(this.waiverOfRightRef, 'waiverOfRightPdfContent');
        break;
      case 8:
        elementToExport = getByRefOrId(this.waiverOfTheLitigationRef, 'waiverOfTheLitigationPdfContent');
        break;
      case 25:
        elementToExport = getByRefOrId(this.reconciliationOnTradyPlatformRef, 'reconciliationOnTradyPlatformPdfContent');
        break;
      default:
        elementToExport = getByRefOrId(this.reconciliationWasMadeRef, 'reconciliationWasMadePdfContent');
        break;
    }

    if (!elementToExport) {
      return;
    }

    const clonedElement = elementToExport.cloneNode(true) as HTMLElement;
    clonedElement.style.setProperty('display', 'block');
    const fileName = "محضر الصلح الخاص برقم دعوه " + (this.litigationRequestForReportDto?.litigationRequestShortDto?.requestCode ?? '');
    const options = {
      margin: [10, 10, 10, 10],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: {
        mode: 'css',
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: '.avoid-break'
      }
    };

    html2pdf()
      .from(clonedElement)
      .set(options)
      .save();
  }
}
