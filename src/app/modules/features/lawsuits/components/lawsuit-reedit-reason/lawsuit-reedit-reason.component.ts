import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Accordion } from '@app/shared/models/accordion.model';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { TranslateService } from '@ngx-translate/core';
import { ReasonReturnLawsuitComponent } from '../reason-return-lawsuit/reason-return-lawsuit.component';

@Component({
    selector: 'app-lawsuit-reedit-reason',
    templateUrl: './lawsuit-reedit-reason.component.html',
    styleUrl: './lawsuit-reedit-reason.component.scss'
})
export class LawsuitReeditReasonComponent extends BaseComponent implements OnInit {
    accordionContent: Accordion = {
        accordionComponentList: [
            {
                title: this._translate.instant(this.translations.lawsuits.lawsuitDetails.reasonForReturningLawsuitForModification),
                icon: 'assets/images/icons/bookmarks.svg',
                component: ReasonReturnLawsuitComponent,
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
