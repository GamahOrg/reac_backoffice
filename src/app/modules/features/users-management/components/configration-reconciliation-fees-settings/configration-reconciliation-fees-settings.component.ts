import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { ReconciliationFeesService } from '../../services/reconciliationFeesService';
import { ReconciliationFeesDto } from '../../models/reconciliationFeesDto';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-configration-reconciliation-fees-settings',
  templateUrl: './configration-reconciliation-fees-settings.component.html',
  styleUrl: './configration-reconciliation-fees-settings.component.scss'
})
export class ConfigrationReconciliationFeesSettingsComponent  extends BaseComponent implements OnInit {
  form!: FormGroup;
  
  data!:ReconciliationFeesDto[];
   translatedValue:string;
  constructor(private fb: FormBuilder,private translate: TranslateService, private _breadcrumbService: BreadcrumbService, private _ReconciliationFeesService:ReconciliationFeesService,private _toastrNotificationService:ToastrNotificationService) {
    super()
    this.translatedValue = this.translate.instant('Configurable.ReconciliationFees');
 
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this.translate.instant(this.translations.layout.sidebar.home), link: '/' },
      { label: this.translate.instant(this.translations.UsersManagement.Configurable.ReconciliationAndRequestFees), link: Configuration.modules.UsersManagement }
    ])
  }

  GetFees(){
    this._ReconciliationFeesService.getAllFees()
    .subscribe(res => {
      console.log("res",res)
      if(res.isDone){
        this.data = res.data!;
        console.log("this.data",this.data)
        this.data.forEach(item => {
          this.form.addControl(item.id, this.fb.control(item.value, [Validators.required, Validators.min(0)]));
        });
      }
    })
  }

  ngOnInit(): void {
    // Initialize the form with controls based on the data array
    console.log("translatedValue",this.translatedValue)
    this.form = this.fb.group({});
    this.GetFees();
    this.setBreadcrumb();
   
  }


  save() {
    const updatedData = this.data.map(item => {
      return {
        ...item,
        value: this.form.get(item.id)?.value 
      };
    });
    
    this._ReconciliationFeesService.UpdateFees(updatedData).subscribe(
      (response) => {
           this.GetFees();
           this.showSuccess(this.translate.instant(this.translations.general.successfullySave));
       
      },
      (error: any) => {
        console.error('Error updating item:', error);
       
      }
    );
    console.log('Updated Data:', updatedData);
  }
  private showSuccess(msg: string): void {
    this._toastrNotificationService.showSuccess(msg);
  }
  
}
