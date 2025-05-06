import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { ArbitratorsDecisionsService } from '../../services/Arbitrators-decisions/arbitrators-decisions.service';
import { ArbitratorDecisionDetailsResponseDto } from '../../models/arbitrator-decision-details-response-dto.model';
import { BaseResponse } from '@app/core/models/base-response';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { StoppingReason } from '../../models/enums/stopping-reason.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ReformerArbitratorStatus } from '../../models/enums/reformer-arbitrator-status.model';
import { AddStopDecision } from '../../models/add-stop-decision.model';
import { AddFreeUpDecision } from '../../models/add-free-up-decision.model';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';

@Component({
    selector: 'app-arbitrator-decision-details',
    templateUrl: './arbitrator-decision-details.component.html',
    styleUrl: './arbitrator-decision-details.component.scss'
})
export class ArbitratorDecisionDetailsComponent extends BaseComponent implements OnInit {
    private _activatedRoute = inject(ActivatedRoute);
    private _router = inject(Router);
    private _formBuilder = inject(FormBuilder);
    private _translateService = inject(TranslateService);
    private _modalService = inject(NgbModal);
    private _breadcrumbService = inject(BreadcrumbService);
    private _toastrNotificationService = inject(ToastrNotificationService);

    private _arbitratorsDecisionsService = inject(ArbitratorsDecisionsService);

    citizenId!: string
    arbitratorDecisionDetails: ArbitratorDecisionDetailsResponseDto | null = null
    arbitratorDecisionsURL: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.stopAndReleaseArbitrator}/`


    minDate!: Date;
    
    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.stopAndReleaseArbitrator), link: `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.stopAndReleaseArbitrator}` },
            { label: this._translateService.instant(this.translations.CitizenRequest.arbitratorDecisionDetails), link: Configuration.pages.citizenRequests.arbitratorDecisionDetails }
        ])
    };


    addDecision = this._formBuilder.group({
        citizenId: [""],
        decisionDate: this._formBuilder.control<null | Date>(null, [Validators.required]),
        stoppingReason: this._formBuilder.control<null | number>(null),
        lateLitigationRequestNumber: ['']
    })


    //getter
    get stoppingReason() {
        return StoppingReason
    }
    get reformerArbitratorStatus() {
        return ReformerArbitratorStatus
    }
    get controls() {
        return this.addDecision.controls
    }
    showValidation: boolean = false
    stoppingReasonObj = this.fillKeysValueFromEnum(this.stoppingReason)

    stoppingReasonTranslation: { [key: number]: string } = {
        [StoppingReason.BadRating]: this.translations.CitizenRequest.BadRating,
        [StoppingReason.LateLitigationRequest]: this.translations.CitizenRequest.LateLitigationRequest,
        [StoppingReason.NonPaymentOfMembershipFees]: this.translations.CitizenRequest.NonPaymentOfMembershipFees,
    }
    ngOnInit(): void {
        this.minDate = new Date();
        this.updateBreadcrumb();
        this.observeActivatedRoute();
    }

    private observeActivatedRoute(): void {
        this._activatedRoute.params.pipe(takeUntil(this.destroy$))
            .subscribe((res: Params) => {
                console.log("res['id']", res['id']);
                this.citizenId = res['id'];
                if (this.citizenId) {
                    this.controls.citizenId.setValue(this.citizenId);
                    this.GetArbitratorsDecisionsByCitizenId();

                }
            })
    }

    private GetArbitratorsDecisionsByCitizenId() {
        this._arbitratorsDecisionsService.GetArbitratorsDecisionsByCitizenId(this.citizenId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: BaseResponse<ArbitratorDecisionDetailsResponseDto>) => {
                if (res.isDone && res.data) this.arbitratorDecisionDetails = res.data
            })
    };

    public open(content: TemplateRef<any>): void {
        this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
    }

    private addReformerFreeUpDecision(): void {
        if (this.addDecision.valid) {
            this.showValidation = false
            this._arbitratorsDecisionsService.AddArbitratorFreeUpDecision(this.addDecision.value as AddFreeUpDecision)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res: BaseResponse<any>) => {
                    if (res.isDone) {
                        this.showSuccess(this._translateService.instant(this.translations.arbitrator.requestFreeSuccessfully));
                        this.dismissModal();
                        this.navigateToList();
                    };
                });
        } else {
            this.showValidation = false
        };
    };
    private AddReformerStopDecision(): void {

        if (this.arbitratorDecisionDetails?.arbitratorStatusId == this.reformerArbitratorStatus.Certified) {
            this.controls.stoppingReason.setValidators(Validators.required);
            this.controls.stoppingReason.updateValueAndValidity()
        } else {
            this.controls.stoppingReason.removeValidators(Validators.required);
            this.controls.stoppingReason.updateValueAndValidity()
        }

        if (this.controls.stoppingReason.value == this.stoppingReason.LateLitigationRequest) {
            this.controls.lateLitigationRequestNumber.setValidators(Validators.required);
            this.controls.lateLitigationRequestNumber.updateValueAndValidity()
        } else {
            this.controls.lateLitigationRequestNumber.removeValidators(Validators.required);
            this.controls.lateLitigationRequestNumber.updateValueAndValidity()
        }


        if (this.addDecision.valid) {
            this.showValidation = false
            this._arbitratorsDecisionsService.AddArbitratorStopDecision(this.addDecision.value as AddStopDecision)
                .pipe(takeUntil(this.destroy$))
                .subscribe((res: BaseResponse<any>) => {
                    if (res.isDone) {
                        this.showSuccess(this._translateService.instant(this.translations.arbitrator.requestStoppedSuccessfully));
                        this.dismissModal();
                        this.navigateToList();
                    };
                });
        } else {
            this.showValidation = true
        };
    };

    public onClickSave(): void {
        if (this.arbitratorDecisionDetails?.arbitratorStatusId == ReformerArbitratorStatus.Stopped) {
            this.addReformerFreeUpDecision()
        } else {
            this.AddReformerStopDecision()
        };
    };

    // helper methods
    private dismissModal(): void {
        this._modalService.dismissAll()
    };

    private showSuccess(msg: string): void {
        this._toastrNotificationService.showSuccess(msg)
    };

    private fillKeysValueFromEnum(type: any) {
        return Object.keys(type).filter(t => isNaN(+t)).map(el => {
            return {
                key: el,
                value: Object(type)[el]
            }
        });
    }

    private navigateToList(): void {
        this._router.navigate([this.arbitratorDecisionsURL])
    }
}


