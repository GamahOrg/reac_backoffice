import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Accordion } from '@app/shared/models/accordion.model';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { TranslateService } from '@ngx-translate/core';
import { LawsuitEventsService } from '../../services/lawsuit-events/lawsuit-events.service';
import { GetRequestLogForEmployeeResponseDto } from '../../models/get-request-log-for-employee-response-dto.model';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
// import { LawsuitReviewStageComponent } from '../lawsuit-review-stage/lawsuit-review-stage.component';
// import { LawsuitSubmissionAcceptanceStageComponent } from '../lawsuit-submission-acceptance-stage/lawsuit-submission-acceptance-stage.component';

@Component({
    selector: 'app-lawsuit-events',
    templateUrl: './lawsuit-events.component.html',
    styleUrl: './lawsuit-events.component.scss'
})
export class LawsuitEventsComponent extends BaseComponent implements OnInit {
    private _activatedRoute = inject(ActivatedRoute);
    private _lawsuitEventsService = inject(LawsuitEventsService);
    requestId: string = "";
    logList: GetRequestLogForEmployeeResponseDto[] = [];

    ngOnInit(): void {
        this.observeActivatedRoute();
    }
    private observeActivatedRoute(): void {
        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            this.requestId = res['id'];
            if (this.requestId && this.requestId.length > 0) {
                this.GetRequestLogForEmployee()
            }
        })
    };
    private GetRequestLogForEmployee(): void {
        this._lawsuitEventsService.GetRequestLogForEmployee(this.requestId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: BaseResponse<GetRequestLogForEmployeeResponseDto[]>) => {
                if (res.isDone && res.data) this.logList = res.data
            })
    }
}
