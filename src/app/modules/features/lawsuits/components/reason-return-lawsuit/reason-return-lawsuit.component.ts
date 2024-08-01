import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseResponse } from '@app/core/models/base-response';
import { environment } from '@environment/environment';
import { takeUntil } from 'rxjs';
import { AuditNotesDto } from '../../models/audit-notes-dto.model';
import { LawsuitEditReasonsService } from '../../services/lawsuit-edit-reasons/lawsuit-edit-reasons.service';

@Component({
    selector: 'app-reason-return-lawsuit',
    templateUrl: './reason-return-lawsuit.component.html',
    styleUrl: './reason-return-lawsuit.component.scss'
})
export class ReasonReturnLawsuitComponent extends BaseComponent implements OnInit {
    _injector = inject(Injector);
    litigationDetails!: LawsuitItemDetails | null;
    isEditMode: boolean = false;
    private _activatedRoute = inject(ActivatedRoute);
    private _lawsuitEditReasonsService = inject(LawsuitEditReasonsService);
    baseUrl = `${environment.baseURL}/`;
    auditNotes: AuditNotesDto[] = []

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
        this._lawsuitEditReasonsService.GetAuditNotesById(this.litigationId).pipe(takeUntil(this.destroy$)).subscribe((res: BaseResponse<AuditNotesDto[]>) => {
            if (res.isDone && res.data) this.auditNotes = res.data
        })
    }
}
