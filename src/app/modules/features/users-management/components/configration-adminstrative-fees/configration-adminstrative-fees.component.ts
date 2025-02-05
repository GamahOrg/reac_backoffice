import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AdminstrativeFeesService } from '../../services/adminstrativeFeesService';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { AdminstrativeFeesDto } from '../../models/AdminstrativeFeesDto';
import { Configuration } from '@app/core/configurations/shared.config';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';

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

editItem(item: AdminstrativeFeesDto): void {
  this.selectedItem = { ...item };
}


updateItem(updatedItem: AdminstrativeFeesDto): void {
  console.log("updatedItem :",updatedItem )
  updatedItem={... updatedItem,litigationAmount:`${updatedItem.fromAmount} - ${updatedItem.toAmount} \\ رسوم التسجيل ${updatedItem.fees}`}
  
  this._configrationAdmistrationFeesService.UpdateFees(updatedItem).subscribe(
    (response) => {
         this.GetAllFees();
         this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
     
    },
    (error: any) => {
      console.error('Error updating item:', error);
     
    }
  );
}
private showSuccess(msg: string): void {
  this._toastrNotificationService.showSuccess(msg);
}

@ViewChild('createElement') inputElement!: ElementRef;
isVisible:boolean=false;
openModal() {
  this.isVisible=!this.isVisible;
 
}
updatevisible(toggle:any){
  debugger;
  this.isVisible=toggle;
  if (this.isVisible) {
    this.inputElement = null!; 
    this.GetAllFees(); 
  }
}

}
