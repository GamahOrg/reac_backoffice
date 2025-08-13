import { Component } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    // providers:[TabsService]
})
export class HeaderComponent extends BaseComponent {
  
}
