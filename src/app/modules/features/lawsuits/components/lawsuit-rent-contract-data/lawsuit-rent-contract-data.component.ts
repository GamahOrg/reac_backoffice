import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { ApplicantCitizen, Contract, LitigationRequestDelegationDataDto } from '../../models/lawsuit-details.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-lawsuit-rent-contract-data',
    standalone: true,
    imports: [
        CommonModule,
        TranslateModule
    ],
    templateUrl: './lawsuit-rent-contract-data.component.html',
    styleUrl: './lawsuit-rent-contract-data.component.scss'
})
export class LawsuitRentContractDataComponent extends BaseComponent implements OnInit {
    _injector = inject(Injector);
    contract: Contract | undefined;
    applicantCitizen: ApplicantCitizen | undefined;
    delegationDate: LitigationRequestDelegationDataDto | undefined;
    
    constructor(
        private _lawsuitRequestDetailsService: LawsuitRequestDetailsService,
    ) {
        super()
    }

    ngOnInit(): void {
        this.observeLawsuitRequestDetailsSignal();
    }

    private observeLawsuitRequestDetailsSignal() {
        effect(() => {
            this.delegationDate = this._lawsuitRequestDetailsService.litigationDetails()?.delegator;
            this.contract = this._lawsuitRequestDetailsService.litigationDetails()?.contract;
            this.applicantCitizen = this._lawsuitRequestDetailsService.litigationDetails()?.applicantCitizen;
        }, {
            injector: this._injector,
            allowSignalWrites: true
        })
    }
}
