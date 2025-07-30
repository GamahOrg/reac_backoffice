import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';
import { BaseComponent } from '@app/shared/conponents/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { LitigationRequestService } from '../../services/litigation-request.service';
import { LitigationRequestNotesService } from '../../services/litigation-request-notes/litigation-request-notes.service';
import { LitigationRequestForNotes, LitigationRequestNoteCreateUpdateDto, LitigationRequestNotesDto } from '../../models/litigation-request-notes.model';
import { Subject } from '@microsoft/signalr';
import { FileUploader } from '@app/shared/models/file-uploader.model';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-litigation-request-notes-details',
  templateUrl: './litigation-request-notes-details.component.html',
  styleUrl: './litigation-request-notes-details.component.scss'
})
export class LitigationRequestNotesDetailsComponent extends BaseComponent implements OnInit {


  LitigationRequestForNotes: LitigationRequestForNotes | undefined
  litigationRequestId!: string;
  notesFileId!: string;
  baseUrl = `${environment.baseURL}/`;
  constructor(private activatedRoute: ActivatedRoute,
    private _translate: TranslateService,
    private _litigationRequestNotesService: LitigationRequestNotesService,
    private toastrNotificationService: ToastrNotificationService,
    private _breadcrumbService: BreadcrumbService,
    private modalService: NgbModal,
    private _formBuilder: FormBuilder,

) {
    super();

}


notesForm = this._formBuilder.group({
    title: new FormControl<string | null>(null, [Validators.required]),
    notes: new FormControl<string | null>(null, [Validators.required]),

})

editNotesForm = this._formBuilder.group({
    id: new FormControl<string | null>(''),
    title: new FormControl<string | null>(null, [Validators.required]),
    notes: new FormControl<string | null>(null, [Validators.required]),

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
            this.getLitigationRequestForNotes(id);
        }
    })
};
private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
        {
            label: this._translate.instant(this.translations.layout.sidebar.home),
            link: '/'
        },
        {
            label: this._translate.instant(this.translations.layout.sidebar.litigationRequest),
            link: `/${Configuration.modules.LitigationRequests}/${Configuration.pages.LitigationRequests.list}`
        },
        {
            label: this._translate.instant(this.translations.LitigationRequest.LitigationRequestDetails),
        },
    ])
}
getLitigationRequestForNotes(requestId: string) {
    this._litigationRequestNotesService.GetLitigationNotesById(requestId,[1,3]).subscribe(response => {
        this.LitigationRequestForNotes = response.data;
        this.fillData()
        this.fillfirstPartyData()
        this.fillsecondPartyData()
    })
}

multiFileUploaderData: FileUploader = {
    multiple: false,
} as FileUploader;

public onFilesUploaded(fileData: any): void {
    
    this.notesFileId = fileData.eventRes.data[0].id
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
            value: this.LitigationRequestForNotes?.litigationRequestShortDto?.requestCode ?? '',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.cityName),
            value: this.LitigationRequestForNotes?.litigationRequestShortDto?.cityName ?? '',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.areaName),
            value: this.LitigationRequestForNotes?.litigationRequestShortDto?.areaName ?? '',
            isDownload: false,
        },

        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.contractAddress),
            value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contractAddress ?? '',
            isDownload: false,
        },

        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.litigationRequestCategory),
            value: this.LitigationRequestForNotes?.litigationRequestShortDto?.litigationRequestCategory?.categoryName ?? '',
            isDownload: false,
        },
        {
            icon: 'assets/images/icons/lawsuit-details/user.svg',
            title: this._translate.instant(this.translations.LitigationRequest.litigationRequestContractType),
            value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.litigationRequestContractType.typeName ?? '',
            isDownload: false,
        },

    ]

}



fillfirstPartyData() {

    if (this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyFacility) {
        this.firstParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyFacility.code ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyFacility.arabicFacilityName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyFacility.commercialRegisterNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyFacility.facility700Number ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

    if (this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen) {

        this.firstParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.arbitrator.fullName),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.fullName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.arbitrator.identityNumber),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.identityNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.workPhone),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.workTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.homePhone),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.homeTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                title: this._translate.instant(this.translations.arbitrator.fax),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.fax ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/location.svg',
                title: this._translate.instant(this.translations.auth.email),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.email ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.auth.phoneNumber),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCitizen.mobile ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

}

fillsecondPartyData() {

    if (this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyFacility) {
        this.secondParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

    if (this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen) {

        this.secondParty = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.arbitrator.fullName),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.arbitrator.identityNumber),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.workPhone),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.arbitrator.homePhone),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                title: this._translate.instant(this.translations.arbitrator.fax),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/location.svg',
                title: this._translate.instant(this.translations.auth.email),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                title: this._translate.instant(this.translations.auth.phoneNumber),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/call.svg',
                title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                value: this.LitigationRequestForNotes?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                isDownload: false,
            },
        ]
    }

}

openNotesModal(content: TemplateRef<any>) {
        
    this.modalService.open(content)
   
}

get notesControls() {
    return this.notesForm.controls
}
get editNotesControls() {
    return this.editNotesForm.controls
}

addNote(modal: any){
    
    if(this.notesForm.valid){
    
        let model = {
            litigationRequestId: this.litigationRequestId,
            notes: this.notesControls.notes.value,
            title:this.notesControls.title.value,
            notesFileId: this.notesFileId,
            litigationRequestCategoryId : 1
        } as unknown as LitigationRequestNoteCreateUpdateDto
        
        this._litigationRequestNotesService.AddLitigationNote(model)
        .subscribe(result => {
            
            if (result.isDone) {
                this.LitigationRequestForNotes!.notes = result?.data
                modal.dismiss()

            }
        })

    }
}

editNote(modal: any){
    
    if(this.editNotesForm.valid){
    
        let model = {
            id: this.editNotesControls.id.value,
            litigationRequestId: this.litigationRequestId,
            notes: this.editNotesControls.notes.value,
            title:this.editNotesControls.title.value,
            notesFileId: this.notesFileId
        } as unknown as LitigationRequestNoteCreateUpdateDto
        
        this._litigationRequestNotesService.EditLitigationNote(model)
        .subscribe(result => {
            
            if (result.isDone) {
                this.LitigationRequestForNotes!.notes = result?.data
                modal.dismiss()

            }
        })

    }
}

openEditNoteModal(modal: TemplateRef<any>,note: LitigationRequestNotesDto) {
    
    this.editNotesForm.patchValue(
        {
            id: note.id,
            title : note.title,
            notes : note.notes
        }
    )

    this.modalService.open(modal);
}
}
