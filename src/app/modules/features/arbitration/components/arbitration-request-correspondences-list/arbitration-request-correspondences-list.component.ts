import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxPrintService } from 'ngx-print';
import { CustomLitigationRequestMircoArbitratorDto } from '../../models/arbitration-request.model';
import { ArbitratorAssigningRequestType } from '../../models/enums/arbitration-request-contract-type';
import { LitigationRequestReformerAssigningRequestStatus } from '../../models/enums/litigation-request-reformer-assigning-request-status';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { TasksRequestsListService } from '../../services/task-request-list/tasks-requests-list.service';
import { ArbitrationRequestCorrespondencesService } from '../../services/arbitration-request-correspondences/arbitration-request-correspondences.service';

@Component({
  selector: 'app-arbitration-request-correspondences-list',
  templateUrl: './arbitration-request-correspondences-list.component.html',
  styleUrl: './arbitration-request-correspondences-list.component.scss'
})
export class ArbitrationRequestCorrespondencesListComponent extends BaseComponent implements OnInit {


  private _tasksRequestsListService = inject(TasksRequestsListService)
  private _arbitrationRequestCorrespondencesService = inject(ArbitrationRequestCorrespondencesService)
    private _paginationService = inject(PaginationService)
    private _injector = inject(Injector)
    private router = inject(Router)
    private _breadcrumbService = inject(BreadcrumbService)
    private _translateService = inject(TranslateService)
    private modalService = inject(NgbModal)
    private printService = inject(NgxPrintService)
    detailsRequestUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.arbitrationRequestCorrespondencesDetails}`
    page = 1;
    pageSize = 10;
    collectionSize!: number;
    pagintationData = {
        currentPage: this.page,
        pageSize: 0,
        totalCount: 0,
        from: 0,
        to: 0,
    }

    litigationRequests: CustomLitigationRequestMircoArbitratorDto[] | undefined = [];
    litigationData: any;

    get litigationRequestReformerAssigningRequestStatus() {
        return LitigationRequestReformerAssigningRequestStatus
    }

    ngOnInit() {
        this.observePageChange();
        this.updateBreadcrumb();
    }

    private updateBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            {
                label: this._translateService.instant(this.translations.layout.sidebar.home),
                link: '/'
            },
            {
                label: this._translateService.instant(this.translations.layout.sidebar.arbitrationRequestCorrespondences),
                link: `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}`
            }
        ])
    }

    localization = {
        ///<summary>لم يتم الرد</summary>
        [LitigationRequestReformerAssigningRequestStatus.None]: this.translations.TasksRequestsList.None,
        ///<summary>تمت الموافقة</summary>
        [LitigationRequestReformerAssigningRequestStatus.Approve]: this.translations.TasksRequestsList.Approve,
        ///<summary>تم الرفض</summary>
        [LitigationRequestReformerAssigningRequestStatus.Reject]: this.translations.TasksRequestsList.Reject,
        ///<summary>تم الإلغاء</summary>
        [LitigationRequestReformerAssigningRequestStatus.Cancelled]: this.translations.TasksRequestsList.Cancelled,
    }
    arbitratorAssigningRequestType = {
        ///<summary>لم يتم الرد</summary>
        [ArbitratorAssigningRequestType.Arbitrator]: this.translations.ArbitratorAssigningRequestType.arbitrator,
        ///<summary>تمت الموافقة</summary>
        [ArbitratorAssigningRequestType.ArbitratorsChairman]: this.translations.ArbitratorAssigningRequestType.arbitratorsChairman,

    }

    private list(pageIndex: number, pageSize: number): void {
        this._arbitrationRequestCorrespondencesService.GetLitigationRequestArbitrationCorrespondence(pageIndex, pageSize).subscribe({
            next: (res) => {
                 ;

                this.litigationRequests = res?.data?.results;

                this.collectionSize = res?.data?.results.length || 0;
                this.setPaginationData(this.page, this.pageSize, this.collectionSize)
            }
        })
    }

    private observePageChange(): void {
        effect(() => {
            this.page = this._paginationService.currentPage();
            this.list(this.page, this.pageSize)
        }, {
            injector: this._injector,
            allowSignalWrites: true
        });
    }

    private setPaginationData(currentPage: number, pageSize: number, totalCount: number): void {
        const from = (currentPage - 1) * pageSize + 1;
        const to = Math.min(currentPage * pageSize, totalCount);

        this.pagintationData = {
            currentPage,
            pageSize,
            totalCount,
            from,
            to,
        };

        this._paginationService.updatePaginationData(this.pagintationData);
    }

    goToDetailsPage(requestId: string, taskId: string, hasAction: boolean) {
         ;
        this.router.navigate([this.detailsRequestUrl, requestId]);
    }

    

}
