import { Component, effect, inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { CustomLitigationRequestMircoArbitratorDto, LitigationRequestMircoDto } from '../../../models/arbitration-request.model';
import { LitigationRequestReformerAssigningRequestStatus } from '../../../models/enums/litigation-request-reformer-assigning-request-status';
import { TasksRequestsListService } from '../../../services/task-request-list/tasks-requests-list.service';
import { ArbitratorAssigningRequestType } from '../../../models/enums/arbitration-request-contract-type';

@Component({
  selector: 'app-assigned-arbitration-requests',
  templateUrl: './assigned-arbitration-requests.component.html',
  styleUrl: './assigned-arbitration-requests.component.scss'
})
export class AssignedArbitrationRequestsComponent extends BaseComponent implements OnInit {
  private _tasksRequestsListService = inject(TasksRequestsListService)
  private _paginationService = inject(PaginationService)
  private _injector = inject(Injector)
  private router = inject(Router)

  detailsRequestUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequests}`
  page = 1;
  pageSize = 10;
  collectionSize!: number;
  pagintationData = {
    currentPage: this.page,
    pageSize: 0,
    totalCount: 0,
  }

  litigationRequests: CustomLitigationRequestMircoArbitratorDto[] | undefined = [];


  get litigationRequestReformerAssigningRequestStatus() {
    return LitigationRequestReformerAssigningRequestStatus
  }

  ngOnInit() {
    this.observePageChange()
  }

  localization = {
    ///<summary>لم يتم الرد</summary>
    [LitigationRequestReformerAssigningRequestStatus.None]: this.translations.TasksRequestsList.None,
    ///<summary>تمت الموافقة</summary>
    [LitigationRequestReformerAssigningRequestStatus.Approve]: this.translations.TasksRequestsList.Approve,
    ///<summary>تم الرفض</summary>
    [LitigationRequestReformerAssigningRequestStatus.Reject]: this.translations.TasksRequestsList.Reject,
    ///<summary>تم الإلغاء</summary>
    [LitigationRequestReformerAssigningRequestStatus.Cancelled]:this.translations.TasksRequestsList.Cancelled,
  }

  arbitratorAssigningRequestType = {
    ///<summary>لم يتم الرد</summary>
    [ArbitratorAssigningRequestType.Arbitrator]: this.translations.ArbitratorAssigningRequestType.arbitrator,
    ///<summary>تمت الموافقة</summary>
    [ArbitratorAssigningRequestType.ArbitratorsChairman]: this.translations.ArbitratorAssigningRequestType.arbitratorsChairman,
   
  }
  private list(pageIndex: number, pageSize: number): void {
    this._tasksRequestsListService.getLitigationRequestArbitrationAssigningRequests(pageIndex, pageSize).subscribe({
      next: (res) => {
        debugger;

        this.litigationRequests = res?.data?.results

        this.collectionSize = res?.data?.totalCount || 0;
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
    this.pagintationData.currentPage = currentPage
    this.pagintationData.pageSize = pageSize
    this.pagintationData.totalCount = totalCount
    this._paginationService.updatePaginationData(this.pagintationData);
  }


}
