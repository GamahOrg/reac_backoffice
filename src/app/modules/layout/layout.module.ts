import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LanguageComponent } from './components/language/language.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SearchComponent } from './components/search/search.component';
import { AccountComponent } from './components/account/account.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SharedModule } from '../../shared/shared.module';
import { TabsComponent } from "../../shared/components/tabs/tabs.component";
import { TabsService } from '../../shared/services/tabs-service/tabs.service';
import { NgbDropdownModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationsService } from './services/notifications/notifications.service';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';


@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        AccountComponent,
        LanguageComponent,
        NotificationsComponent,
        SearchComponent,
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        SharedModule,
        TabsComponent,
        NgbTooltip,
        TranslateModule,
        NgbDropdownModule,
        PaginationComponent,
        
    ],
    providers: [
        NotificationsService
    ]
})
export class LayoutModule { }
