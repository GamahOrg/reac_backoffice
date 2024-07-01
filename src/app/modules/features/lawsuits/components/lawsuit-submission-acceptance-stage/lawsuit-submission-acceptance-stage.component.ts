import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';

@Component({
  selector: 'app-lawsuit-submission-acceptance-stage',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './lawsuit-submission-acceptance-stage.component.html',
  styleUrl: './lawsuit-submission-acceptance-stage.component.scss'
})
export class LawsuitSubmissionAcceptanceStageComponent extends BaseComponent implements OnInit {
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
