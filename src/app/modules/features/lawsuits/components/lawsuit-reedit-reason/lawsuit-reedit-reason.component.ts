import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Accordion } from '@app/shared/models/accordion.model';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { TranslateService } from '@ngx-translate/core';
import { ReasonReturnLawsuitComponent } from '../reason-return-lawsuit/reason-return-lawsuit.component';
import { ActivatedRoute, Params } from '@angular/router';
import { LawsuitEditReasonsService } from '../../services/lawsuit-edit-reasons/lawsuit-edit-reasons.service';
import { environment } from '@environment/environment.development';
import { AuditNotesDto } from '../../models/audit-notes-dto.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';

@Component({
    selector: 'app-lawsuit-reedit-reason',
    templateUrl: './lawsuit-reedit-reason.component.html',
    styleUrl: './lawsuit-reedit-reason.component.scss'
})
export class LawsuitReeditReasonComponent extends BaseComponent implements OnInit {
    private _activatedRoute = inject(ActivatedRoute);
    private _lawsuitEditReasonsService = inject(LawsuitEditReasonsService);
    baseUrl = `${environment.baseURL}/`;
    auditNotes!: AuditNotesDto[]
  
    litigationId: string = ""
    ngOnInit(): void {
      this.observeActivatedRoute()
    }
  
    private observeActivatedRoute(): void {
      this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
        this.litigationId = res['id']
        this.GetAuditNotesById()
      })
    };
    private GetAuditNotesById() {
      this._lawsuitEditReasonsService.GetAuditNotesById(this.litigationId).pipe(takeUntil(this.destroy$)).subscribe((res: BaseResponse<AuditNotesDto[]>)=>{
        if(res.isDone && res.data) this.auditNotes = res.data
        console.log("this.auditNotes", this.auditNotes);
        
      })
    }
}
