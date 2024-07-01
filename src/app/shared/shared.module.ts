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
// import { AngularMaterialModule } from './modules/angular-material/angular-material.module';



@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgbModalModule,
        // ModalComponent
        // AngularMaterialModule
    ],
    exports: [
        TranslateModule,
        // AngularMaterialModule
    ],
    providers: [
        TabsService,
        NextAndPreviusButtonsService,
        FileUploaderService,
        BreadcrumbService,
        PaginationService,
        // ModalService
    ],
})
export class SharedModule {}
