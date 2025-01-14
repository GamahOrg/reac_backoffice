import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseComponent } from '../base/base.component';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-accordion',
    standalone: true,
    imports: [TranslateModule, CommonModule],
    templateUrl: './accordion.component.html',
    styleUrl: './accordion.component.scss'
})
export class AccordionComponent extends BaseComponent {
    @Input() isLarge: boolean = false

    constructor(public _accordionService: AccordionService) {
        super()        
    }
}
