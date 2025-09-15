import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { pagination, Pagination } from '@app/shared/models/pagination.model';
import { takeUntil } from 'rxjs';
import { DelegatorsStopModify, LitigationDelegationRequest } from '../../../models/delegation-request.model';
import { DelegationRequestService } from '../../../services/delegation-request.service';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { LitigationRequestParty } from '@app/modules/features/arbitration/models/enums/arbitrator-recusal';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delegators-stop-modify-list',
  templateUrl: './delegators-stop-modify-list.component.html',
  styleUrl: './delegators-stop-modify-list.component.scss'
})
export class DelegatorsStopModifyListComponent extends BaseComponent implements OnInit {


  newPageNo: number = 1;
      pageCount: number = 0;
      pagintationData: pagination = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
      };
  
delegators: Pagination<DelegatorsStopModify[]> = {} as Pagination<DelegatorsStopModify[]>;
inActivedelegators: DelegatorsStopModify[] = {} as DelegatorsStopModify[];
changeDelegationRequestForm = this._formBuilder.group({
        delegationRequestId: ['', Validators.required],
    })

  ngOnInit(): void {
    this.watchPaginationActions();

    this.GetActiveDelegatorsForAdmin();
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
    return this.changeDelegationRequestForm.controls;
  }

  GetActiveDelegatorsForAdmin(): void {
      this.delegationRequestsService.GetActiveDelegatorsForAdmin(this.pagintationData.currentPage, this.pagintationData.pageSize)
        .pipe(takeUntil(this.destroy$)) 
        .subscribe((res: any) => {
          if (res) {
            debugger;
            this.delegators = res.data as Pagination<DelegatorsStopModify[]>;
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
      this.GetActiveDelegatorsForAdmin()
    }

    stopDelegator(delegationRequestId: string) {
      this.delegationRequestsService.stopDelegator(delegationRequestId)
      .pipe(takeUntil(this.destroy$)) 
      .subscribe((res: any) => {
        if (res) {
          this.GetActiveDelegatorsForAdmin();
        }
      })
}

showDelegatorsModal(litigationRequestId: string,delegationParty: LitigationRequestParty,content:any) {
         debugger;
        this.delegationRequestsService.GetInActiveDelegatorsForAdmin(litigationRequestId,delegationParty).subscribe(res => {
          if(res.isDone && res.data) {
            this.inActivedelegators = res.data;
            this.modalService.open(content)

          }
          
        })
    }


    changeDelegator(modal: any) {
            this.changeDelegationRequestForm.markAllAsTouched()
            if (this.changeDelegationRequestForm.valid && this.controls.delegationRequestId.value) {
    
                this.delegationRequestsService.changeDelegator(this.controls.delegationRequestId.value).subscribe(res => {
                    if (res.isDone) {
                        this.changeDelegationRequestForm.reset();
                        this.toastrNotificationService.showSuccess(this._translate.instant(this.translations.general.successfullySave))
                        modal.dismiss()
                        this.GetActiveDelegatorsForAdmin();
    
                    } else {
                        this.toastrNotificationService.showError(res.message)
                    }
                })
            }
    
        }

}
