import { Component } from '@angular/core';
import { MenuItem } from '../../models/menu-item.model';
import { Configuration } from '../../../../core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { translations } from 'translation-keys.enum';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent extends BaseComponent {
    isCollapsed: boolean | undefined;

    menuItems: MenuItem[] = [
        {
            id: 'home-link',
            title: this.translate.instant(translations.layout.sidebar.home),
            icon: 'assets/images/icons/sidebar/home.svg',
            url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitList,
        },
        {
            id: 'claims-link',
            title: this.translate.instant(translations.layout.sidebar.lawsuitsList),
            icon: 'assets/images/icons/sidebar/menu.svg',
            url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitList,
            children: [
                {
                    id: 'new-lawsuits-link',
                    title: this.translate.instant(translations.layout.sidebar.newLawsuitsList),
                    icon: '',
                    url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitList,
                },
                {
                    id: 'new-lawsuits-link',
                    title: this.translate.instant(translations.layout.sidebar.completedLawsuitsList),
                    icon: '',
                    url: '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.editLawsuit,
                },
            ]
        },
        {
            id: 'profile-link',
            title: this.translate.instant(translations.layout.sidebar.profile),
            icon: 'assets/images/icons/sidebar/profile-2user.svg',
            url: 'profile',
        },
        {
            id: 'setting-link',
            title: this.translate.instant(translations.layout.sidebar.settings),
            icon: 'assets/images/icons/sidebar/setting.svg',
            url: 'setting',
        }
    ];

    constructor(private translate: TranslateService) {
        super();
        this.isCollapsed = window.innerWidth < 992;
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}
