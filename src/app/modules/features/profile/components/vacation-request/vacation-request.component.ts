import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { VacationRequestService } from '../../services/vacation-requests.service';
import { pagination } from '@app/shared/models/pagination.model';
import { SysVacationRequestCreateUpdateDto } from '../../models/vacation-requests.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrl: './vacation-request.component.scss'
})
export class VacationRequestComponent extends BaseComponent implements OnInit {
  
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
  private _formBuilder =  inject(FormBuilder)
  private _modalService = inject(NgbModal);
  public dimBeforeTodayFilter = (d: Date | null): boolean => {
        const day = d!.getDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight to ignore time
        return today <= d!;
    }

  createVacationForm = this._formBuilder.group({
    startDate: new FormControl<string | null>(null, [Validators.required]),
    endDate: new FormControl<string | null>(null, [Validators.required]),
    reason: new FormControl<string | null>(null, [Validators.required]),
    
})



  constructor(
    private _vacationRequestService:VacationRequestService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,

  ) {
    super();
    
  }
  
  ngOnInit(): void {
    this.setBreadcrumb()
    this.GetAllVacationRequests()
  }

  GetAllVacationRequests(){
    this._vacationRequestService.GetVacationRequestsForEmployee(this.pagintationData.currentPage,this.pagintationData.pageSize)
    .subscribe(res => {
      if(res.isDone){
        this.vacationsList = res.data?.results;
      }
    })
  }

  createVacation(){

    
    this.createVacationSubmitted = true;

    if(this.createVacationForm.valid){
    this.createVacationSubmitted = false;

    let model = {
      startDate : this.createVacationFormControls.startDate.value,
      endDate : this.createVacationFormControls.endDate.value,
      reason : this.createVacationFormControls.reason.value,
    } as any as SysVacationRequestCreateUpdateDto

    this._vacationRequestService.CreateVacation(model)
    .subscribe(res => {
      if(res.isDone){
        this.GetAllVacationRequests();
      }
      this.closeAll();
    })


    }
  }

  get createVacationFormControls() {
    return this.createVacationForm.controls
}

public open(content: TemplateRef<any>): void {
  this._modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then();
};

public closeAll(){
  this._modalService.dismissAll();
}

private setBreadcrumb(): void {
  this._breadcrumbService.updateBreadcrumbListContent([
    { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
    { label: this._translateService.instant(this.translations.layout.sidebar.vacationRequest), link: Configuration.modules.profile }
  ])
}


}
