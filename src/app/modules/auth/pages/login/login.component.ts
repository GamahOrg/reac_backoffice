import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '@app/core/services/storage-service/storage.service';
// import { BaseComponent } from '@app/shared/conponents/base/base.component';
import { LoginService } from '../../services/Login/login.service';
import { LoginParams } from '../../models/login.model';
import { TokenResponse } from '@app/core/models/token-response.model';
import { BaseResponse } from '@app/core/models/base-response';
import { Configuration } from '@app/core/configurations/shared.config';
import { takeUntil } from 'rxjs';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { DepartmentType } from '@app/core/models/enums/department-type.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  private _formBuilder = inject(FormBuilder);
  private _storageService = inject(StorageService);
  private _router = inject(Router);
  private _loginService = inject(LoginService);
  showLoader = false;
  errorFeedback: string = '';

  // step: number = 1

  // identityTypes = [
  //     { title: this.translations.auth.nationalId, value: 1 },
  //     { title: this.translations.auth.gulfId, value: 2 },
  //     { title: this.translations.auth.residencePermit, value: 3 },
  // ]

  // isOTPSent: boolean = false
  // otpTime: number = 180;
  // countdownInterval: any;

  // @ViewChildren('otpInput') otpInputs!: QueryList<any>;
  loginFormValidationLengths = {
    username: 10
  };
  loginForm = this._formBuilder.group({
    username: ['',
      [
        Validators.required,
        // Validators.maxLength(this.loginFormValidationLengths.username),
        // Validators.minLength(this.loginFormValidationLengths.username),
        // Validators.pattern(Configuration.validators.numberOnly),
      ]
    ],
    password: ['', [Validators.required, Validators.pattern(Configuration.validators.noArabicLetters)]],
  })
  get controls() {
    return this.loginForm.controls
  }
  public onSubmit(): void {
    // let loginParams = {
    //   userName: this.loginForm.value.username,
    //   password: this.loginForm.value.password,
    // }
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid) {
      this._loginService
        .login(this.loginForm.value as LoginParams)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: BaseResponse<TokenResponse>) => {
          if (res) {
            if (res.data) {
              this.showLoader = true;
              this._storageService.saveTokens(res.data);
              this._storageService.saveDepartmentType(res.data.departmentType)
              this._storageService.saveUserType(res.data.isAdmin)
              setTimeout((app: any, res: BaseResponse<TokenResponse>) => {
                this.showLoader = false;
                if (res.data?.departmentType == DepartmentType.Review ) {
                  app.navigateTolawsuitsModule()
                } else if (res.data?.departmentType == DepartmentType.Reconciliation) {
                  app.navigateToaReformerAssigningRequestsModule()
                } else if (res.data?.departmentType == DepartmentType.Arbitration) {
                  app.navigateToaArbitratorAssigningRequestsModule()
                }
                else if(res.data?.departmentType == DepartmentType.SystemManagement){
                  app.navigateToHomeModule()
                }
              }, 15000, this, res);



            } else {
              this.errorFeedback = res.message;
            }
          }
        });
    }
  }
  private navigateTolawsuitsModule(): void {
    this._router.navigate([
      `${Configuration.modules.lawsuits}`,
    ]);
  }
  private navigateToaReformerAssigningRequestsModule(): void {
    this._router.navigate([
      Configuration.modules.citizenRequests + '/' + Configuration.pages.citizenRequests.reformerassigningrequestforall,
    ]);
  }
  private navigateToaArbitratorAssigningRequestsModule(): void {
    this._router.navigate([
      Configuration.modules.arbitration + '/' + Configuration.pages.arbitration.assignedArbitrationRequests,
    ]);
  }
  private navigateToHomeModule(): void {
    this._router.navigate([
      Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.HomePage,
    ]);
  }
  // registerForm = this._formBuilder.group({
  //     password: ['', Validators.required],
  //     areaId: ['', Validators.required],
  //     cityId: ['', Validators.required],
  //     district: ['', Validators.required],
  //     street: ['', Validators.required],
  //     buildingNumber: ['', Validators.required],
  //     unitNumber: ['', Validators.required],
  //     mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  //     email: ['', [Validators.required, Validators.email]],
  //     userInfo: this._formBuilder.group({
  //         id: ['', Validators.required],
  //         full_name_ar: ['', Validators.required],
  //         two_names_ar: ['', Validators.required],
  //         id_expiry_date_g: ['', Validators.required],
  //         nationality: ['', Validators.required],
  //         nationality_ar: ['', Validators.required],
  //         dob_g: ['', Validators.required],
  //         gender: ['', Validators.required]
  //     })
  // })

  // public next(): void {
  //     this.step = 2
  // }

  // public showOTP(): void {
  //     this.step = 3
  // }

  // public onInputOTP(event: any, index: number): void {
  //     const input = event.target;
  //     if (input.value.length === input.maxLength) {
  //         const nextInput = this.otpInputs.toArray()[index + 1];
  //         if (nextInput) {
  //             nextInput.nativeElement.focus();
  //         }
  //     }
  // }

  // public resendOTP(): void {
  //     if (!this.isOTPSent) {
  //         this.isOTPSent = true;
  //         this.otpTime = 180;
  //         this.startCountdown();
  //     }
  // }

  // private startCountdown(): void {
  //     this.countdownInterval = setInterval(() => {
  //         if (this.otpTime > 0) {
  //             this.otpTime--;
  //         } else {
  //             this.isOTPSent = false;
  //             clearInterval(this.countdownInterval);
  //         }
  //     }, 1000);
  // }

  // public showDatePicker(event: Event): void {
  //     const inputElement = event.target as HTMLInputElement;
  //     inputElement.type = 'date'
  //     inputElement.showPicker();
  // }

  // public resetDate(event: Event): void {
  //     const inputElement = event.target as HTMLInputElement;
  //     inputElement.type = 'text'
  // }
}
