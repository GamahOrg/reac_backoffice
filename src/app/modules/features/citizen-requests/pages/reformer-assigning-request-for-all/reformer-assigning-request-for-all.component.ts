import { Component, inject, OnInit, TemplateRef } from '@angular/core';
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
import { Configuration } from '@app/core/configurations/shared.config';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintService, PrintOptions } from 'ngx-print';
import { style } from '@angular/animations';

@Component({
    selector: 'app-reformer-assigning-request-for-all',
    templateUrl: './reformer-assigning-request-for-all.component.html',
    styleUrl: './reformer-assigning-request-for-all.component.scss'
})
export class ReformerAssigningRequestForAllComponent extends BaseComponent implements OnInit {
    reqList: Pagination<LitigationRequestMircoDtoReformer[]> = {} as Pagination<LitigationRequestMircoDtoReformer[]>;
    isAutoDistribution: boolean = false;
    subscriptions: Subscription[] = [];
    private _router = inject(Router);    
    
    
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
        private router: Router,
        private modalService :NgbModal,
        private printService :NgxPrintService
    ) { super(); }

    ngOnInit(): void {
        this.setBreadcrumb()
        this.GetLitigationRequestReformerAssigningRequests();
        this.watchPaginationActions();
        this.GetDistributionModeForReconciliation();
    }

    private setBreadcrumb(): void {
        this._breadcrumbService.updateBreadcrumbListContent([
            { label: this._translateService.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerassigningrequestforall}` },
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
    lawsuitFullDetailsURL: string = '/' + Configuration.modules.lawsuits + '/' + Configuration.pages.lawsuits.lawsuitFullDetails

     public navigateToEditOrDetails(lawsuitId: string | undefined) {
         
             
        this._router.navigate([this.lawsuitFullDetailsURL, lawsuitId]);

       
    }
    litigationData: any;
    public openFormModal(content: TemplateRef<any>, litigationId: string, requestId: string) {
      ;
      this.litigationData = { litigationId, requestId }
      const modalOptions: NgbModalOptions = {
          modalDialogClass: 'modal-dialog-scrollable',
      };

      const modalRef = this.modalService.open(content, modalOptions)
  }

  public printForm() {
     // Add print styles
     const printStyles = document.createElement('style');
     printStyles.innerHTML = `
         @media print {
             * { margin: 0 !important; padding: 0 !important; }
             body { margin: 0; padding: 0; }
             .img-fluid { 
                 display: block !important; 
                 width: 100% !important; 
                 max-width: none !important;
                 height: auto !important;
                 margin: 0 !important;
                 padding: 5px !important; 
                 box-sizing: border-box !important;
             }  
             #formPaper { width: 100%; margin: 0; padding: 0; }
         }
     `;
     document.head.appendChild(printStyles);
     
     document.title = '';
    const customPrintOptions: PrintOptions = new PrintOptions({
        printSectionId: 'formPaper',
        useExistingCss: true,
        printTitle: '.',
    
    });

    this.printService.print(customPrintOptions);
}
parentDownload: string = 'Hello from Parent!';
updateDownload() {
  // Update the message without an explicit event handler in the child
  this.parentDownload = 'Updated Message from Parent!';
}
}
