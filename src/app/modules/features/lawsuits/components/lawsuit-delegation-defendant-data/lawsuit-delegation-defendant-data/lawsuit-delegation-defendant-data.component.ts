import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { environment } from '@environment/environment';
import { LawsuitRequestDetailsService } from '../../../services/lawsuit-request-details/lawsuit-request-details.service';

@Component({
  selector: 'app-lawsuit-delegation-defendant-data',
  templateUrl: './lawsuit-delegation-defendant-data.component.html',
  styleUrl: './lawsuit-delegation-defendant-data.component.scss'
})
export class LawsuitDelegationDefendantDataComponent extends BaseComponent implements OnInit {
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
          debugger;
             this.delegationData = this._lawsuitRequestDetailsService.litigationDetails()?.litigationDelegationRequests.find((item: { delegationParty: number; }) => item.delegationParty == 2)?.delegator;
         }, {
             injector: this._injector,
             allowSignalWrites: true
         })
     }

}
