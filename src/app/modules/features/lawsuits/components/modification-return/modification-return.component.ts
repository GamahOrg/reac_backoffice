import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { FileUploaderComponent } from '@app/shared/components/file-uploader/file-uploader.component';
import { SharedModule } from '@app/shared/shared.module';

@Component({
    selector: 'app-modification-return',
    standalone: true,
    imports: [
        SharedModule,
        FormsModule,
        FileUploaderComponent
    ],
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
