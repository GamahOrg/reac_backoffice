import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Accordion } from '@app/shared/models/accordion.model';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { TranslateService } from '@ngx-translate/core';
import { LawsuitReviewStageComponent } from '../lawsuit-review-stage/lawsuit-review-stage.component';
import { LawsuitSubmissionAcceptanceStageComponent } from '../lawsuit-submission-acceptance-stage/lawsuit-submission-acceptance-stage.component';

@Component({
    selector: 'app-lawsuit-events',
    templateUrl: './lawsuit-events.component.html',
    styleUrl: './lawsuit-events.component.scss'
})
export class LawsuitEventsComponent extends BaseComponent implements OnInit {
    accordionContent: Accordion = {
        accordionComponentList: [
            {
                title: this._translate.instant(this.translations.lawsuits.lawsuitDetails.lawsuitSubmissionAndAcceptanceStage),
                icon: 'assets/images/icons/bookmarks.svg',
                component: LawsuitSubmissionAcceptanceStageComponent,
                isVisible: true,
                isRendered: true
            },
            {
                title: this._translate.instant(this.translations.lawsuits.lawsuitDetails.lawsuitReviewStage),
                icon: 'assets/images/icons/bookmarks.svg',
                component: LawsuitReviewStageComponent,
                isVisible: true,
                isRendered: true                
            }
        ]
    }

    constructor(
        private _accordionService: AccordionService,
        private _translate: TranslateService
    ) {
        super()
    }

    ngOnInit(): void {
        this._accordionService.updateAccordionContent(this.accordionContent)
    }
}
