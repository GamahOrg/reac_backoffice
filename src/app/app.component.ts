import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./core/components/loader/loader.component";
import { TranslateService } from '@ngx-translate/core';
import { Configuration } from './core/configurations/shared.config';
import { Direction } from './core/models/enums/direction';
import { LanguageService } from './core/services/language/language.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, LoaderComponent]
})
export class AppComponent {
    currentLang: string = '';

    constructor(
        public translate: TranslateService,
        private _languageService: LanguageService,
        private router: Router
        // private _toastrNotificationService: ToastrNotificationService
    ) {
        // this._toastrNotificationService.showError("OH Shit!!")
        translate.addLangs(Configuration.languages);
        translate.setDefaultLang(Configuration.defaultLang);
        this._languageService.updateDirection(Configuration.defaultLang === 'en' ? Direction.ltr : Direction.rtl);

        // Setting <html> attributes
        this._languageService.currentLang.subscribe(lang => this.currentLang = lang);
        document.documentElement.lang = this.currentLang;
        document.dir = this.currentLang === 'en' ? 'ltr' : 'rtl';
        document.title = this.currentLang === 'ar' ? 'المركز السعودي للتحكيم العقاري' : 'REAC Portal';
    };
}
