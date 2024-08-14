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


@NgModule({
  declarations: [
    ArbitrationSessionListComponent,
    ArbitratorCountListComponent,
    ArbitratorCountDetailsComponent,
    AssignedArbitrationRequestsComponent,
    ArbitrationRequestComponent,
    ArbitratorListComponent,
    ArbitratorRecusalRequestsComponent,
    ApproveOrRejectArbitratorRecusalRequestComponent
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
    AccordionComponent
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
    ArbitratorRecusalService
],
 
})
export class ArbitrationModule { }
