import { Component } from '@angular/core';
import { TabsService } from '../../../../shared/services/tabs-service/tabs.service';
import { Tabs } from '../../../../shared/models/tabs.model';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    // providers:[TabsService]
})
export class HeaderComponent extends BaseComponent {

}
