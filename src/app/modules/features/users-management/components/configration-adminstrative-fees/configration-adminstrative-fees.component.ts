import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AdminstrativeFeesService } from '../../services/adminstrativeFeesService';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { AdminstrativeFeesDto } from '../../models/AdminstrativeFeesDto';
import { Configuration } from '@app/core/configurations/shared.config';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configration-adminstrative-fees',
  templateUrl: './configration-adminstrative-fees.component.html',
  styleUrl: './configration-adminstrative-fees.component.scss',
})
export class ConfigrationAdminstrativeFeesComponent extends BaseComponent implements OnInit {
  
  feesList: AdminstrativeFeesDto[] | undefined;
  selectedItem: AdminstrativeFeesDto | null = null;

  constructor(
    private _configrationAdmistrationFeesService:AdminstrativeFeesService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private _toastrNotificationService:ToastrNotificationService,
    private router: Router
  ) {
    super();
    
  }
  
  ngOnInit(): void {
    this.setBreadcrumb()
    this.GetAllFees()
  }

  GetAllFees(){
    this._configrationAdmistrationFeesService.getAllFees()
    .subscribe(res => {
      console.log(res);
      if(res.isDone){
        this.feesList = res.data;
      }
    })
  }

private setBreadcrumb(): void {
  this._breadcrumbService.updateBreadcrumbListContent([
    { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
    { label: this._translateService.instant(this.translations.UsersManagement.AdminstrationFees.listFees), link: Configuration.modules.UsersManagement }
  ])
}

navigateToFee(id: string) {
  this.router.navigate(['/users-management/update-admistrative-fees'], {
    queryParams: { id: id }  // Passing the ID as query parameter
  });
}

showConfirmDelete(fee: any): void {

  // Show confirmation dialog using SweetAlert2
  Swal.fire({
    title: `  هل تريد حذف هذه الرسوم   ${fee.litigationAmount} ?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم, بالتاكيد',
    cancelButtonText: 'الغاء',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, toggle the status
      this.DeleteFee(fee);
    }
  });
}

DeleteFee(fee:any){
  this._configrationAdmistrationFeesService.DeleteFees(fee)
  .subscribe(res => {
    console.log(res);
    if(res.isDone){
      this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
      this.GetAllFees();
    }
  })
}

private showSuccess(msg: string): void {
  this._toastrNotificationService.showSuccess(msg);
}

private showError(msg: string): void {
  this._toastrNotificationService.showError(msg);
}

}
