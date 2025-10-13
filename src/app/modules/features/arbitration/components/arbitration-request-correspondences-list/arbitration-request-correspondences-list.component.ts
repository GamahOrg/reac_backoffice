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
import { Pagination } from '@app/shared/models/pagination.model';
import { Subscription, takeUntil } from 'rxjs';

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
    newPageNo: number = 1;
    pageCount: number = 0;
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }
    reqList: Pagination<CustomLitigationRequestMircoArbitratorDto[]> = {} as Pagination<CustomLitigationRequestMircoArbitratorDto[]>;
    subscriptions: Subscription[] = [];
    litigationRequests: CustomLitigationRequestMircoArbitratorDto[] | undefined = [];
    litigationData: any;

    get litigationRequestReformerAssigningRequestStatus() {
        return LitigationRequestReformerAssigningRequestStatus
    }

    ngOnInit() {
        this.updateBreadcrumb();
        this.list();
        this.watchPaginationActions();
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

    private list(): void {

         this.subscriptions.push(
                    this._arbitrationRequestCorrespondencesService.GetLitigationRequestArbitrationCorrespondence(this.pagintationData.currentPage, this.pagintationData.pageSize)
                        .subscribe((response) => {
                            const res = response?.data;
                            console.log(res);
                            if (res && res.results.length > 0) {
                                this.updateRequestList(res);
                            }
                        })
        
                )
    }

      private updateRequestList(TypeListView: Pagination<CustomLitigationRequestMircoArbitratorDto[]>): void {
           this.reqList = TypeListView;
           this.setPaginationData(
               this.reqList.pageSize,
               this.reqList.totalCount,
           );
       }
       private setPaginationData(pageSize: number, total: number): void {
           this.pagintationData.pageSize = pageSize
           this.pagintationData.totalCount = total
           this._paginationService.updatePaginationData(this.pagintationData);
       
         }
   
       private watchPaginationActions(): void {
           
           this.watchPagechanged();
           this.watchPaginationClicked();
         }
       
         private watchPagechanged(): void {
           this._paginationService.pageChanged
             .pipe(takeUntil(this.destroy$))
             .subscribe((pageNo) => {
               this.newPageNo = pageNo;
               this.loadNextPage(this.newPageNo);
       
             })
         }
       
         private watchPaginationClicked(): void {
           this._paginationService.pageClicked
             .pipe(takeUntil(this.destroy$))
             .subscribe((nextPage: number) => {
               if (this.pagintationData.currentPage != nextPage) {
                 this.loadNextPage(nextPage);
                 this.pagintationData.currentPage = this.newPageNo;
               }
             })
         }
   
         private loadNextPage(nextPage: number): void {
           this.pagintationData.currentPage = nextPage;
           this.list()
         }
    goToDetailsPage(requestId: string, taskId: string, hasAction: boolean) {
         ;
        this.router.navigate([this.detailsRequestUrl, requestId]);
    }

    

}
