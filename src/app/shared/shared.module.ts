import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TabsService } from './services/tabs-service/tabs.service';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NextAndPreviusButtonsService } from './services/next-and-previus-buttons/next-and-previus-buttons.service';
import { FileUploaderService } from './services/file-uploader/file-uploader.service';
import { BreadcrumbService } from './services/breadcrumb/breadcrumb.service';
import { PaginationService } from './services/pagination/pagination.service';
// import { ModalService } from '@app/shared/services/modal/modal.service';
// import { ModalComponent } from './components/modal/modal.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/components/filter/filter.component';
import { LookupsService } from './services/lookups/lookups.service';
import { NgSelectModule } from '@ng-select/ng-select';
// import { AngularMaterialModule } from './modules/angular-material/angular-material.module';

export const MY_MOMENT_FORMATS = {
    parseInput: 'DD/MM/YYYY HH:mm:ss',
    fullPickerInput: 'DD/MM/YYYY HH:mm:ss',
    datePickerInput: 'DD/MM/YYYY',
    timePickerInput: 'HH:mm:ss',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  };

@NgModule({
    declarations: [
        FilterComponent
    ],
    imports: [
        CommonModule,
        NgbModalModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        TranslateModule
        // ModalComponent
        // AngularMaterialModule
    ],
    exports: [
        TranslateModule,
        FormsModule,
        FilterComponent,
        // AngularMaterialModule
    ],
    providers: [
        TabsService,
        NextAndPreviusButtonsService,
        FileUploaderService,
        BreadcrumbService,
        PaginationService,
        LookupsService
        // ModalService
    ],
})
export class SharedModule {}
