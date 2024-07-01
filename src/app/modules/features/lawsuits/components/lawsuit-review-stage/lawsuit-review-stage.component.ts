import { Component, Injector, OnInit, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { LawsuitItemDetails } from '../../models/lawsuit-details.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lawsuit-review-stage',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './lawsuit-review-stage.component.html',
  styleUrl: './lawsuit-review-stage.component.scss'
})
export class LawsuitReviewStageComponent extends BaseComponent implements OnInit {
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
