import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';

@Component({
  selector: 'app-lawsuit-claim-data',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lawsuit-claim-data.component.html',
  styleUrl: './lawsuit-claim-data.component.scss'
})
export class LawsuitClaimDataComponent extends BaseComponent implements OnInit {
  _injector = inject(Injector);
  litigationDetails!: LawsuitItemDetails | null;

  requestOwnerType = [
    this.translations.lawsuits.createEditLawsuit.reconciliation,
    this.translations.lawsuits.createEditLawsuit.arbitration,
    this.translations.lawsuits.createEditLawsuit.ReconciliationAndArbitration
  ]  

  constructor(
    private _lawsuitRequestDetailsService: LawsuitRequestDetailsService
  ) {
    super()
  }

  ngOnInit(): void {
    this.observeLawsuitRequestDetailsSignal();
  }

  private observeLawsuitRequestDetailsSignal() {
    effect(() => {
      this.litigationDetails = this._lawsuitRequestDetailsService.litigationDetails();
        console.log(this._lawsuitRequestDetailsService.litigationDetails())
    },{
        injector: this._injector,
        allowSignalWrites: true
    })
  } 
}
