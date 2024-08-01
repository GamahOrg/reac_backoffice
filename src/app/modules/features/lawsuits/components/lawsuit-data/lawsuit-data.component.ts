import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Accordion } from '@app/shared/models/accordion.model';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { TranslateService } from '@ngx-translate/core';
import { LawsuitRentContractDataComponent } from '../lawsuit-rent-contract-data/lawsuit-rent-contract-data.component';
import { LawsuitDefendantDataComponent } from '../lawsuit-defendant-data/lawsuit-defendant-data.component';
import { LawsuitClaimDataComponent } from '../lawsuit-claim-data/lawsuit-claim-data.component';

@Component({
    selector: 'app-lawsuit-data',
    templateUrl: './lawsuit-data.component.html',
    styleUrl: './lawsuit-data.component.scss'
})
export class LawsuitDataComponent extends BaseComponent implements OnInit {
    accordionContent: Accordion = {
        accordionComponentList: [
            {
                title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.plaintiffData2),
                icon: 'assets/images/icons/bookmarks.svg',
                component: LawsuitRentContractDataComponent,
                isVisible: true,
                isRendered: true
            },
            {
                title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.dataOfTheDefendant),
                icon: 'assets/images/icons/bookmarks.svg',
                component: LawsuitDefendantDataComponent,
                isVisible: true,
                isRendered: true                
            },
            {
                title: this._translate.instant(this.translations.lawsuits.createEditLawsuit.claimData),
                icon: 'assets/images/icons/bookmarks.svg',
                component: LawsuitClaimDataComponent,
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
