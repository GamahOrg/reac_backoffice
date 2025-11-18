import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuration } from '@app/core/configurations/shared.config';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ChangePasswordService } from '../../services/change-password.service';
import { ChangePasswordDto } from '../../models/change-password.model';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {


    changePasswordForm!: FormGroup;
  
  
    constructor(
          private fb: FormBuilder,
          private _changePasswordService: ChangePasswordService,
          private _toastrNotificationService: ToastrNotificationService,
          private _breadcrumbService: BreadcrumbService,
          private _translateService: TranslateService
    ) {
      super();
      
    }

  ngOnInit(): void {
    this.updateBreadcrumb();
    
        this.changePasswordForm = this.fb.group({
          oldPassword: ['', [Validators.required]],
          newPassword: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/(?=.*[A-Z])/)]],
          confirmPassword: ['', [Validators.required]],
        }, { validator: this.passwordsMatch });
      }
  
      // Custom validator to check if new password and confirm password match
  passwordsMatch(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value 
      ? null 
      : { mismatch: true };
  }

  onSubmit() {
    
    if(this.changePasswordForm.valid){
      let model = {
        oldPassword : this.changePasswordForm.controls['oldPassword'].value,
        newPassword : this.changePasswordForm.controls['newPassword'].value
      } as ChangePasswordDto
  
      this._changePasswordService.changePassword(model)
      .subscribe(res => {
        if(res.isDone){
          this._toastrNotificationService.showSuccess(res.message);
          
        }else{
  
        }
      })
    }
    
    }

    private updateBreadcrumb(): void {
      this._breadcrumbService.updateBreadcrumbListContent([
        { label: this._translateService.instant(this.translations.layout.sidebar.home),  link:  `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },

        { label: this._translateService.instant(this.translations.layout.sidebar.changePassword), link: `/${Configuration.modules.profile}/${Configuration.pages.profile.changePassword}/`}
        
      ])
    }

}
