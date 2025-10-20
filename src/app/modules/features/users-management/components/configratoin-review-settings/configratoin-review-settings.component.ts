import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ReconciliationFeesDto } from '../../models/reconciliationFeesDto';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { ReconciliationSettingService } from '../../services/reconciliationSettingService';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { containsCitizenNameValidator, containsLitigationCodeValidator } from '../../models/containsLitigationCodeValidator';
import { ReviewSettingService } from '../../services/reviewSettingService';

@Component({
  selector: 'app-configratoin-review-settings',
  templateUrl: './configratoin-review-settings.component.html',
  styleUrl: './configratoin-review-settings.component.scss'
})
export class ConfigratoinReviewSettingsComponent    extends BaseComponent implements OnInit {
  form!: FormGroup;
  data!:ReconciliationFeesDto[];
  
  constructor(private fb: FormBuilder,private translate: TranslateService, private _breadcrumbService: BreadcrumbService, private _ReviewSettingService:ReviewSettingService,private _toastrNotificationService:ToastrNotificationService) {
    super()
 
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
       { label: this.translate.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
      { label: this.translate.instant(this.translations.UsersManagement.ReviewSettings.ReviewSettings), link: Configuration.modules.UsersManagement }
    ])
  }

  GetFees(){
    this._ReviewSettingService.getAllSettings()
    .subscribe(res => {
      console.log("res",res)
      if(res.isDone){
        this.data = res.data!;
        console.log("this.data",this.data)
        this.data.forEach(item => {
          if(item.value?.includes('{LitigationCode}')){
            this.form.addControl(item.id, this.fb.control(item.value, [Validators.required,containsLitigationCodeValidator()]));
          }
          // else if(item.value?.includes('{CitizenName}')){
          //   this.form.addControl(item.id, this.fb.control(item.value, [Validators.required,containsCitizenNameValidator()]));
          // }
          else{
            this.form.addControl(item.id, this.fb.control(item.value, [Validators.required]));
          }
        });
      }
    })
  }

  ngOnInit(): void {
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
    
    this._ReviewSettingService.UpdateSettings(updatedData).subscribe(
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
