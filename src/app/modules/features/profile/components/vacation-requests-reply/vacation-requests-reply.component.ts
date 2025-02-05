import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { pagination } from '@app/shared/models/pagination.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SysVacationRequestCreateUpdateDto } from '../../models/vacation-requests.model';
import { VacationRequestService } from '../../services/vacation-requests.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { Configuration } from '@app/core/configurations/shared.config';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-vacation-requests-reply',
  templateUrl: './vacation-requests-reply.component.html',
  styleUrl: './vacation-requests-reply.component.scss'
})
export class VacationRequestsReplyComponent extends BaseComponent implements OnInit {

  vacationsList: SysVacationRequestCreateUpdateDto[] | undefined;
  createVacationSubmitted : boolean = false;
  newPageNo: number = 1;
  pageCount: number = 0;
  pagintationData: pagination = {
    currentPage: 1,
    // pageCount: 0,
    pageSize: 10,
    totalCount: 0,
  };

  constructor(
    private _vacationRequestService:VacationRequestService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private _toastrNotificationService: ToastrNotificationService

  ) {
    super();
    
  }
  
  ngOnInit(): void {
    this.setBreadcrumb();

    this.GetAllVacationRequests()
  }

  GetAllVacationRequests(){
    this._vacationRequestService.GetVacationRequestsForAdmin(this.pagintationData.currentPage,this.pagintationData.pageSize)
    .subscribe(res => {
      if(res.isDone){
        this.vacationsList = res.data?.results;
      }
    })
  }

  acceptVacation(requestId: string){
    debugger;
    this._vacationRequestService.ProcessVacation(requestId,true)
    .subscribe(res => {
      if(res.isDone){
        this._toastrNotificationService.showSuccess(res.message)
        this.GetAllVacationRequests();
      }
    })

  }

  rejectVacation(requestId: string){
    debugger;

    this._vacationRequestService.ProcessVacation(requestId,false)
    .subscribe(res => {
      if(res.isDone){
        this._toastrNotificationService.showError(res.message)

        this.GetAllVacationRequests();
      }
    })

  }


  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this._translateService.instant(this.translations.layout.sidebar.vacationRequestReply), link: Configuration.modules.profile }
    ])
  }

}
