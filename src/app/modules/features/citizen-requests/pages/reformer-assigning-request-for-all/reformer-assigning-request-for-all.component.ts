import { Component, OnInit } from '@angular/core';
import { LitigationRequestMircoDtoReformer } from '../../models/litigation-request-mirco-dto-reformer';
import { pagination, Pagination } from '@app/shared/models/pagination.model';
import { Subscription, takeUntil } from 'rxjs';
import { RequestToExtendSettlementPeriodService } from '../../services/request-to-extend-settlement-period.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Router } from '@angular/router';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { LitigationRequestReformerAssigningRequestStatus } from '../../models/enums/litigation-request-reformer-assigning-request-status';
import { SystemSettingsService } from '@app/shared/services/system-settings/system-settings.service';
import { DepartmentDistributionMode, DepartmentType } from '@app/core/models/enums/department-type.model';

@Component({
    selector: 'app-reformer-assigning-request-for-all',
    templateUrl: './reformer-assigning-request-for-all.component.html',
    styleUrl: './reformer-assigning-request-for-all.component.scss'
})
export class ReformerAssigningRequestForAllComponent extends BaseComponent implements OnInit {
    reqList: Pagination<LitigationRequestMircoDtoReformer[]> = {} as Pagination<LitigationRequestMircoDtoReformer[]>;
    isAutoDistribution: boolean = false;
    subscriptions: Subscription[] = [];
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
    newPageNo: number = 1;
        pageCount: number = 0;
        pagintationData: pagination = {
          currentPage: 1,
          // pageCount: 0,
          pageSize: 10,
          totalCount: 0,
        };
    
    ascending:boolean=false;
    constructor(
        private _requestToExtendSettlementPeriodService: RequestToExtendSettlementPeriodService,
        private _paginationService: PaginationService,
        private _breadcrumbService: BreadcrumbService,
        private _translateService: TranslateService,
        private _systemSettingsService: SystemSettingsService,

        private router: Router
    ) { super(); }

    ngOnInit(): void {
        this.setBreadcrumb()
        this.GetLitigationRequestReformerAssigningRequests();
        this.watchPaginationActions();
        this.GetDistributionModeForReconciliation();
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
            { label: this._translateService.instant(this.translations.layout.sidebar.arbitratorRequestTaskList) }
        ])
    }

    GetLitigationRequestReformerAssigningRequests(): void {

        this.subscriptions.push(
            this._requestToExtendSettlementPeriodService.GetLitigationRequestReformerAssigningRequestsAll(this.pagintationData.currentPage, this.pagintationData.pageSize,this.ascending)
                .subscribe((res: Pagination<LitigationRequestMircoDtoReformer[]> | null) => {
                    if (res && res.results.length > 0)
                        this.updateRequestList(res as Pagination<LitigationRequestMircoDtoReformer[]>)
                })

        )
    }

    GetDistributionModeForReconciliation(){
      this._systemSettingsService.GetDistributionModeByDepartmentType(DepartmentType.Reconciliation)
      .subscribe(res => {
        
        if(res.isDone){
          if(res.data == DepartmentDistributionMode.AutoDistribution){
            this.isAutoDistribution = true;
          }else if(res.data == DepartmentDistributionMode.ManualDistribution){
            this.isAutoDistribution = false;

          }
        }
      })
    }
    
    ToggleAutoDistributionOnAndOff(){
      
      this.isAutoDistribution = !this.isAutoDistribution;

      let status = this.isAutoDistribution == true ? DepartmentDistributionMode.AutoDistribution : DepartmentDistributionMode.ManualDistribution;
      this._systemSettingsService.ToggleAutoDistributionOnAndOff(DepartmentType.Reconciliation,status)
      .subscribe(res => {
        
        if(res.isDone){
          if(res.data == DepartmentDistributionMode.AutoDistribution){
            this.isAutoDistribution = true;
          }else if(res.data == DepartmentDistributionMode.ManualDistribution){
            this.isAutoDistribution = false;

          }
        }
      })
    }



    private updateRequestList(TypeListView: Pagination<LitigationRequestMircoDtoReformer[]>): void {
        this.reqList = TypeListView;
        this.setPaginationData(
            this.reqList.pageSize,
            this.reqList.totalCount,
        );
    }
    // private setPaginationData(pageSize: number, total: number): void {
    //     this.pagintationData.pageSize = pageSize
    //     this.pagintationData.totalCount = total
    //     this._paginationService.updatePaginationData(this.pagintationData);
    // }

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
        this.GetLitigationRequestReformerAssigningRequests()
      }


    orderList(event:any){
        var ascendingValue= event.target.value;
        console.log(ascendingValue)
      if(ascendingValue == "true"){
        this.ascending=true;
        this.GetLitigationRequestReformerAssigningRequests();
      }
      else{
        this.ascending=false;
        this.GetLitigationRequestReformerAssigningRequests();
      }
    }
}
