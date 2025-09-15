import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { LitigationRequestParty } from '@app/modules/features/arbitration/models/enums/arbitrator-recusal';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { pagination, Pagination } from '@app/shared/models/pagination.model';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { DelegatorsStopModify, GetLitigationRequestWithoutDelegator } from '../../../models/delegation-request.model';
import { DelegationRequestService } from '../../../services/delegation-request.service';

@Component({
  selector: 'app-delegators-assign-list',
  templateUrl: './delegators-assign-list.component.html',
  styleUrl: './delegators-assign-list.component.scss'
})
export class DelegatorsAssignListComponent extends BaseComponent implements OnInit {

  newPageNo: number = 1;
        pageCount: number = 0;
        pagintationData: pagination = {
          currentPage: 1,
          pageSize: 10,
          totalCount: 0,
        };
    
  litigationRequests: Pagination<GetLitigationRequestWithoutDelegator[]> = {} as Pagination<GetLitigationRequestWithoutDelegator[]>;
  inActivedelegators: DelegatorsStopModify[] = {} as DelegatorsStopModify[];
  assignDelegationRequestForm = this._formBuilder.group({
          delegationRequestId: ['', Validators.required],
      })
  
    ngOnInit(): void {
      this.watchPaginationActions();
  
      this.GetLitigationRequestsWithoutDelegatorsForAdmin();
    }
  
    constructor(
      private delegationRequestsService: DelegationRequestService,
      private _paginationService: PaginationService,
      private modalService: NgbModal,
      private _formBuilder: FormBuilder,
      private toastrNotificationService: ToastrNotificationService,
      private _translate: TranslateService,
      
    ) {
      super();
    }
  
    get controls(){
      return this.assignDelegationRequestForm.controls;
    }
  
    GetLitigationRequestsWithoutDelegatorsForAdmin(): void {
        this.delegationRequestsService.GetLitigationRequestsWithoutDelegatorsForAdmin(this.pagintationData.currentPage, this.pagintationData.pageSize)
          .pipe(takeUntil(this.destroy$)) 
          .subscribe((res: any) => {
            if (res) {
              
              this.litigationRequests = res.data as Pagination<GetLitigationRequestWithoutDelegator[]>;
              this.pageCount = res.data.pageCount;
              this.setPaginationData(res.data.pageSize, res.data.totalCount);
            }
          })
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
        this.GetLitigationRequestsWithoutDelegatorsForAdmin()
      }
  
      stopDelegator(delegationRequestId: string) {
        this.delegationRequestsService.stopDelegator(delegationRequestId)
        .pipe(takeUntil(this.destroy$)) 
        .subscribe((res: any) => {
          if (res) {
            this.GetLitigationRequestsWithoutDelegatorsForAdmin();
          }
        })
  }
  
  showDelegatorsModal(litigationRequestId: string,content:any) {
           debugger;
          this.delegationRequestsService.GetInActiveDelegatorsForAdmin(litigationRequestId,null).subscribe(res => {
            if(res.isDone && res.data) {
              this.inActivedelegators = res.data;
              this.modalService.open(content)
  
            }
            
          })
      }
  
  
      assignDelegator(modal: any) {
              this.assignDelegationRequestForm.markAllAsTouched()
              if (this.assignDelegationRequestForm.valid && this.controls.delegationRequestId.value) {
      
                  this.delegationRequestsService.changeDelegator(this.controls.delegationRequestId.value).subscribe(res => {
                      if (res.isDone) {
                          this.assignDelegationRequestForm.reset();
                          this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                          modal.dismiss()
                          this.GetLitigationRequestsWithoutDelegatorsForAdmin();
      
                      } else {
                          this.toastrNotificationService.showError(res.message)
                      }
                  })
              }
      
          }


}
