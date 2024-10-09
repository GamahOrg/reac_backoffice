import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, takeUntil } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { FileUploader } from '@app/shared/models/file-uploader.model';
import { LawsuitDetailsItem } from '@app/modules/features/lawsuits/models/lawsuit-details.model';

import { BaseComponent } from '@app/shared/components/base/base.component';
import { ArbitratorRecusalService } from '../../services/arbitrator-recusal/arbitrator-recusal.service';
import { LitigationRequestArbitrationReportExplanationRequestGetDto, LitigationRequestForArbitratorRecusalRequestDto } from '../../models/litigation-request-arbitration-report-explanation-request-get-dto';
import { ApproveRejectStatus } from '../../models/enums/arbitrator-recusal';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-approve-or-reject-arbitrator-recusal-request',
  templateUrl: './approve-or-reject-arbitrator-recusal-request.component.html',
  styleUrl: './approve-or-reject-arbitrator-recusal-request.component.scss'
})
export class ApproveOrRejectArbitratorRecusalRequestComponent extends BaseComponent implements OnInit {
    
    ngOnInit(): void {
        this.observeActivatedRoute();
        this.forkJoinAllLookups();
    }
    baseUrl = `${environment.baseURL}/`;
    litigationRequestForSessionDto: LitigationRequestForArbitratorRecusalRequestDto | undefined;

    dataList: LawsuitDetailsItem[] = [];
    firstParty: LawsuitDetailsItem[] = [];
    secondParty: LawsuitDetailsItem[] = [];
    private _activatedRoute = inject(ActivatedRoute);
    private _arbitratorRecusalService = inject(ArbitratorRecusalService)
    private toastrNotificationService = inject(ToastrNotificationService)
    private _translate = inject(TranslateService)
    private router = inject(Router)
    public litigationId: string = "";
    public showAction: boolean = false;
    private modalService = inject(NgbModal)
    LitigationRequestArbitratorRecusalRequestStatus = ApproveRejectStatus;
    


    approveOrRejectArbitratorRecusalRequestForm = this.formBuilder.group({
      litigationRequestId : ['',[Validators.required]],
      response : ['']
    });
    
  
    constructor(
      private formBuilder: FormBuilder
    ) {
      super();
      
    }


    arbitratorRecusalApproveRejectStatus = {
        ///<summary>لم يتم الرد</summary>
        [ApproveRejectStatus.Approve]: this.translations.ArbitratorRecusalRequest.approve,
        ///<summary>تمت الموافقة</summary>
        [ApproveRejectStatus.Reject]: this.translations.ArbitratorRecusalRequest.reject,

    }

    private observeActivatedRoute(): void {
      this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
         
          this.litigationId = res['id'];      
      })
  };

  private forkJoinAllLookups(): void {
    forkJoin(
      {
        GetArbitratorRecusalData : this._arbitratorRecusalService.getLitigationRequestForArbitratorRecusalRequestById(this.litigationId)
      }
    ).pipe(takeUntil(this.destroy$)).subscribe(res => {
       ;
      if(res.GetArbitratorRecusalData.isDone && res.GetArbitratorRecusalData.data){
          this.litigationRequestForSessionDto = res.GetArbitratorRecusalData?.data;
          if(res.GetArbitratorRecusalData.data.request.approveRejectStatus != null){
            this.showAction = res.GetArbitratorRecusalData?.data?.request.approveRejectStatus == 1 ? false : true;
          }else{
            this.showAction = true;
          }
        this.fillData()
        this.fillfirstPartyData()
        this.fillsecondPartyData()

      }
    }
    )
  };
  
    fillData() {
        this.dataList = [
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.requestCode),
                value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.requestCode ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.cityName),
                value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.cityName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.areaName),
                value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.areaName ?? '',
                isDownload: false,
            },

            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.contractAddress),
                value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contractAddress ?? '',
                isDownload: false,
            },

            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.litigationRequestCategory),
                value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.litigationRequestCategory?.categoryName ?? '',
                isDownload: false,
            },
            {
                icon: 'assets/images/icons/lawsuit-details/user.svg',
                title: this._translate.instant(this.translations.LitigationRequest.litigationRequestContractType),
                value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.litigationRequestContractType.typeName ?? '',
                isDownload: false,
            },

        ]

    }



    fillfirstPartyData() {

        if (this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyFacility) {
            this.firstParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyFacility.code ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyFacility.arabicFacilityName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyFacility.commercialRegisterNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyFacility.facility700Number ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

        if (this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen) {

            this.firstParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.arbitrator.fullName),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.fullName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.arbitrator.identityNumber),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.identityNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.workPhone),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.workTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.homePhone),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.homeTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                    title: this._translate.instant(this.translations.arbitrator.fax),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.fax ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/location.svg',
                    title: this._translate.instant(this.translations.auth.email),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.email ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.auth.phoneNumber),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCitizen.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.firstPartyCapacity),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.firstPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

    }

    fillsecondPartyData() {

        if (this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyFacility) {
            this.secondParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityCode),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyFacility.code ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facilityName),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyFacility.arabicFacilityName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.commercialRegisterNumber),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyFacility.commercialRegisterNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.facility700Number),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyFacility.facility700Number ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

        if (this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen) {

            this.secondParty = [
                {
                    icon: 'assets/images/icons/lawsuit-details/user.svg',
                    title: this._translate.instant(this.translations.arbitrator.fullName),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.fullName ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.arbitrator.identityNumber),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.identityNumber ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.workPhone),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.workTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.arbitrator.homePhone),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.homeTelephone ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/send-square.svg',
                    title: this._translate.instant(this.translations.arbitrator.fax),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.fax ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/location.svg',
                    title: this._translate.instant(this.translations.auth.email),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.email ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/buliding.svg',
                    title: this._translate.instant(this.translations.auth.phoneNumber),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCitizen.mobile ?? '',
                    isDownload: false,
                },
                {
                    icon: 'assets/images/icons/lawsuit-details/call.svg',
                    title: this._translate.instant(this.translations.LitigationRequest.secondPartyCapacity),
                    value: this.litigationRequestForSessionDto?.litigationRequestShortDto?.contract.secondPartyCapacity ?? '',
                    isDownload: false,
                },
            ]
        }

    }


open(content: TemplateRef<any>) {
    this.modalService.open(content)
}

sendStatus(modal: any, litigationRequestArbitratorRecusalRequestStatus: ApproveRejectStatus) {
    this._arbitratorRecusalService.AddArbitrationReportArbitratorRecusalForArbitrator(
        { 
            id:this.litigationRequestForSessionDto?.request.id, 
            litigationRequestId: this.litigationId, 
            response: litigationRequestArbitratorRecusalRequestStatus 
        }).subscribe(res => {
             
        modal.dismiss()
        this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
        this.showAction = false;
        if(res.isDone && res.data){
            this.litigationRequestForSessionDto = res?.data;
            if(res.data.request.approveRejectStatus != null){
              this.showAction = res?.data?.request.approveRejectStatus == 1 ? false : true;
            }else{
              this.showAction = true;
            }
          this.fillData()
          this.fillfirstPartyData()
          this.fillsecondPartyData()
  
        }
    })
}

}
