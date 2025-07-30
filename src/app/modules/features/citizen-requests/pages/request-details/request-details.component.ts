import { Component, model, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { CitizenRequestActionModel, CitizenRequestCreateUpdateDto, CitizenRequestFullDataDto, CitizenShortDto, SysArbitratorClassDto } from '../../models/citizen-request.model';
import { FileUploader } from '@app/shared/models/file-uploader.model';
import { CitizenRequestStatus } from '../../models/enums/citizen-request-status.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { CitizenRequestService } from '../../services/citizen-request.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';
import { LawsuitDetailsItem } from '../../../lawsuits/models/lawsuit-details.model';
import { Subscription, takeUntil } from 'rxjs';
import { CitizenRequestAction } from '../../models/enums/citizen-request-type.model';
import { environment } from '@environment/environment';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';

@Component({
    selector: 'app-request-details',
    templateUrl: './request-details.component.html',
    styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent extends BaseComponent implements OnInit {
    arbitratorClass?: SysArbitratorClassDto;
    multiFileUploaderData: FileUploader = {
        multiple: true,
    } as FileUploader;

    singleFileUploaderData: FileUploader = {
        multiple: false,
    } as FileUploader;

    baseUrl: string = `${environment.baseURL}\\`;
    isArbitrator: boolean = false;
    isNewRequest: boolean = true;
    statusId: CitizenRequestStatus = CitizenRequestStatus.Draft;
    citizenRequestFullDataDto: CitizenRequestFullDataDto | null = null;

    citizenRequestCreateUpdateDto: CitizenRequestCreateUpdateDto = {
        id: '00000000-0000-0000-0000-000000000000',
        citizenRequestTypeId: 1,
        arbitratorClassId: null,
        areaId: null,
        brief: null,
        academicDegreeName: '',
        isSend: false,
        experienceYears: null,
        isVolunteerApproval: false,
        citizenRequestAcademicDegreeFiles: [],
        citizenRequestExperienceCertificates: [],
        citizenRequestFreelanceWorkDocumentFiles: [],
    };

    RequestNotesForm: FormGroup | null = null;
    subscriptions: Subscription[] = [];


    constructor(
        private activatedRoute: ActivatedRoute,
        private route: Router,
        private modalService: NgbModal,
        private _translate: TranslateService,
        private toastrNotificationService: ToastrNotificationService,
        private citizenRequestService: CitizenRequestService,
        private _activatedRoute: ActivatedRoute,
        private _breadcrumbService: BreadcrumbService,
    ) {
        super();


    }
    ngOnInit(): void {
        this.setBreadcrumb()

        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {

            let code = res['code'];
            let id = res['id'];
            if (id) {
                this.getCitizenRequestById(id);
            }
            if (code == 'reformer') {
            } else if (code == 'arbitrator') {
                this.isArbitrator = true;
            } else {
                //redirect to list
                this.navigateToList();
            }
        })


    }

    get citizenRequestStatus() {
        return CitizenRequestStatus;
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translate.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translate.instant(this.translations.CitizenRequest.requestDetails) }
        ])
    }

    getCitizenRequestById(id: string) {
        this.citizenRequestService.getCitizenRequestById(id).subscribe(res => {
            if (res.data) {
                this.fillData(res.data)
                this.citizenRequestFullDataDto = res.data;
                this.statusId = res.data.statusId;
                console.log( "dataaa",res.data);
            }
        })
    }

    dataList: LawsuitDetailsItem[] = [];
    fillData(requestData: CitizenRequestFullDataDto) {
        this.dataList = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.arbitrator.fullName),
                value: requestData.citizen.fullName,
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.arbitrator.identityNumber),
                value: requestData.citizen.identityNumber,
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.workPhone),
                value: requestData.citizen.workTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.homePhone),
                value: requestData.citizen.homeTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                title: this._translate.instant(this.translations.arbitrator.fax),
                value: requestData.citizen.fax ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/location.svg',
                title: this._translate.instant(this.translations.auth.email),
                value: requestData.citizen.email,
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.auth.phoneNumber),
                value: requestData.citizen.mobile,
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.CitizenRequest.academicDegreeName),
                value: requestData.academicDegreeName,
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.CitizenRequest.isVolunteerApproval),
                value: requestData.isVolunteerApproval ? this._translate.instant(this.translations.actions.yes) :
                    this._translate.instant(this.translations.actions.no),
                isDownload: false,
            },
        ]

        if (this.isArbitrator) {
            this.dataList.push(
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.CitizenRequest.area),
                    value: requestData.sysArea?.areaName ?? '',
                    isDownload: false,
                },
            )

            this.dataList.push(
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.CitizenRequest.experienceYears),
                    value: requestData.experienceYears?.toString() ?? '',
                    isDownload: false,
                },
            )

            this.dataList.push(
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.CitizenRequest.arbitratorClass),
                    value: requestData.sysArbitratorClass?.arbitratorClassName ?? '',
                    isDownload: false,
                },
            )

            this.dataList.push(
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.CitizenRequest.brief),
                    value: requestData.brief ?? '',
                    isDownload: false,
                },
            )

        }

    }

    onSendToPayFees(modal: any) {
        let citizenRequestActionModel = {
            citizenRequestAction: CitizenRequestAction.SendToPayFees,
            requestId: this.citizenRequestFullDataDto?.id
        } as CitizenRequestActionModel;

        this.execute(modal, citizenRequestActionModel);
    }

    onSendToPayEditFees(modal: any) {
        let citizenRequestActionModel = {
            citizenRequestAction: CitizenRequestAction.SendToPayEditFees,
            requestId: this.citizenRequestFullDataDto?.id
        } as CitizenRequestActionModel;

        this.execute(modal, citizenRequestActionModel);
    }

    onAccept(modal: any) {
        let citizenRequestActionModel = {
            citizenRequestAction: CitizenRequestAction.CertifiedWithOutFees,
            requestId: this.citizenRequestFullDataDto?.id
        } as CitizenRequestActionModel;

        this.execute(modal, citizenRequestActionModel);
    }

    onAcceptWithFees(modal: any) {
        let citizenRequestActionModel = {
            citizenRequestAction: CitizenRequestAction.CertifiedWithFees,
            requestId: this.citizenRequestFullDataDto?.id
        } as CitizenRequestActionModel;

        this.execute(modal, citizenRequestActionModel);
    }

    onReject(modal: any, notes?: string) {
        let citizenRequestActionModel = {
            citizenRequestAction: CitizenRequestAction.Reject,
            requestId: this.citizenRequestFullDataDto?.id,
            notes: notes
        } as CitizenRequestActionModel;

        this.execute(modal, citizenRequestActionModel);
    }

    onSendToEdit(modal: any, notes?: string) {
        let citizenRequestActionModel = {
            citizenRequestAction: CitizenRequestAction.SendForEdit,
            requestId: this.citizenRequestFullDataDto?.id,
            notes: notes
        } as CitizenRequestActionModel;

        this.execute(modal, citizenRequestActionModel);
    }


    execute(modelPop: any, citizenRequestActionModel: CitizenRequestActionModel) {
        this.citizenRequestService.executeAction(citizenRequestActionModel).subscribe(res => {
            if (res.isDone) {
                modelPop.dismiss()
                switch (citizenRequestActionModel.citizenRequestAction) {
                    case CitizenRequestAction.CertifiedWithOutFees:
                        this.statusId = CitizenRequestStatus.Certified;
                        break;
                    case CitizenRequestAction.CertifiedWithFees:
                        this.statusId = CitizenRequestStatus.WaitingForMembershipFeesToBePaid;
                        break;
                    case CitizenRequestAction.Reject:
                        this.statusId = CitizenRequestStatus.Rejected;
                        break;
                    case CitizenRequestAction.SendForEdit:
                        this.statusId = CitizenRequestStatus.SentForEdit;
                        break;
                    case CitizenRequestAction.SendToPayFees:
                        this.statusId = CitizenRequestStatus.SendToPayFees;
                        break;
                }

                this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
            }

        })
    }

    open(content: TemplateRef<any>) {
        this.modalService.open(content)
    }


    public showDatePicker(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        inputElement.type = 'date'
        inputElement.showPicker();
    }

    public resetDate(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        inputElement.type = 'text'
    }


    private navigateToList(): void {
        //this.route.navigate([`/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.list}`]);
    };


}
