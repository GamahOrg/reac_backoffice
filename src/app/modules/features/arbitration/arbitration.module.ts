import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ArbitrationRoutingModule } from './arbitration-routing.module';
import { ArbitratorCountListComponent } from './components/arbitrator-count-list/arbitrator-count-list.component';
import { ArbitratorCountDetailsComponent } from './components/arbitrator-count-details/arbitrator-count-details.component';
import { BreadcrumbsComponent } from "../../../shared/components/breadcrumbs/breadcrumbs.component";
import { ArbitratorCountListService } from './services/arbitrator-count-list/arbitrator-count-list.service';
import { SharedModule } from '@app/shared/shared.module';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { ArbitrationService } from './services/arbitration.service';
import { ArbitrationSessionListComponent } from './pages/arbitration-session-list/arbitration-session-list.component';
import { LitigationRequestForReportExplanationService } from './services/litigation-request-for-report-explanation.service';
import { ArbitrationRequestComponent } from '../lawsuits/components/arbitration-request/arbitration-request.component';
import { AssignedArbitrationRequestsComponent } from './components/assigned-arbitration-requests/assigned-arbitration-requests/assigned-arbitration-requests.component';
import { TasksRequestsListService } from './services/task-request-list/tasks-requests-list.service';
import { ArbitratorCountDetailsService } from './services/Arbitrator-count-details/arbitrator-count-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignArbitorService } from './services/assign-arbitor.service';
import { ArbitratorListComponent } from './components/arbitrator-list/arbitrator-list.component';
import { AccordionComponent } from "../../../shared/components/accordion/accordion.component";
import { ArbitratorRecusalRequestsComponent } from './components/arbitrator-recusal-requests/arbitrator-recusal-requests/arbitrator-recusal-requests.component';
import { ArbitratorRecusalService } from './services/arbitrator-recusal/arbitrator-recusal.service';
import { ApproveOrRejectArbitratorRecusalRequestComponent } from './components/approve-or-reject-arbitrator-recusal-request/approve-or-reject-arbitrator-recusal-request.component';
import { AssignedArbitrationRequestsDocumnetsComponent } from './pages/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets/assigned-arbitration-requests-documnets.component';
import { NgxPrintModule } from 'ngx-print';
import { ArbitrationDocumentService } from './services/arbitrator-document/arbitrator-document.service';
import { ArbitrationRequestCorrespondencesListComponent } from './components/arbitration-request-correspondences-list/arbitration-request-correspondences-list.component';
import { ArbitrationRequestCorrespondencesDetailsComponent } from './components/arbitration-request-correspondences-details/arbitration-request-correspondences-details.component';
import { ArbitrationRequestCorrespondencesService } from './services/arbitration-request-correspondences/arbitration-request-correspondences.service';


@NgModule({
    declarations: [
        ArbitrationSessionListComponent,
        ArbitratorCountListComponent,
        ArbitratorCountDetailsComponent,
        AssignedArbitrationRequestsComponent,
        ArbitrationRequestComponent,
        ArbitratorListComponent,
        ArbitratorRecusalRequestsComponent,
        ApproveOrRejectArbitratorRecusalRequestComponent,
        AssignedArbitrationRequestsDocumnetsComponent,
        ArbitrationRequestCorrespondencesListComponent,
        ArbitrationRequestCorrespondencesDetailsComponent
    ],
    imports: [
        CommonModule,
        ArbitrationRoutingModule,
        BreadcrumbsComponent,
        SharedModule,
        PaginationComponent,
        SharedModule,
        PaginationComponent,
        ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        DatePipe,
        AccordionComponent,
        NgxPrintModule
    ],
    providers: [
        ArbitratorCountListService,
        ArbitrationService,
        LitigationRequestForReportExplanationService,
        FormsModule,
        ReactiveFormsModule,
        TasksRequestsListService,
        ArbitratorCountDetailsService,
        AssignArbitorService,
        ArbitratorRecusalService,
        ArbitrationDocumentService,
        ArbitrationRequestCorrespondencesService
    ],

})
export class ArbitrationModule {}
