import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Contract, ApplicantCitizen, LitigationRequestDelegationDataDto } from '../../models/lawsuit-details.model';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-lawsuit-delegation-data',
  templateUrl: './lawsuit-delegation-data.component.html',
  styleUrl: './lawsuit-delegation-data.component.scss'
})
export class LawsuitDelegationDataComponent extends BaseComponent implements OnInit {
    _injector = inject(Injector);
     delegationData: any | undefined;
    baseUrl = `${environment.baseURL}/`;
     
     constructor(
         public _lawsuitRequestDetailsService: LawsuitRequestDetailsService,
     ) {
         super()
     }
 
     ngOnInit(): void {
         this.observeLawsuitRequestDetailsSignal();
     }
 
     private observeLawsuitRequestDetailsSignal() {
         effect(() => {
             //this.delegationData = this._lawsuitRequestDetailsService.litigationDetails()?.delegator;
             this.delegationData = this._lawsuitRequestDetailsService.litigationDetails()?.litigationDelegationRequests.find((item: { delegationParty: number; }) => item.delegationParty == 1)?.delegator;

         }, {
             injector: this._injector,
             allowSignalWrites: true
         })
     }

}
