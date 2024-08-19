import { Component, inject } from '@angular/core';
import { TabsService } from '../../../../shared/services/tabs-service/tabs.service';
import { Tabs } from '../../../../shared/models/tabs.model';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    // providers:[TabsService]
})
export class HeaderComponent extends BaseComponent {
    /**
     * logout
     :void*/
    private _router = inject(Router);
    public logout(): void {
        localStorage.clear();
        this._router.navigate([Configuration.modules.auth]);
    }
}
