import { Component, OnInit } from '@angular/core';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { termsConditionsService } from '../../services/termsConditionsService';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { Configuration } from '@app/core/configurations/shared.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { termsConditionsDto } from '../../models/termsConditionsDto';
import { BaseComponent } from '@app/shared/components/base/base.component';

@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.scss',
})
export class TermsConditionComponent  extends BaseComponent implements OnInit  {
  form!: FormGroup;
  data!:termsConditionsDto[];
  
  constructor(private fb: FormBuilder,private translate: TranslateService, private _breadcrumbService: BreadcrumbService, private _TermsConditionsService:termsConditionsService,private _toastrNotificationService:ToastrNotificationService) {
    super()
 
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this.translate.instant(this.translations.layout.sidebar.home), link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
      { label: this.translate.instant(this.translations.UsersManagement.TermsConditionsSettings.termsConditionsSettings), link: Configuration.modules.UsersManagement }
    ])
  }

  GetTerms(){
    this._TermsConditionsService.getAllTerms()
    .subscribe(res => {
      console.log("res",res)
      if(res.isDone){
        this.data = res.data!;
        console.log("this.data",this.data)
        this.data.forEach(item => {
          this.form.addControl(item.id, this.fb.control(item.termsAndConditions, [Validators.required]));
          // this.form.addControl(item.typeName, this.fb.control(item.typeName));
          // this.form.addControl(item.termsAndConditions, this.fb.control(item.termsAndConditions));
        });
      }
    })
  }

  ngOnInit(): void {
    this.form = this.fb.group({});
    this.GetTerms();
    this.setBreadcrumb();
   
  }


  save() {
    const updatedData = this.data.map(item => {
      return {
        ...item,
        termsAndConditions:this.form.get(item.id.toString())?.value 
      };
    });
    
    this._TermsConditionsService.UpdateTerms(updatedData).subscribe(
      (response) => {
           this.GetTerms();
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
