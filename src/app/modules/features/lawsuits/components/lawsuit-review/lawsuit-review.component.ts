import { Component, Input, OnInit, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ReviewResult } from '../../models/enums/review-result.model';
import { LawsuitReiewRequestDto } from '../../models/lawsuit-reiew-request-dto';
import { LawsuitReviewService } from '../../services/lawsuit-review/lawsuit-review.service';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FileUploader } from '@app/shared/models/file-uploader.model';
import { WorkFlowStepEventShortDtos } from '../../models/work-flow-step-event-short-dtos.model';
import { GetWorkflowStepEventsForEmployeeDto } from '../../models/get-workflow-step-events-for-employee-dto.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-lawsuit-review',
    templateUrl: './lawsuit-review.component.html',
    styleUrl: './lawsuit-review.component.scss'
})
export class LawsuitReviewComponent extends BaseComponent implements OnInit {

    private _lawsuitReviewService = inject(LawsuitReviewService);
    private _toastrNotificationService = inject(ToastrNotificationService);
    private _translateService = inject(TranslateService);
    private _activatedRoute = inject(ActivatedRoute);
    private _router = inject(Router);
    lawsuitListURL: string = "/" + Configuration.modules.lawsuits + "/" + Configuration.pages.lawsuits.lawsuitList
    isReviewSubmitted : boolean = false;

    ReviewResult = ReviewResult;
    // rejectionDescription: string = '';
    charCounts: { [key: string]: number } = {
        subject: 0,
        notes: 0
    };
    requestId: string = ""

    subject: string = '';
    notes: string = '';



    workFlowProcessingLogFiles: string[] = []
    multiFileUploaderData: FileUploader = {
        multiple: true,
    } as FileUploader;
    buttonActions!: GetWorkflowStepEventsForEmployeeDto
    actionData!: WorkFlowStepEventShortDtos
    ngOnInit(): void {
        this.observeActivatedRoute();
    }

    private observeActivatedRoute(): void {
        this._activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((res: Params) => {
            this.requestId = res['id'];
            this.GetWorkflowStepEventsForEmployee();
        })
    };

    private GetWorkflowStepEventsForEmployee() {
        this._lawsuitReviewService.GetWorkflowStepEventsForEmployee(this.requestId).pipe(takeUntil(this.destroy$)).subscribe((res: BaseResponse<GetWorkflowStepEventsForEmployeeDto>) => {
            if (res.data && res.isDone){
                
                this.buttonActions = res.data
                
            }

        })
    }
    public updateCharCount(event: any, field: string) {
        this.charCounts[field] = event.target.value.length;
    }
    lawsuitReiewRequest!: LawsuitReiewRequestDto


    public create(): void {
        this.lawsuitReiewRequest = {
            // id: "00000000-0000-0000-0000-000000000000", // emplty id
            // createdOn: new Date(),
            // employeeId: "3afafe63-62e5-4bc9-a8b9-7713c42e7097",
            // requestId: this.requestId, // claim id 
            // workFlowStepEventId: this.actionData.id, // action id
            // showForApplicant: true,
            // sourceWorkFlowProcessingLogId: '15D87D0D-3CF4-4969-9C7E-933AEEA0E5F5',
            // workFlowStepId: '15154695-A36B-4FDA-8572-4874F661000E',
            // isWithNotes: true,
            // notes: '',
            // isFinished: true,
            // finishedOn: new Date(),
            // workFlowProcessingLogFiles: this.workFlowProcessingLogFiles
            requestId: this.requestId,
            // employeeId: "3afafe63-62e5-4bc9-a8b9-7713c42e7097",
            processingLogId: this.buttonActions.workFlowStepEventShortDtos[0].processingLogId,
            workflowStepEventId: this.actionData.id,
            notes: this.notes,
            uploadedFilesIds: this.workFlowProcessingLogFiles
        }
        
        this.isReviewSubmitted = true;
        if(!this.actionData.allowNotes ||  (this.actionData.allowNotes && this.notes.length !== 0)){
            
        this._lawsuitReviewService.create(this.lawsuitReiewRequest).pipe(takeUntil(this.destroy$)).subscribe((res: BaseResponse<any>) => {
            if (res.isDone) {
                this._toastrNotificationService.showSuccess(this._translateService.instant(this.translations.actions.done) + ' ' + this.actionData.eventName + ' ' + this._translateService.instant(this.translations.general.successfully));
                this.navigateToLawsuitList();
                // if (this.actionData.value == ReviewResult.LawsuitAcceptance) {
                //   this._toastrNotificationService.showSuccess("تم قبول الدعوى بنجاح");
                // } else if (this.actionData.value == ReviewResult.LawsuitRejection) {
                //   this._toastrNotificationService.showSuccess("تم رفض الدعوى ");
                // } else if (this.actionData.value == ReviewResult.RequestForArbitration) {
                //   this._toastrNotificationService.showSuccess("تم إرسال طلب المشارطة بنجاح");
                // } else if (this.actionData.value == ReviewResult.ReturnForModification) {
                //   this._toastrNotificationService.showSuccess("تم إعادة الدعوى للمدعي بنجاح");
                // }
            }
        })
        this.isReviewSubmitted = false;

        }
    }
    public navigateToLawsuitList(): void {
        this._router.navigate([this.lawsuitListURL]);
    }

    public updateActionData(button: WorkFlowStepEventShortDtos) {
        
        this.actionData = button;
        console.log("this.actionData", this.actionData)
    }

    public onFilesUploaded(fileData: any): void {
        fileData.eventRes.data.forEach((file: any) => this.workFlowProcessingLogFiles.push(file.id))
    }
}
