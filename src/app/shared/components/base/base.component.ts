import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { translations } from 'translation-keys.enum';

@Component({
    selector: 'app-base',
    standalone: true,
    imports: [],
    templateUrl: './base.component.html',
    styleUrl: './base.component.scss'
})
export class BaseComponent implements OnDestroy {
    translations = translations;


    
    destroy$ = new Subject<void>();
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.destroy$.unsubscribe();
    }

}
