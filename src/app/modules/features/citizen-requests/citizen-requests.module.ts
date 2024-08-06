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
import { NgbAccordionModule, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbsComponent } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { AccordionComponent } from '@app/shared/components/accordion/accordion.component';
import { AngularMaterialModule } from '@app/shared/modules/angular-material/angular-material.module';
import { CitizenRequestService } from './services/citizen-request.service';
import { ReformerRequestListComponent } from './pages/reformer-request-list/reformer-request-list.component';
import { ArbitratorRequestListComponent } from './pages/arbitrator-request-list/arbitrator-request-list.component';
import { RequestToExtendSettlementPeriodListComponent } from './pages/request-to-extend-settlement-period-list/request-to-extend-settlement-period-list.component';
import { ShowRequestToExtendSettlementPeriodDetailsComponent } from './pages/show-request-to-extend-settlement-period-details/show-request-to-extend-settlement-period-details.component';
import { RequestToExtendSettlementPeriodService } from './services/request-to-extend-settlement-period.service';
import { StopAndReleaseReformerComponent } from './pages/stop-and-release-reformer/stop-and-release-reformer.component';
import { StopAndReleaseArbitratorComponent } from './pages/stop-and-release-arbitrator/stop-and-release-arbitrator.component';
import { ReformersDecisionsService } from './services/reformers-decisions/reformers-decisions.service';
import { ArbitratorsDecisionsService } from './services/Arbitrators-decisions/arbitrators-decisions.service';
import { ArbitratorDecisionDetailsComponent } from './pages/arbitrator-decision-details/arbitrator-decision-details.component';
import { ReformerDecisionDetailsComponent } from './pages/reformer-decision-details/reformer-decision-details.component';
import { SessionListComponent } from './pages/session-list/session-list.component';
import { LitigationRequestService } from './services/litigation-request.service';
import { ReformerListComponent } from './pages/reformer-list/reformer-list.component';
import { CitizenService } from './services/citizen.service';

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
  declarations: [
    RequestListComponent,
    RequestDetailsComponent,
    ReformerRequestListComponent,
    ArbitratorRequestListComponent,
    StopAndReleaseReformerComponent,
    StopAndReleaseArbitratorComponent,
    ArbitratorDecisionDetailsComponent,
    ReformerDecisionDetailsComponent,
    SessionListComponent,
    ReformerListComponent,
    RequestToExtendSettlementPeriodListComponent, 
    ShowRequestToExtendSettlementPeriodDetailsComponent
  ],
  providers: [
    CitizenRequestService,
    ReformersDecisionsService,
    ArbitratorsDecisionsService,
    LitigationRequestService,
    CitizenRequestService,
    RequestToExtendSettlementPeriodService,
    CitizenService
  ]
})
export class CitizenRequestsModule { }
