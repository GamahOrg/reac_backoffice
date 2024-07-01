import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reason-return-lawsuit',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './reason-return-lawsuit.component.html',
  styleUrl: './reason-return-lawsuit.component.scss'
})
export class ReasonReturnLawsuitComponent extends BaseComponent implements OnInit {
  _injector = inject(Injector);
  litigationDetails!: LawsuitItemDetails | null;
  
  constructor(
    private _lawsuitRequestDetailsService: LawsuitRequestDetailsService
  ) {
    super();
  }

  ngOnInit(): void {
      this.observeLawsuitRequestDetailsSignal();
  }

  private observeLawsuitRequestDetailsSignal() {
    effect(() => {
      this.litigationDetails = this._lawsuitRequestDetailsService.litigationDetails()
    },{
      injector: this._injector,
      allowSignalWrites: true
    })
  } 
}
