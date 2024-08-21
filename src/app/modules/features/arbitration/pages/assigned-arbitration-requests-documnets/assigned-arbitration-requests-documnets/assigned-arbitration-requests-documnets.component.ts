import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ArbitrationDocumentService } from '../../../services/arbitrator-document/arbitrator-document.service';
import { LitigationAcceptOrRejectDocumentDto } from '../../../models/arbitrator-document/arbitrator-document.model';

@Component({
  selector: 'app-assigned-arbitration-requests-documnets',
  templateUrl: './assigned-arbitration-requests-documnets.component.html',
  styleUrl: './assigned-arbitration-requests-documnets.component.scss'
})
export class AssignedArbitrationRequestsDocumnetsComponent extends BaseComponent implements OnInit {
  
  private _activatedRoute = inject(ActivatedRoute);
  litigationDocument: LitigationAcceptOrRejectDocumentDto | undefined;
  @Input() litigationData: any;
  documentId : number | undefined;

  documentCompination = [
    {
      documentId : 1,
      response: 1 , // Accept or Reject
      requestTypeId: [79] // Type
    },
    {
      documentId : 2,
      response: 2 ,
      requestTypeId: [79]
    },
    {
      documentId : 3,
      response: 1 ,
      requestTypeId: [82,87,66]
    },
    {
      documentId : 4,
      response: 2 ,
      requestTypeId: [82,87,66]
    },
  ]

  constructor(
    private _arbitrationDocumentService : ArbitrationDocumentService  ) {
    super();
     
   
  }

  ngOnInit(): void {
     
    console.log('Litigation Data:', this.litigationData);

    // this.litigationRequest = this.documentData();
    //this.observeActivatedRoute();

    this.GetLitigationAcceptanceOrRejectDocumentData(this.litigationData.litigationId,this.litigationData.requestId)
  }

  private observeActivatedRoute(): void {
    this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
        this.GetLitigationAcceptanceOrRejectDocumentData(res['id'],res['requestId']);
    })
}

GetLitigationAcceptanceOrRejectDocumentData(litigationId: string, requestId: string) {
   
    this._arbitrationDocumentService.GetLitigationAcceptanceOrRejectDocumentData(litigationId,requestId)
    .subscribe((res) => {
       
      if(res.isDone){
        this.litigationDocument = res.data
        this.selectDocumentId();

      }else{

      }
    })
  }
;


  selectDocumentId(){
     
    this.documentId = this.documentCompination.find(item => item.response === this.litigationDocument?.response 
      && item.requestTypeId.includes(this.litigationDocument.requestTypeId))?.documentId;
  }


}
