import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { LawsuitRequestDetailsService } from '../../services/lawsuit-request-details/lawsuit-request-details.service';
import { ReviwerNotes } from '../../models/lawsuit-details.model';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-lawsuit-reviewer-notes',
  templateUrl: './lawsuit-reviewer-notes.component.html',
  styleUrl: './lawsuit-reviewer-notes.component.scss'
})
export class LawsuitReviewerNotesComponent extends BaseComponent implements OnInit {

  _injector = inject(Injector);
  private _lawsuitRequestDetailsService= inject(LawsuitRequestDetailsService);
  reviwerNotes: ReviwerNotes[] | undefined;

  ngOnInit(): void {
    this.observeLawsuitRequestDetailsSignal();
  }


  observeLawsuitRequestDetailsSignal() {
    effect(() => {
      debugger;
        this.reviwerNotes = this._lawsuitRequestDetailsService.litigationDetails()?.workFlowProcessingLogs;
    }, {
        injector: this._injector,
        allowSignalWrites: true
    })
}

}
