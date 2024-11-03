import { AngularMaterialModule } from './../../../shared/modules/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawsuitsRoutingModule } from './lawsuits-routing.module';
import { LawsuitListComponent } from './pages/lawsuits-list/lawsuits-list.component';
import { LawsuitDetailsComponent } from './pages/lawsuit-details/lawsuit-details.component';
import { SharedModule } from '../../../shared/shared.module';
import { TabsComponent } from '../../../shared/components/tabs/tabs.component';

import { NgbAccordionModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ModalService } from '@app/core/services/modal/modal.service';
import { NextAndPreviusButtonsComponent } from "../../../shared/components/next-and-previus-buttons/next-and-previus-buttons.component";
import { FileUploaderComponent } from "../../../shared/components/file-uploader/file-uploader.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { BreadcrumbsComponent } from "../../../shared/components/breadcrumbs/breadcrumbs.component";
import { AccordionComponent } from '@app/shared/components/accordion/accordion.component';
import { LawsuitDataComponent } from './components/lawsuit-data/lawsuit-data.component';
import { LawsuitListService } from './services/lawsuit-list/lawsuit-list.service';
import { LawsuitRequestDetailsService } from './services/lawsuit-request-details/lawsuit-request-details.service';
import { AccordionService } from '@app/shared/services/accordion/accordion.service';
// import { ArbitrationRequestComponent } from './components/arbitration-request/arbitration-request.component';
import { LawsuitEventsComponent } from './components/lawsuit-events/lawsuit-events.component';
import { LawsuitReeditReasonComponent } from './components/lawsuit-reedit-reason/lawsuit-reedit-reason.component';
import { LawsuitReviewComponent } from './components/lawsuit-review/lawsuit-review.component';
import { LawsuitReviewService } from './services/lawsuit-review/lawsuit-review.service';
import { ReasonReturnLawsuitComponent } from './components/reason-return-lawsuit/reason-return-lawsuit.component';
import { ModificationReturnComponent } from './components/modification-return/modification-return.component';
import { LawsuitEditReasonsService } from './services/lawsuit-edit-reasons/lawsuit-edit-reasons.service';
import { AuditngListArbitrationComponent } from './pages/auditng-list-arbitration/auditng-list-arbitration.component';
import { AuditngListReconciliationComponent } from './pages/auditng-list-reconciliation/auditng-list-reconciliation.component';
import { LawsuitClaimDataComponent } from './components/lawsuit-claim-data/lawsuit-claim-data.component';
import { LawsuitEventsService } from './services/lawsuit-events/lawsuit-events.service';
import { LawsuitReviewerNotesComponent } from './components/lawsuit-reviewer-notes/lawsuit-reviewer-notes.component';
import { LitigationRequestCorrespondenceListComponent } from './components/litigation-request-correspondence-list/litigation-request-correspondence-list.component';
import { LitigationRequestCorrespondencesService } from './services/litigation-request-correspondence/litigation-request-correspondence-service';
import { LitigationRequestCorrespondenceDetailsComponent } from './components/litigation-request-correspondence-details/litigation-request-correspondence-details.component';

@NgModule({
    declarations: [
        LawsuitListComponent,
        LawsuitDetailsComponent,
        LawsuitDataComponent,
        LawsuitEventsComponent,
        LawsuitReeditReasonComponent,
        // ArbitrationRequestComponent,
        LawsuitReviewComponent,
        ReasonReturnLawsuitComponent,
        AuditngListArbitrationComponent,
        AuditngListReconciliationComponent,
        LawsuitClaimDataComponent,
        LawsuitReviewerNotesComponent,
        LitigationRequestCorrespondenceListComponent,
        LitigationRequestCorrespondenceDetailsComponent
    ],
    providers: [
        LawsuitListService,
        LawsuitRequestDetailsService,
        AccordionService,
        LawsuitReviewService,
        LawsuitEditReasonsService,
        LawsuitEventsService,
        LitigationRequestCorrespondencesService
    ],
    imports: [
        CommonModule,
        SharedModule,
        LawsuitsRoutingModule,
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
        ModificationReturnComponent
        // NgbPaginationModule,
    ],
    exports: [AccordionComponent]
})
export class LawsuitsModule {}
