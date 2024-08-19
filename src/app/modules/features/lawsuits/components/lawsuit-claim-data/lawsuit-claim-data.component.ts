import { CommonModule } from '@angular/common';
import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { Contract, LawsuitItemDetails } from '../../models/lawsuit-details.model';
import { environment } from '@environment/environment.development';
import { LawsuitTypeEnum } from '../../models/enums/lawsuit-type.model';

@Component({
  selector: 'app-lawsuit-claim-data',
  templateUrl: './lawsuit-claim-data.component.html',
  styleUrl: './lawsuit-claim-data.component.scss'
})
export class LawsuitClaimDataComponent extends BaseComponent implements OnInit {
  _injector = inject(Injector);
  litigationDetails!: LawsuitItemDetails | null;
  contract!: Contract | undefined;
  baseUrl = `${environment.baseURL}/`;
  requestOwnerType = [
    this.translations.lawsuits.createEditLawsuit.reconciliation,
    this.translations.lawsuits.createEditLawsuit.arbitration,
    this.translations.lawsuits.createEditLawsuit.ReconciliationAndArbitration
  ]  
  get LawsuitType() {
    return LawsuitTypeEnum;
  }
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
      this.contract = this._lawsuitRequestDetailsService.litigationDetails()?.contract;
      this.litigationDetails = this._lawsuitRequestDetailsService.litigationDetails();
        console.log(this._lawsuitRequestDetailsService.litigationDetails())
    },{
        injector: this._injector,
        allowSignalWrites: true
    })
  } 

  lawsuitTypeTranslation: { [key: number]: string } = {
    [LawsuitTypeEnum.Rent]: this.translations.lawsuits.lawsuitsList.ejar,
    [LawsuitTypeEnum.Properties]: this.translations.lawsuits.lawsuitsList.mullak,
    [LawsuitTypeEnum.Wafi]: this.translations.lawsuits.lawsuitsList.wafi,
    [LawsuitTypeEnum.RealEstateBrokerage]: this.translations.lawsuits.lawsuitsList.wasatah,
    [LawsuitTypeEnum.OtherServices]: this.translations.lawsuits.lawsuitsList.others,
  }
}
