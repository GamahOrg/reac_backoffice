import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { ArbitrationReportDto, LitigationRequestForArbitrationReportDto } from '../../models/arbitration-request.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ArbitrationService } from '../../services/arbitration.service';
import { SysMeetingLocationService } from '../../services/sys-meeting-location.service';
import { SysMeetingLocationCreateUpdateDto } from '../../models/meeting-location.model';
import { takeUntil } from 'rxjs';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { FacilityShortDto } from '../../models/arbitration-request.model';
import { LoaderService } from '@app/core/services/loader/loader.service';
import jsPDF from 'jspdf';
import 'assets/fonts/Amiri-Regular-normal.js';
import { CitizenShortDto } from '@app/modules/features/citizen-requests/models/citizen-request.model';
import { environment } from '@environment/environment';
import { LitigationRequestForArbitrationReportCorrectionRequestDto } from '../../models/arbitration-report-correction-request-dto';
import { ArbitrationCorrectionRequestResponseDto } from '../../models/arbitration-correction-request-response-dto';

@Component({
    selector: 'app-arbitration-report-details',
    templateUrl: './arbitration-report-details.component.html',
    styleUrls: ['./arbitration-report-details.component.scss']
})
export class ArbitrationReportDetailsComponent extends BaseComponent implements OnInit {

    litigationRequestForReportDto: LitigationRequestForArbitrationReportDto | undefined;
    litigationRequestForCorrectionDto?: LitigationRequestForArbitrationReportCorrectionRequestDto;
    correctionResponse = {} as ArbitrationCorrectionRequestResponseDto;
    requestId?: string;
    baseUrl = `${environment.baseURL}/`;
    @ViewChild('pdfContent') pdfContent!: ElementRef;
    minDate!: string;
    maxDate!: string;
    meetingLocations: SysMeetingLocationCreateUpdateDto[] = [];
    defendantCitizen: CitizenShortDto | undefined;
    defendantFacility: FacilityShortDto | null | undefined;
    showValidation: boolean = false;
    isApproved: boolean | null = null;

    constructor(
        private _translate: TranslateService,
        private arbitrationService: ArbitrationService,
        private _formBuilder: FormBuilder,
        private modalService: NgbModal,
        private sysMeetingLocationService: SysMeetingLocationService,
        private toastrNotificationService: ToastrNotificationService,
        private _activatedRoute: ActivatedRoute,
        private _breadcrumbService: BreadcrumbService,
        private _loaderService: LoaderService
    ) {
        super();
    }

    correctionResponseForm = this._formBuilder.group({
        isApproved: this._formBuilder.control<boolean | null>(null, [Validators.required]),
        rejectionReason: this._formBuilder.control<string | null>(null),
        correctionDecision: this._formBuilder.control<string | null>(null),
    });

    get correctionResponseControls() {
        return this.correctionResponseForm.controls;
    }

    ngOnInit() {
        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            if (res['id']) {
                this.requestId = res['id'];
                this.getLitigationRequestForSession(res['id']);
                this.getArbitrationCorrectionRequestById(res['id']);
                this.reportForm.controls.id.setValue(res['id']);
            }
        });

        this.loadMeetingLocation();
        this.updateBreadcrumb();

        this.correctionResponseForm.controls.isApproved.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            this.isApproved = value;
            this.updateCorrectionValidators();
        });

        const today = new Date();
        this.minDate = today.toISOString().split('T')[0];
        this.reportForm.patchValue({
            judgmentDecisionDate: this.minDate
        });
        this.controls.judgmentDecisionDate.setValue(this.minDate);
        this.controls.judgmentDecisionDate.disable();
    }

    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            {
                label: this._translate.instant(this.translations.layout.sidebar.home),
                link: `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}`
            },
            {
                label: this._translate.instant(this.translations.layout.sidebar.arbitrationReportList),
                link: `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.arbitrationReportList}`
            },
            {
                label: this._translate.instant(this.translations.arbitrator.arbitrationReportRequestDetails),
            }
        ]);
    }

    getLitigationRequestForSession(requestId: string) {
        this.arbitrationService.getLitigationRequestForReport(requestId).subscribe(response => {
            this.litigationRequestForReportDto = response.data;
            this.fillData();
            this.fillfirstPartyData();
            this.fillsecondPartyData();
        });
    }

    getArbitrationCorrectionRequestById(requestId: string) {
        this.arbitrationService.getArbitrationReportCorrectionRequestByRequestId(requestId).subscribe(res => {
            this.litigationRequestForCorrectionDto = res as LitigationRequestForArbitrationReportCorrectionRequestDto;
        });
    }

    private updateCorrectionValidators(): void {
        if (this.isApproved === true) {
            this.correctionResponseForm.controls.correctionDecision.setValidators([Validators.required, Validators.maxLength(2500)]);
            this.correctionResponseForm.controls.rejectionReason.clearValidators();
            this.correctionResponseForm.controls.rejectionReason.setValue(null);
        } else if (this.isApproved === false) {
            this.correctionResponseForm.controls.rejectionReason.setValidators([Validators.required, Validators.maxLength(300)]);
            this.correctionResponseForm.controls.correctionDecision.clearValidators();
            this.correctionResponseForm.controls.correctionDecision.setValue(null);
        }
        this.correctionResponseForm.controls.correctionDecision.updateValueAndValidity();
        this.correctionResponseForm.controls.rejectionReason.updateValueAndValidity();
    }

    submitCorrectionResponse() {
        if (!this.correctionResponseForm.valid) {
            this.showValidation = true;
            return;
        }
        this.correctionResponse.id = this.litigationRequestForCorrectionDto?.correctionRequests?.[0]?.id as string;
        this.correctionResponse.litigationRequestId = this.requestId as string;
        this.correctionResponse.response = this.correctionResponseForm.controls.isApproved.value === true ? 1 : 2;

        if (this.correctionResponse.response === 1) {
            this.correctionResponse.correctionDecisionText = this.correctionResponseForm.controls.correctionDecision.value as string;
        } else {
            this.correctionResponse.rejectReason = this.correctionResponseForm.controls.rejectionReason.value as string;
        }

        this.arbitrationService.addArbitrationCorrectionRequestResponse(
            this.correctionResponse as ArbitrationCorrectionRequestResponseDto
        ).subscribe(result => {
            if (result && result.isDone) {
                this.litigationRequestForCorrectionDto = result.data as LitigationRequestForArbitrationReportCorrectionRequestDto;
                this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave));
            }
        });
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
        ];
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
            ];
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
            ];
        }
    }

    fillsecondPartyData() {
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
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ];
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
                    value: this.litigationRequestForReportDto?.litigationRequestShortDto?.contract?.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ];
        }
    }

    reportForm = this._formBuilder.group({
        id: ['00000000-0000-0000-0000-000000000000'],
        facts: new FormControl<string | null>(null, [Validators.required]),
        reasons: new FormControl<string | null>(null, [Validators.required]),
        judgmentDecisionDate: new FormControl<string | null>(null, [Validators.required]),
        judgmentDecisionPlace: new FormControl<string | null>(null, [Validators.required]),
        judgmentDecisionText: new FormControl<string | null>(null, [Validators.required]),
        modificationRequest: new FormControl<string | null>(''),
        meetingLocationId: new FormControl<string | null>(null, [Validators.required]),
    });

    get controls() {
        return this.reportForm.controls;
    }

    loadMeetingLocation() {
        this.sysMeetingLocationService.getMeetingLocations().subscribe(data => {
            if (data.data)
                this.meetingLocations = data.data;
        });
    }

    arbitrationReportDto: ArbitrationReportDto = {
        requestId: '',
        facts: '',
        reasons: '',
        judgmentDecisionDate: '',
        judgmentDecisionPlace: '',
        judgmentDecisionText: '',
        modificationRequest: '',
        meetingLocationId: '',
    } as ArbitrationReportDto;

    onSave() {
        this.reportForm.markAllAsTouched();
        if (this.reportForm.valid) {
            this.arbitrationReportDto.requestId = this.litigationRequestForReportDto?.litigationRequestShortDto?.id!;
            this.arbitrationReportDto.modificationRequest = this.controls.modificationRequest.value!;

            this.arbitrationService.addArbitrationReport(this.reportForm.value as ArbitrationReportDto).subscribe(result => {
                if (result.isDone) {
                    this.litigationRequestForReportDto = result.data;
                    this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave));
                }
            });
        }
    }

    open(content: TemplateRef<any>) {
        this.modalService.open(content, { centered: true });
    }

    async downloadPDF() {
        this._loaderService.showLoader.next(true);

        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true,
            });

            const pageWidth = 210;
            const pageHeight = 297;
            const margin = 15;
            const footerHeight = 15;
            pdf.setFont('Amiri-Regular', 'normal');

            let yPosition = margin;
            let currentPage = 1;

            const styles = {
                intro: {
                    fontSize: 11,
                    lineHeight: 8,
                    paragraphSpacing: 12,
                    textColor: [0, 0, 0] as [number, number, number],
                    firstLineIndent: 0
                },
                sectionTitle: {
                    fontSize: 13,
                    color: [0, 82, 87] as [number, number, number],
                    marginTop: 18,
                    marginBottom: 12,
                    underlineHeight: 0.5
                },
                sectionContent: {
                    fontSize: 11,
                    lineHeight: 7.5,
                    paragraphSpacing: 10,
                    textColor: [40, 40, 40] as [number, number, number],
                    firstLineIndent: 15
                },
                contentMargin: {
                    right: margin + 2,
                    left: margin - 25
                }
            };

            const effectiveWidth = pageWidth - styles.contentMargin.right - styles.contentMargin.left;

            const checkNewPage = (requiredSpace: number = 10) => {
                if (yPosition + requiredSpace > pageHeight - margin - footerHeight) {
                    pdf.addPage();
                    currentPage++;
                    yPosition = margin;
                    return true;
                }
                return false;
            };

            const addSectionTitle = (title: string): void => {
                checkNewPage(25);
                yPosition += styles.sectionTitle.marginTop;

                pdf.setDrawColor(0, 82, 87);
                pdf.setLineWidth(0.3);
                pdf.line(styles.contentMargin.left, yPosition - 5, pageWidth - styles.contentMargin.right, yPosition - 5);

                pdf.setFontSize(styles.sectionTitle.fontSize);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(...styles.sectionTitle.color);
                pdf.text(title, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });

                const titleWidth = pdf.getTextWidth(title);
                pdf.setLineWidth(styles.sectionTitle.underlineHeight);
                pdf.line(
                    pageWidth - styles.contentMargin.right - titleWidth - 5,
                    yPosition + 2,
                    pageWidth - styles.contentMargin.right,
                    yPosition + 2
                );

                yPosition += styles.sectionTitle.marginBottom;
            };

            const addFormattedContent = (text: string, isIntro: boolean = false): void => {
                const style = isIntro ? styles.intro : styles.sectionContent;
                const paragraphs = text.split('\n').filter(p => p.trim().length > 0);

                pdf.setFontSize(style.fontSize);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(...style.textColor);

                paragraphs.forEach((paragraph, index) => {
                    checkNewPage(20);
                    const firstLineIndent = !isIntro && index > 0 ? style.firstLineIndent : 0;
                    const textWidth = effectiveWidth - firstLineIndent + 8;
                    const lines = pdf.splitTextToSize(paragraph.trim(), textWidth);

                    lines.forEach((line: string, lineIndex: number) => {
                        checkNewPage(style.lineHeight + 2);
                        const indent = (lineIndex === 0 && firstLineIndent > 0) ? firstLineIndent : 0;

                        if (indent > 0) {
                            pdf.text(line, pageWidth - styles.contentMargin.right - indent, yPosition, { align: 'right' });
                        } else {
                            pdf.text(line, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
                        }
                        yPosition += style.lineHeight;
                    });

                    if (index < paragraphs.length - 1) {
                        yPosition += style.paragraphSpacing;
                    }
                });
            };

            // Add header/logo
            try {
                const logoResponse = await fetch('assets/images/logo-2.png');
                const logoBlob = await logoResponse.blob();
                const logoBase64 = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(logoBlob);
                });

                const logoWidth = 100;
                const logoHeight = 20;
                const logoX = (pageWidth - logoWidth) / 2;
                pdf.addImage(logoBase64, 'PNG', logoX, yPosition, logoWidth, logoHeight);
                yPosition += logoHeight + 10;
            } catch (error) {
                yPosition += 20;
            }

            // Title
            checkNewPage(15);
            pdf.setFontSize(16);
            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(0, 82, 87);
            pdf.text('\u0646\u0645\u0648\u0630\u062C \u062D\u0643\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 15;

            // Arbitration details table
            checkNewPage(60);
            yPosition = this.addArbitrationDetailsTable(pdf, yPosition, pageWidth, margin);
            yPosition += 15;

            pdf.text(' \u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', pageWidth / 2, yPosition, { align: 'center' });
            checkNewPage(15);
            yPosition = this.addPartiesTable(pdf, yPosition, pageWidth, margin);
            yPosition += 20;

            // Introduction
            checkNewPage(45);
            pdf.setFillColor(245, 248, 250);
            pdf.setDrawColor(0, 82, 87);
            pdf.setLineWidth(0.5);
            pdf.roundedRect(styles.contentMargin.left + 15, yPosition, effectiveWidth, 50, 2, 2, 'FD');
            yPosition += 8;

            const intro = ':\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647 \u0631\u0628 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0646\u060C \u0648\u0627\u0644\u0635\u0644\u0627\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u0649 \u0646\u0628\u064A\u0646\u0627 \u0645\u062D\u0645\u062F \u0648\u0622\u0644\u0647 \u0648\u0635\u062D\u0628\u0647\u060C \u0648\u0628\u0639\u062F \n\u0628\u0646\u0627\u0621 \u0639\u0644\u0649 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0635\u0627\u062F\u0631 \u0628\u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0627\u0644\u0645\u0644\u0643\u064A \u0627\u0644\u0643\u0631\u064A\u0645 \u0631\u0642\u0645 \u0645/\u0663\u0664 \u0648\u062A\u0627\u0631\u064A\u062E \u0662\u0664/\u0665/\u0661\u0664\u0663\u0663 \u0647\u0640\u060C \u0648\u0644\u0627\u0626\u062D\u062A\u0647 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629\u060C \u0648\u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u062A\u0641\u0627\u0642 \u0627\u0644\u0623\u0637\u0631\u0627\u0641 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0648\u0641\u0642 \u0646\u0638\u0627\u0645 \u0648\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0644\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A \u060C \u0641\u0625\u0646 \u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u062A\u0635\u062F\u0631 \u062D\u0643\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0646\u062D\u0648 \u0627\u0644\u062A\u0627\u0644\u064A ';
            addFormattedContent(intro, true);
            yPosition += 10;

            // Facts
            if (this.litigationRequestForReportDto?.report?.facts) {
                addSectionTitle('\u0623\u0648\u0644\u0627\u064B: \u0627\u0644\u0648\u0642\u0627\u0626\u0639');
                addFormattedContent(this.litigationRequestForReportDto.report.facts);
            }

            // Reasons
            if (this.litigationRequestForReportDto?.report?.reasons) {
                addSectionTitle('\u062B\u0627\u0646\u064A\u0627\u064B: \u0627\u0644\u0623\u0633\u0628\u0627\u0628');
                addFormattedContent(this.litigationRequestForReportDto.report.reasons);
            }

            // Judgment
            if (this.litigationRequestForReportDto?.report?.judgmentDecisionText) {
                addSectionTitle('\u062B\u0627\u0644\u062B\u0627\u064B: \u0645\u0646\u0637\u0648\u0642 \u0627\u0644\u062D\u0643\u0645');
                checkNewPage(30);
                yPosition += 3;
                addFormattedContent(this.litigationRequestForReportDto.report.judgmentDecisionText, false);
                yPosition += 8;
            }

            // Signature section
            yPosition += 20;
            checkNewPage(50);

            pdf.setFontSize(10);
            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(100, 100, 100);

            const closingText = '\u062D\u0631\u0631\u062A \u0647\u0630\u0647 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u0645\u0646 \u0664 \u0646\u0633\u062E \u0627\u0633\u0644\u062A\u0645 \u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0646\u0632\u0627\u0639 \u0648\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0648\u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0631\u0627\u0628\u0639\u0629 \u062A\u0648\u062F\u0639 \u0644\u062F\u0649  \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0644\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A';
            const closingLines = pdf.splitTextToSize(closingText, effectiveWidth);
            pdf.text(closingLines, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
            yPosition += 15;

            pdf.setDrawColor(0, 82, 87);
            pdf.setLineWidth(0.3);
            const sigWidth = 80;
            pdf.line(pageWidth - styles.contentMargin.right - sigWidth, yPosition, pageWidth - styles.contentMargin.right, yPosition);
            yPosition += 26;

            pdf.setFontSize(12);
            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(0, 82, 87);
            pdf.text(' :\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 ', pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
            yPosition += 12;

            const columnWidth = effectiveWidth / 2;
            pdf.setFontSize(11);
            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(4, 164, 136);
            const arbitratorName = this.litigationRequestForReportDto?.report?.arbitratorCitizenName || '';
            const arbitratorText = `\u0627\u0644\u0645\u062D\u0643\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A/ ${arbitratorName}`;
            pdf.text(arbitratorText, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });

            pdf.text('\u0627\u0644\u062A\u0648\u0642\u064A\u0639/', pageWidth - styles.contentMargin.right - columnWidth, yPosition, { align: 'right' });
            yPosition += 12;

            const signatureFile = this.litigationRequestForReportDto?.litigationRequestShortDto?.arbitratorCitizen?.signtureFile;
            if (signatureFile) {
                try {
                    const signatureBase64 = `data:image/jpeg;base64,${signatureFile}`;
                    const signatureWidth = 30;
                    const signatureHeight = 30;
                    const signatureX = pageWidth - styles.contentMargin.right - columnWidth - signatureWidth;
                    pdf.addImage(signatureBase64, 'JPEG', signatureX, yPosition, signatureWidth, signatureHeight);
                    yPosition += signatureHeight + 5;
                } catch (error) {
                    pdf.setFont('Amiri-Regular', 'normal');
                    pdf.setTextColor(0, 0, 0);
                    pdf.text(arbitratorName, pageWidth - styles.contentMargin.right - columnWidth, yPosition, { align: 'right' });
                    yPosition += 10;
                }
            }

            // Page numbers
            const totalPages = pdf.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                this.addPageFooter(pdf, i, totalPages, pageWidth, pageHeight, margin);
            }

            const fileName = this.generateFileName();
            pdf.save(fileName);
        } catch (error) {
            console.error('Error generating Arabic PDF:', error);
        } finally {
            this._loaderService.showLoader.next(false);
        }
    }

    private addArbitrationDetailsTable(pdf: jsPDF, startY: number, pageWidth: number, margin: number): number {
        const data = this.litigationRequestForReportDto;
        const tableWidth = pageWidth - (2 * margin);
        const labelColWidth = 60;
        const valueColWidth = tableWidth - labelColWidth;
        const rowHeight = 12;
        const cellPadding = 3;
        let currentY = startY;

        pdf.setFillColor(0, 82, 87);
        pdf.rect(margin, currentY, tableWidth, rowHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.setFont('Amiri-Regular', 'normal');
        pdf.text(
            ` (${data?.litigationRequestShortDto?.requestCode || ''}) :\u062D\u0643\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0641\u064A \u0627\u0644\u062F\u0639\u0648\u0649 \u0627\u0644\u0645\u0642\u064A\u062F\u0629 \u0628\u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0644\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A \u0631\u0642\u0645`,
            pageWidth / 2,
            currentY + rowHeight / 2 + 2,
            { align: 'center' }
        );
        currentY += rowHeight;

        const rows = [
            { label: ':\u0645\u0643\u0627\u0646 \u0627\u0646\u0639\u0642\u0627\u062F \u0627\u0644\u062C\u0644\u0633\u0629', value: data?.report?.judgmentDecisionPlace || '', isMultiLine: false },
            {
                label: ':\u062A\u0627\u0631\u064A\u062E \u0645\u0646\u0637\u0648\u0642 \u0627\u0644\u062D\u0643\u0645',
                value: data?.report?.judgmentDate
                    ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', calendar: 'gregory' })
                        .format(new Date(data.report.judgmentDate)).replace(/\//g, ' - ')
                    : '',
                isMultiLine: false
            },
            {
                label: ':\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u064A\u0645\u062B\u0644\u0647\u0627',
                value: [
                    `\u0627\u0644\u0645\u062D\u0643\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.fullName || ''}`,
                    `\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.mobile || ''}`,
                    `\u0627\u0644\u0645\u062F\u064A\u0646\u0629/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.city?.cityName || ''}`,
                ],
                isMultiLine: true
            },
            { label: ':\u0646\u0648\u0639 \u0627\u0644\u0646\u0632\u0627\u0639', value: data?.litigationRequestShortDto?.isFinanciallitigation ? '\u0645\u0627\u0644\u064A' : '\u063A\u064A\u0631 \u0645\u0627\u0644\u064A', isMultiLine: false },
            { label: ':\u0627\u062A\u0639\u0627\u0628 \u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', value: `\u0645\u0628\u0644\u063A )${data?.litigationRequestShortDto?.litigationRequestAmount?.fees || 0}( \u0631\u064A\u0627\u0644`, isMultiLine: false }
        ];

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);

        rows.forEach((row, index) => {
            let currentRowHeight = rowHeight;
            if (row.isMultiLine && Array.isArray(row.value)) {
                currentRowHeight = rowHeight + (row.value.length - 1) * 6;
            }

            pdf.setFillColor(242, 242, 242);
            pdf.rect(margin + valueColWidth, currentY, labelColWidth, currentRowHeight, 'FD');
            pdf.rect(margin, currentY, valueColWidth, currentRowHeight, 'D');

            pdf.setFont('Amiri-Regular', 'normal');
            pdf.text(row.label, margin + valueColWidth + labelColWidth - cellPadding, currentY + cellPadding + 4, { align: 'right' });

            if (row.isMultiLine && Array.isArray(row.value)) {
                let textY = currentY + cellPadding + 4;
                row.value.forEach(line => {
                    pdf.text(line, margin + valueColWidth - cellPadding, textY, { align: 'right', maxWidth: valueColWidth - (2 * cellPadding) });
                    textY += 6;
                });
            } else {
                const valueText = row.value as string;
                const lines = pdf.splitTextToSize(valueText, valueColWidth - (2 * cellPadding));
                pdf.text(lines, margin + valueColWidth - cellPadding, currentY + cellPadding + 4, { align: 'right' });
            }

            currentY += currentRowHeight;
        });

        return currentY;
    }

    private addPartiesTable(pdf: jsPDF, startY: number, pageWidth: number, margin: number): number {
        const data = this.litigationRequestForReportDto;
        let currentY = startY + 10;
        const tableWidth = pageWidth - (2 * margin);
        const rowHeight = 14;
        const cellPadding = 2;

        const columns = [
            { label: '\u0631\u0642\u0645 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0627\u0644\u0643\u062A\u0631\u0648\u0646\u064A', width: 0.15 },
            { label: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641', width: 0.15 },
            { label: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646', width: 0.13 },
            { label: '\u0627\u0644\u0635\u0641\u0629', width: 0.10 },
            { label: '\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629', width: 0.15 },
            { label: '\u0646\u0648\u0639 \u0627\u0644\u0647\u0648\u064A\u0629', width: 0.12 },
            { label: '\u0627\u0644\u0627\u0633\u0645', width: 0.20 }
        ];

        const colWidths = columns.map(col => col.width * tableWidth);

        pdf.setFillColor(0, 82, 87);
        pdf.rect(margin, currentY, tableWidth, rowHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont('Amiri-Regular', 'normal');

        let xPos = margin;
        columns.forEach((col, index) => {
            pdf.text(col.label, xPos + colWidths[index] / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
            xPos += colWidths[index];
        });
        currentY += rowHeight;

        const parties = [
            {
                name: `\u0627\u0644\u0633\u064A\u062F/ ${data?.litigationRequestShortDto?.contract?.firstPartyCitizen?.fullName || ''}`,
                idType: '', idNumber: data?.litigationRequestShortDto?.contract?.firstPartyCitizen?.identityNumber || '',
                role: '\u0627\u0644\u0645\u062D\u062A\u0643\u0645', address: '',
                phone: data?.litigationRequestShortDto?.contract?.firstPartyCitizen?.mobile || '',
                email: data?.litigationRequestShortDto?.contract?.firstPartyCitizen?.email || ''
            },
            {
                name: `\u0627\u0644\u0633\u064A\u062F/ ${this.defendantCitizen?.fullName || ''}`,
                idType: '', idNumber: data?.litigationRequestShortDto?.contract?.secondPartyCitizen?.identityNumber || '',
                role: '\u0627\u0644\u0645\u062D\u062A\u0643\u0645 \u0636\u062F\u0647', address: '',
                phone: data?.litigationRequestShortDto?.contract?.secondPartyCitizen?.mobile || '',
                email: data?.litigationRequestShortDto?.contract?.secondPartyCitizen?.email || ''
            }
        ];

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(8);

        parties.forEach((party) => {
            xPos = margin;
            const rowData = [party.email, party.phone, party.address, party.role, party.idNumber, party.idType, party.name];

            rowData.forEach((cell, cellIndex) => {
                if (cellIndex === 0 || cellIndex === 3) {
                    pdf.setFillColor(242, 242, 242);
                    pdf.rect(xPos, currentY, colWidths[cellIndex], rowHeight, 'FD');
                } else {
                    pdf.rect(xPos, currentY, colWidths[cellIndex], rowHeight, 'D');
                }

                pdf.setFont('Amiri-Regular', 'normal');
                const lines = pdf.splitTextToSize(cell, colWidths[cellIndex] - (2 * cellPadding));
                pdf.text(lines, xPos + colWidths[cellIndex] / 2, currentY + rowHeight / 2 + 2, { align: 'center' });
                xPos += colWidths[cellIndex];
            });
            currentY += rowHeight;
        });

        return currentY + 10;
    }

    private addPageFooter(pdf: jsPDF, currentPage: number, totalPages: number, pageWidth: number, pageHeight: number, margin: number): void {
        const footerY = pageHeight - margin + 5;
        pdf.setDrawColor(0, 82, 87);
        pdf.setLineWidth(0.5);
        pdf.line(margin, footerY - 3, pageWidth - margin, footerY - 3);

        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.setFont('helvetica', 'normal');

        const pageText = `${currentPage} / ${totalPages}`;
        const pageTextWidth = pdf.getTextWidth(pageText);
        pdf.text(pageText, (pageWidth - pageTextWidth) / 2, footerY);
    }

    private generateFileName(): string {
        const requestCode = this.litigationRequestForReportDto?.litigationRequestShortDto?.requestCode || 'document';
        const timestamp = new Date().toISOString().split('T')[0];
        return `\u0645\u062D\u0636\u0631_\u0627\u0644\u062A\u062D\u0643\u064A\u0645_${requestCode}_${timestamp}.pdf`;
    }

    async downloadCorrectedPDF() {
        this._loaderService.showLoader.next(true);

        try {
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true,
            });

            const pageWidth = 210;
            const pageHeight = 297;
            const margin = 15;
            const footerHeight = 15;
            pdf.setFont('Amiri-Regular', 'normal');

            let yPosition = margin;
            let currentPage = 1;

            const styles = {
                intro: {
                    fontSize: 11,
                    lineHeight: 8,
                    paragraphSpacing: 12,
                    textColor: [0, 0, 0] as [number, number, number],
                    firstLineIndent: 0
                },
                sectionTitle: {
                    fontSize: 13,
                    color: [0, 82, 87] as [number, number, number],
                    marginTop: 18,
                    marginBottom: 12,
                    underlineHeight: 0.5
                },
                sectionContent: {
                    fontSize: 11,
                    lineHeight: 7.5,
                    paragraphSpacing: 10,
                    textColor: [40, 40, 40] as [number, number, number],
                    firstLineIndent: 15
                },
                contentMargin: {
                    right: margin + 2,
                    left: margin - 25
                }
            };

            const effectiveWidth = pageWidth - styles.contentMargin.right - styles.contentMargin.left;

            const checkNewPage = (requiredSpace: number = 10) => {
                if (yPosition + requiredSpace > pageHeight - margin - footerHeight) {
                    pdf.addPage();
                    currentPage++;
                    yPosition = margin;
                    return true;
                }
                return false;
            };

            const addSectionTitle = (title: string): void => {
                checkNewPage(25);
                yPosition += styles.sectionTitle.marginTop;
                pdf.setDrawColor(0, 82, 87);
                pdf.setLineWidth(0.3);
                pdf.line(styles.contentMargin.left, yPosition - 5, pageWidth - styles.contentMargin.right, yPosition - 5);
                pdf.setFontSize(styles.sectionTitle.fontSize);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(...styles.sectionTitle.color);
                pdf.text(title, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
                const titleWidth = pdf.getTextWidth(title);
                pdf.setLineWidth(styles.sectionTitle.underlineHeight);
                pdf.line(pageWidth - styles.contentMargin.right - titleWidth - 5, yPosition + 2, pageWidth - styles.contentMargin.right, yPosition + 2);
                yPosition += styles.sectionTitle.marginBottom;
            };

            const addFormattedContent = (text: string, isIntro: boolean = false): void => {
                const style = isIntro ? styles.intro : styles.sectionContent;
                const fixArabicText = (str: string): string => {
                    str = str.replace(/\(/g, '\uFD3F');
                    str = str.replace(/\)/g, '\uFD3E');
                    const arabicNumerals: { [key: string]: string } = {
                        '0': '\u0660', '1': '\u0661', '2': '\u0662', '3': '\u0663', '4': '\u0664',
                        '5': '\u0665', '6': '\u0666', '7': '\u0667', '8': '\u0668', '9': '\u0669'
                    };
                    str = str.replace(/[0-9]/g, (match) => arabicNumerals[match] || match);
                    str = str.replace(/[\u064B-\u065F\u0670]/g, '');
                    return str;
                };

                const paragraphs = text.split('\n').filter(p => p.trim().length > 0);
                pdf.setFontSize(style.fontSize);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(...style.textColor);

                paragraphs.forEach((paragraph, index) => {
                    checkNewPage(20);
                    const fixedParagraph = fixArabicText(paragraph.trim());
                    const firstLineIndent = !isIntro && index > 0 ? style.firstLineIndent : 0;
                    const textWidth = effectiveWidth - firstLineIndent + 8;
                    const lines = pdf.splitTextToSize(fixedParagraph, textWidth);

                    lines.forEach((line: string, lineIndex: number) => {
                        checkNewPage(style.lineHeight + 2);
                        const indent = (lineIndex === 0 && firstLineIndent > 0) ? firstLineIndent : 0;
                        const isLastLine = lineIndex === lines.length - 1;

                        if (indent > 0) {
                            pdf.text(line, pageWidth - styles.contentMargin.right - indent, yPosition, { align: 'right' });
                        } else {
                            justifyLine(line, textWidth, isLastLine);
                        }
                        yPosition += style.lineHeight;
                    });

                    if (index < paragraphs.length - 1) {
                        yPosition += style.paragraphSpacing;
                    }
                });
            };

            const justifyLine = (line: string, targetWidth: number, isLastLine: boolean = false): void => {
                if (isLastLine) {
                    pdf.text(line, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
                    return;
                }
                const currentWidth = pdf.getTextWidth(line);
                const extraSpace = targetWidth - currentWidth;
                if (extraSpace > 0 && extraSpace < targetWidth * 0.15) {
                    const words = line.trim().split(/\s+/);
                    if (words.length > 1) {
                        const gaps = words.length - 1;
                        const spacePerGap = extraSpace / gaps;
                        const normalSpace = pdf.getTextWidth(' ');
                        const totalSpacePerGap = normalSpace + spacePerGap;
                        let xPos = pageWidth - styles.contentMargin.right;
                        for (let i = 0; i < words.length; i++) {
                            const word = words[i];
                            const wordWidth = pdf.getTextWidth(word);
                            pdf.text(word, xPos, yPosition, { align: 'right' });
                            if (i < words.length - 1) {
                                xPos -= (wordWidth + totalSpacePerGap);
                            }
                        }
                        return;
                    }
                }
                pdf.text(line, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
            };

            const addLogoAndHeader = async () => {
                try {
                    const logoResponse = await fetch('assets/images/logo-2.png');
                    const logoBlob = await logoResponse.blob();
                    const logoBase64 = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(logoBlob);
                    });
                    const logoWidth = 100;
                    const logoHeight = 20;
                    const logoX = (pageWidth - logoWidth) / 2;
                    pdf.addImage(logoBase64, 'PNG', logoX, yPosition, logoWidth, logoHeight);
                    yPosition += logoHeight + 10;
                } catch (error) {
                    console.log('Logo not added:', error);
                    yPosition += 20;
                }
            };

            const addSignatureSection = () => {
                const columnWidth = effectiveWidth / 2;
                yPosition += 20;
                checkNewPage(50);

                pdf.setFontSize(10);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(100, 100, 100);
                const closingText = '\u062D\u0631\u0631\u062A \u0647\u0630\u0647 \u0627\u0644\u0648\u062B\u064A\u0642\u0629 \u0645\u0646 4 \u0646\u0633\u062E \u0627\u0633\u0644\u062A\u0645 \u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u0646\u0632\u0627\u0639 \u0648\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0648\u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0631\u0627\u0628\u0639\u0629 \u062A\u0648\u062F\u0639 \u0644\u062F\u0649  \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0644\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A';
                const closingLines = pdf.splitTextToSize(closingText, effectiveWidth);
                pdf.text(closingLines, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
                yPosition += 15;

                pdf.setDrawColor(0, 82, 87);
                pdf.setLineWidth(0.3);
                const sigWidth = 80;
                pdf.line(pageWidth - styles.contentMargin.right - sigWidth, yPosition, pageWidth - styles.contentMargin.right, yPosition);
                yPosition += 6;
                yPosition += 20;

                pdf.setFontSize(12);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(0, 82, 87);
                pdf.text(' :\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 ', pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
                yPosition += 12;

                pdf.setFontSize(11);
                pdf.setFont('Amiri-Regular', 'normal');
                pdf.setTextColor(4, 164, 136);
                const arbitratorName = this.litigationRequestForReportDto?.report?.arbitratorCitizenName || '';
                const arbitratorText = `\u0627\u0644\u0645\u062D\u0643\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A/ ${arbitratorName}`;
                pdf.text(arbitratorText, pageWidth - styles.contentMargin.right, yPosition, { align: 'right' });
                pdf.text('\u0627\u0644\u062A\u0648\u0642\u064A\u0639/', pageWidth - styles.contentMargin.right - columnWidth, yPosition, { align: 'right' });
                yPosition += 12;

                const signatureFile = this.litigationRequestForReportDto?.litigationRequestShortDto?.arbitratorCitizen?.signtureFile;
                if (signatureFile) {
                    try {
                        const signatureBase64 = `data:image/jpeg;base64,${signatureFile}`;
                        const signatureWidth = 30;
                        const signatureHeight = 30;
                        const signatureX = pageWidth - styles.contentMargin.right - columnWidth - signatureWidth;
                        pdf.addImage(signatureBase64, 'JPEG', signatureX, yPosition, signatureWidth, signatureHeight);
                        yPosition += signatureHeight + 5;
                    } catch (error) {
                        console.log('Signature image not added:', error);
                        pdf.setFont('Amiri-Regular', 'normal');
                        pdf.setTextColor(0, 0, 0);
                        pdf.text(arbitratorName, pageWidth - styles.contentMargin.right - columnWidth, yPosition, { align: 'right' });
                        yPosition += 10;
                    }
                }
            };

            // PART 1: Original arbitration report
            await addLogoAndHeader();

            checkNewPage(15);
            pdf.setFontSize(16);
            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(0, 82, 87);
            pdf.text('\u0646\u0645\u0648\u0630\u062C \u062D\u0643\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 15;

            checkNewPage(60);
            yPosition = this.addArbitrationDetailsTable(pdf, yPosition, pageWidth, margin);
            yPosition += 15;

            pdf.text(' \u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', pageWidth / 2, yPosition, { align: 'center' });

            checkNewPage(15);
            yPosition = this.addPartiesTable(pdf, yPosition, pageWidth, margin);
            yPosition += 20;

            checkNewPage(45);
            pdf.setFillColor(245, 248, 250);
            pdf.setDrawColor(0, 82, 87);
            pdf.setLineWidth(0.5);
            const introBoxHeight = 50;
            pdf.roundedRect(styles.contentMargin.left + 15, yPosition, effectiveWidth, introBoxHeight, 2, 2, 'FD');
            yPosition += 8;

            const intro = ':\u0627\u0644\u062D\u0645\u062F \u0644\u0644\u0647 \u0631\u0628 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0646\u060C \u0648\u0627\u0644\u0635\u0644\u0627\u0629 \u0648\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u0649 \u0646\u0628\u064A\u0646\u0627 \u0645\u062D\u0645\u062F \u0648\u0622\u0644\u0647 \u0648\u0635\u062D\u0628\u0647\u060C \u0648\u0628\u0639\u062F \n\u0628\u0646\u0627\u0621 \u0639\u0644\u0649 \u0646\u0638\u0627\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0635\u0627\u062F\u0631 \u0628\u0627\u0644\u0645\u0631\u0633\u0648\u0645 \u0627\u0644\u0645\u0644\u0643\u064A \u0627\u0644\u0643\u0631\u064A\u0645 \u0631\u0642\u0645 \u0645/34 \u0648\u062A\u0627\u0631\u064A\u062E 24/5/1433 \u0647\u0640\u060C \u0648\u0644\u0627\u0626\u062D\u062A\u0647 \u0627\u0644\u062A\u0646\u0641\u064A\u0630\u064A\u0629\u060C \u0648\u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0627\u062A\u0641\u0627\u0642 \u0627\u0644\u0623\u0637\u0631\u0627\u0641 \u0639\u0644\u0649 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0648\u0641\u0642 \u0646\u0638\u0627\u0645 \u0648\u0642\u0648\u0627\u0639\u062F \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0644\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A \u060C \u0641\u0625\u0646 \u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u062A\u0635\u062F\u0631 \u062D\u0643\u0645\u0647\u0627 \u0639\u0644\u0649 \u0627\u0644\u0646\u062D\u0648 \u0627\u0644\u062A\u0627\u0644\u064A ';
            addFormattedContent(intro, true);
            yPosition += 10;

            if (this.litigationRequestForReportDto?.report?.facts) {
                addSectionTitle('\u0623\u0648\u0644\u0627\u064B: \u0627\u0644\u0648\u0642\u0627\u0626\u0639');
                addFormattedContent(this.litigationRequestForReportDto.report.facts);
            }

            if (this.litigationRequestForReportDto?.report?.reasons) {
                addSectionTitle('\u062B\u0627\u0646\u064A\u0627\u064B: \u0627\u0644\u0623\u0633\u0628\u0627\u0628');
                addFormattedContent(this.litigationRequestForReportDto.report.reasons);
            }

            if (this.litigationRequestForReportDto?.report?.judgmentDecisionText) {
                addSectionTitle('\u062B\u0627\u0644\u062B\u0627\u064B: \u0645\u0646\u0637\u0648\u0642 \u0627\u0644\u062D\u0643\u0645');
                checkNewPage(30);
                yPosition += 3;
                addFormattedContent(this.litigationRequestForReportDto.report.judgmentDecisionText, false);
                yPosition += 8;
            }

            addSignatureSection();

            // PART 2: Correction decision (new page)
            pdf.addPage();
            currentPage++;
            yPosition = margin;

            await addLogoAndHeader();

            checkNewPage(15);
            pdf.setFontSize(16);
            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(0, 82, 87);
            pdf.text('\u0642\u0631\u0627\u0631 \u062A\u0635\u062D\u064A\u062D \u062D\u0643\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', pageWidth / 2, yPosition, { align: 'center' });
            yPosition += 15;

            checkNewPage(60);
            yPosition = this.addCorrectionDetailsTable(pdf, yPosition, pageWidth, margin);
            yPosition += 15;

            pdf.setFont('Amiri-Regular', 'normal');
            pdf.setTextColor(0, 82, 87);
            pdf.setFontSize(12);
            pdf.text(' \u0623\u0637\u0631\u0627\u0641 \u0627\u0644\u062A\u062D\u0643\u064A\u0645', pageWidth / 2, yPosition, { align: 'center' });

            checkNewPage(15);
            yPosition = this.addPartiesTable(pdf, yPosition, pageWidth, margin);
            yPosition += 20;

            const correctionDecisionText = this.litigationRequestForCorrectionDto?.correctionRequests?.[0]?.correctionDecisionText;
            if (correctionDecisionText) {
                addSectionTitle('\u0627\u0644\u0642\u0631\u0627\u0631');
                checkNewPage(30);
                yPosition += 3;
                addFormattedContent(correctionDecisionText, false);
                yPosition += 8;
            }

            addSignatureSection();

            const totalPages = pdf.getNumberOfPages();
            for (let i = 1; i <= totalPages; i++) {
                pdf.setPage(i);
                this.addPageFooter(pdf, i, totalPages, pageWidth, pageHeight, margin);
            }

            const requestCode = this.litigationRequestForReportDto?.litigationRequestShortDto?.requestCode || 'document';
            const timestamp = new Date().toISOString().split('T')[0];
            const fileName = `\u0645\u062D\u0636\u0631_\u0627\u0644\u062A\u062D\u0643\u064A\u0645_\u0628\u0639\u062F_\u0627\u0644\u062A\u0635\u062D\u064A\u062D_${requestCode}_${timestamp}.pdf`;
            pdf.save(fileName);
        } catch (error) {
            console.error('Error generating corrected PDF:', error);
            alert('\u0641\u0634\u0644 \u0641\u064A \u0625\u0646\u0634\u0627\u0621 \u0645\u0644\u0641 PDF. \u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0629 \u0623\u062E\u0631\u0649.');
        } finally {
            this._loaderService.showLoader.next(false);
        }
    }

    private addCorrectionDetailsTable(pdf: jsPDF, startY: number, pageWidth: number, margin: number): number {
        const data = this.litigationRequestForReportDto;
        const correctionData = this.litigationRequestForCorrectionDto;
        const tableWidth = pageWidth - (2 * margin);
        const labelColWidth = 60;
        const valueColWidth = tableWidth - labelColWidth;
        const rowHeight = 12;
        const cellPadding = 3;
        let currentY = startY;

        pdf.setFillColor(0, 82, 87);
        pdf.rect(margin, currentY, tableWidth, rowHeight, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.setFont('Amiri-Regular', 'normal');
        pdf.text(
            `\u0642\u0631\u0627\u0631 \u062A\u0635\u062D\u064A\u062D \u062D\u0643\u0645 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u0641\u064A \u0627\u0644\u062F\u0639\u0648\u0649 \u0631\u0642\u0645 (${data?.litigationRequestShortDto?.requestCode || ''})`,
            pageWidth / 2, currentY + rowHeight / 2 + 2, { align: 'center' }
        );
        currentY += rowHeight;

        const correctionDate = correctionData?.correctionRequests?.[0]?.requestDate
            ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', calendar: 'gregory' })
                .format(new Date(correctionData.correctionRequests[0].requestDate)).replace(/\//g, ' - ')
            : '';

        const rows = [
            { label: ':\u062A\u0627\u0631\u064A\u062E \u0627\u0635\u062F\u0627\u0631 \u0642\u0631\u0627\u0631 \u0627\u0644\u062A\u0635\u062D\u064A\u062D', value: correctionDate },
            {
                label: ':\u0647\u064A\u0626\u0629 \u0627\u0644\u062A\u062D\u0643\u064A\u0645 \u064A\u0645\u062B\u0644\u0647\u0627',
                value: [
                    `\u0627\u0644\u0645\u062D\u0643\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.fullName || ''}`,
                    `\u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064A\u0629 \u0627\u0644\u0648\u0637\u0646\u064A\u0629/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.identityNumber || ''}`,
                    `\u0631\u0642\u0645 \u0627\u0644\u062C\u0648\u0627\u0644/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.mobile || ''}`,
                    `\u0627\u0644\u0645\u062F\u064A\u0646\u0629/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.city?.cityName || ''}`,
                    `\u0631\u0642\u0645 \u0639\u0636\u0648\u064A\u0629 \u0627\u0644\u0645\u062D\u0643\u0645 \u0641\u064A \u0627\u0644\u0645\u0631\u0643\u0632 \u0627\u0644\u0633\u0639\u0648\u062F\u064A \u0644\u0644\u062A\u062D\u0643\u064A\u0645 \u0627\u0644\u0639\u0642\u0627\u0631\u064A/ ${data?.litigationRequestShortDto?.arbitratorCitizen?.identityNumber || ''}`
                ],
                isMultiLine: true
            },
        ];

        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(10);

        rows.forEach((row, index) => {
            const isEvenRow = index % 2 === 0;
            let currentRowHeight = rowHeight;
            if (row.isMultiLine && Array.isArray(row.value)) {
                currentRowHeight = rowHeight + (row.value.length - 1) * 6;
            }

            pdf.setFillColor(242, 242, 242);
            pdf.rect(margin + valueColWidth, currentY, labelColWidth, currentRowHeight, 'FD');

            if (isEvenRow) {
                pdf.setFillColor(255, 255, 255);
            } else {
                pdf.setFillColor(250, 250, 250);
            }
            pdf.rect(margin, currentY, valueColWidth, currentRowHeight, 'D');

            pdf.setFont('Amiri-Regular', 'normal');
            pdf.text(row.label, margin + valueColWidth + labelColWidth - cellPadding, currentY + cellPadding + 4, { align: 'right' });

            pdf.setFont('Amiri-Regular', 'normal');
            if (row.isMultiLine && Array.isArray(row.value)) {
                let textY = currentY + cellPadding + 4;
                row.value.forEach(line => {
                    pdf.text(line, margin + valueColWidth - cellPadding, textY, { align: 'right', maxWidth: valueColWidth - (2 * cellPadding) });
                    textY += 6;
                });
            } else {
                const valueText = row.value as string;
                const lines = pdf.splitTextToSize(valueText, valueColWidth - (2 * cellPadding));
                pdf.text(lines, margin + valueColWidth - cellPadding, currentY + cellPadding + 4, { align: 'right' });
            }

            currentY += currentRowHeight;
        });

        return currentY;
    }
}
