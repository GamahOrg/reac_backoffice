import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitizenRequestsRoutingModule } from './citizen-requests-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { TabsComponent } from '@app/shared/components/tabs/tabs.component';
import { NextAndPreviusButtonsComponent } from '@app/shared/components/next-and-previus-buttons/next-and-previus-buttons.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploaderComponent } from '@app/shared/components/file-uploader/file-uploader.component';
import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { AccordionComponent } from '@app/shared/components/accordion/accordion.component';
import { AngularMaterialModule } from '@app/shared/modules/angular-material/angular-material.module';
import { CitizenRequestService } from './services/citizen-request.service';
import { ReformerRequestListComponent } from './pages/reformer-request-list/reformer-request-list.component';
import { ArbitratorRequestListComponent } from './pages/arbitrator-request-list/arbitrator-request-list.component';

@NgModule({
  imports: [
    CommonModule,
    CitizenRequestsRoutingModule,
    SharedModule,
    TabsComponent,
    NextAndPreviusButtonsComponent,
    ReactiveFormsModule,
    FormsModule,
    FileUploaderComponent,
    NgbDropdownModule,
    NgbAccordionModule,
    PaginationComponent,
    BreadcrumbsComponent,
    AccordionComponent,
    AngularMaterialModule,
  ],
  declarations: [RequestListComponent, RequestDetailsComponent,ReformerRequestListComponent,ArbitratorRequestListComponent],
  providers: [
    CitizenRequestService,
  ]
})
export class CitizenRequestsModule { }
