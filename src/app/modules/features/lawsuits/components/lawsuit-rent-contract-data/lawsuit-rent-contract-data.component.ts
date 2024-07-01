import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { ApplicantCitizen, Contract } from '../../models/lawsuit-details.model';

@Component({
  selector: 'app-lawsuit-rent-contract-data',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lawsuit-rent-contract-data.component.html',
  styleUrl: './lawsuit-rent-contract-data.component.scss'
})
export class LawsuitRentContractDataComponent extends BaseComponent implements OnInit {
  _injector = inject(Injector);
  contract: Contract | undefined;
  applicantCitizen: ApplicantCitizen | undefined;

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
        this.contract = this._lawsuitRequestDetailsService.litigationDetails()?.contract;
        this.applicantCitizen = this._lawsuitRequestDetailsService.litigationDetails()?.applicantCitizen;
    },{
        injector: this._injector,
        allowSignalWrites: true
    })
  }
}
