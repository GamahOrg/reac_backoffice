import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { FileUploader } from '@app/shared/models/file-uploader.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { environment } from '@environment/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, forkJoin } from 'rxjs';
import { ArbitrationRequestCorrespondencesService } from '../../services/arbitration-request-correspondences/arbitration-request-correspondences.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LitigationRequestForCorrespondences, LitigationRequestCorrespondenceCreateUpdateDto, LitigationRequestCorrespondencesDto } from '../../models/arbitration-request-correspondences.model';

@Component({
  selector: 'app-arbitration-request-correspondences-details',
  templateUrl: './arbitration-request-correspondences-details.component.html',
  styleUrl: './arbitration-request-correspondences-details.component.scss'
})
export class ArbitrationRequestCorrespondencesDetailsComponent extends BaseComponent implements OnInit {


  LitigationRequestForCorrespondences: LitigationRequestForCorrespondences | undefined
  litigationRequestId!: string;
  correspondencesFileId!: string;
  baseUrl = `${environment.baseURL}/`;
  correspondencesDestinations : any;
    replyModalData: any;
  constructor(private activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
    private _arbitrationRequestCorrespondencesService: ArbitrationRequestCorrespondencesService,
    private _breadcrumbService: BreadcrumbService,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,

) {
    super();

}


correspondencesForm = this._formBuilder.group({
    subject: new FormControl<string | null>(null, [Validators.required]),
    message: new FormControl<string | null>(null, [Validators.required]),
    litigationRequestCorrespondenceDestinationId:new FormControl<number | null>(null, [Validators.required])
})




ngOnInit() {
    this.observeActivatedRoute()
    this.updateBreadcrumb();
}
private observeActivatedRoute(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
        let id = res['id'];
        if (id) {
            this.litigationRequestId = id;
            this.forkJoinAllLookups(id);
        }
    })
};

private forkJoinAllLookups(id:string): void {
  forkJoin(
    {
      GetArbitrationCorrespondencesById: this._arbitrationRequestCorrespondencesService.GetArbitrationCorrespondencesById(id,[2,3])
    }
  ).pipe(takeUntil(this.destroy$)).subscribe(res => {
    debugger;
      this.LitigationRequestForCorrespondences = res.GetArbitrationCorrespondencesById.data;
      this.fillData()
      this.fillfirstPartyData()
      this.fillsecondPartyData()
  }
  )
};

private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
        {
            label: this._translate.instant(this.translations.layout.sidebar.home),
            link: '/'
        },
        {
            label: this._translate.instant(this.translations.layout.sidebar.arbitration),
            link: `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignarbitratorlist}`
        },
        // {
        //     label: this._translate.instant(this.translations.LitigationRequest.det),
        // },
    ])
}


multiFileUploaderData: FileUploader = {
    multiple: false,
} as FileUploader;

public onFilesUploaded(fileData: any): void {
    debugger;
    this.correspondencesFileId = fileData.eventRes.data[0].id
    // fileData.eventRes.data.forEach((file: any) => 
    //   this.litigationRequestArbitrationReportExplanationRequestCreate.
    // litigationRequestArbitrationReportExplanationRequestFiles.push(file.id))
};

dataList: LawsuitDetailsItem[] = [];
firstParty: LawsuitDetailsItem[] = [];
secondParty: LawsuitDetailsItem[] = [];
fillData() {
    this.dataList = [
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.requestCode),
            value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.requestCode ?? '',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.cityName),
            value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.cityName ?? '',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.areaName),
            value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.areaName ?? '',
            isDownload: false,
        },

        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.contractAddress),
            value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contractAddress ?? '',
            isDownload: false,
        },

        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.litigationRequestCategory),
            value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.litigationRequestCategory?.categoryName ?? '',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.litigationRequestContractType),
            value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.litigationRequestContractType.typeName ?? '',
            isDownload: false,
        },

    ]

}



fillfirstPartyData() {

    if (this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyFacility) {
        this.firstParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyFacility.code ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyFacility.arabicFacilityName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyFacility.commercialRegisterNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyFacility.facility700Number ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

    if (this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen) {

        this.firstParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.arbitrator.fullName),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.fullName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.arbitrator.identityNumber),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.identityNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.workPhone),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.workTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.homePhone),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.homeTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                title: this._translate.instant(this.translations.arbitrator.fax),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.fax ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/location.svg',
                title: this._translate.instant(this.translations.auth.email),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.email ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.auth.phoneNumber),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCitizen.mobile ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

}

fillsecondPartyData() {

    if (this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyFacility) {
        this.secondParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

    if (this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen) {

        this.secondParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.arbitrator.fullName),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.arbitrator.identityNumber),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.workPhone),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.homePhone),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                title: this._translate.instant(this.translations.arbitrator.fax),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/location.svg',
                title: this._translate.instant(this.translations.auth.email),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.auth.phoneNumber),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                value: this.LitigationRequestForCorrespondences?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

}

openCorrespondencesModal(content: TemplateRef<any>) {
        
    this.modalService.open(content)
   
}

get correspondencesControls() {
    return this.correspondencesForm.controls
}


addCorrespondence(modal: any){
    debugger;
    if(this.correspondencesForm.valid){
    
        let model = {
            litigationRequestId: this.litigationRequestId,
            subject: this.correspondencesControls.subject.value,
            message:this.correspondencesControls.message.value,
            correspondenceFileId: this.correspondencesFileId,
            litigationRequestCategoryId : 2,
            LitigationRequestCorrespondenceDestinationId : this.correspondencesControls.litigationRequestCorrespondenceDestinationId.value
        } as unknown as LitigationRequestCorrespondenceCreateUpdateDto
        
        this._arbitrationRequestCorrespondencesService.AddArbitrationCorrespondences(model)
        .subscribe(result => {
            debugger;
            if (result.isDone) {
                this.LitigationRequestForCorrespondences!.correspondences = result?.data
                modal.dismiss()

            }
        })

    }
}


openCorrespondenceReplyListModal(modal: TemplateRef<any>,correspondence: LitigationRequestCorrespondencesDto) {
    debugger;
    this.replyModalData = correspondence.litigationRequestCorrespondenceReply;
    this.modalService.open(modal);

    }

}
