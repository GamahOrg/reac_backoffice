import { Component } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
    selector: 'app-modification-return',
    templateUrl: './modification-return.component.html',
    styleUrl: './modification-return.component.scss'
})
export class ModificationReturnComponent extends BaseComponent {
    subject: string = '';
    notes: string = '';

    charCounts: { [key: string]: number } = {
        subject: 0,
        notes: 0
    };

    public updateCharCount(event: any, field: string) {
        this.charCounts[field] = event.target.value.length;
    }
}
