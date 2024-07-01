import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { CommonModule } from '@angular/common';
import { Contract } from '../../models/lawsuit-details.model';

@Component({
  selector: 'app-lawsuit-defendant-data',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './lawsuit-defendant-data.component.html',
  styleUrl: './lawsuit-defendant-data.component.scss'
})
export class LawsuitDefendantDataComponent implements OnInit {
  _injector = inject(Injector);
  contract!: Contract | undefined;

  constructor(
    private _lawsuitRequestDetailsService: LawsuitRequestDetailsService
  ) {}

  ngOnInit(): void {
    this.observeLawsuitRequestDetailsSignal();
  }

  public get nationalAddress(): string {
    const address: string | undefined = this._lawsuitRequestDetailsService.litigationDetails()?.contractAddress
    return address || '--'
  }

  private observeLawsuitRequestDetailsSignal() {
    effect(() => {
      this.contract = this._lawsuitRequestDetailsService.litigationDetails()?.contract;
    },{
        injector: this._injector,
        allowSignalWrites: true
    })
  }  
}
