import { Component, OnInit, enableProdMode } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { forkJoin, takeUntil } from 'rxjs';
import { UsersManagementService } from '../../services/usersManagement.service';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuration } from '@app/core/configurations/shared.config';
import { CreateEmployeeDto, EmployeeDto, targetEmployeeDto } from '../../models/employeeDto';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { Router } from '@angular/router';
import { BaseResponse } from '@app/core/models/base-response';
import { DepartmentDto } from '../../models/departmentDto';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent extends BaseComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeListURL:string=`/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.userList}/`;
  isRoleEnabled:boolean=false;
  departments!:DepartmentDto[];


  constructor(
    private _usersManagementService:UsersManagementService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private _toastrNotificationService:ToastrNotificationService,
    private fb: FormBuilder,
    private _router : Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.forkJoinAllLookups();
    this.updateBreadcrumb()

     // Initialize the form
     this.employeeForm = this.fb.group({
      // id: ['', Validators.required], 
      name: ['', [Validators.required,Validators.maxLength(50)]],
      identityNumber: ['', [Validators.required, Validators.pattern(Configuration.validators.identityNumber)]], 
      email: ['', [Validators.required, Validators.pattern(Configuration.validators.emailPattern)]],  
      departmentId: ['', Validators.required],
      jobTitle: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(Configuration.validators.PhoneNumber)]],  
      isActive: [true, Validators.required],
      roleId: [null,]  
    });
    this.employeeForm.get('jobTitle')?.disable();
  }



  onSubmit(): void {
    debugger;
    if (this.employeeForm.valid) {
      debugger;
      const employeeData: CreateEmployeeDto = this.employeeForm.value;
      console.log('Employee Data:', employeeData);
      const targetObject : targetEmployeeDto = {
            employeeName : employeeData.name,
            identityNumber: employeeData.identityNumber,
            departmentId : employeeData.departmentId,
            jobName: this.employeeForm.get('jobTitle')?.value,
            mobile : employeeData.mobile,
            email: employeeData.email,
            isAdmin : employeeData.RoleId==1 ? false:true,
            isActive: this.employeeForm.controls['isActive']?.value == true ? true:false
      };
      debugger;
      this._usersManagementService.CreateEmploee(targetObject)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<any>) => {
        debugger;
        console.log(res);
          if (res.isDone) {
              this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
              this.navigateToList();
          };
      });
    }
  }




  private forkJoinAllLookups(): void {
    forkJoin(
      {
         GetAllDepartments: this._usersManagementService.getAllDepartmentsLookup(),
      }
    ).pipe(takeUntil(this.destroy$)).subscribe(res => {
       this.departments = res.GetAllDepartments.isDone && res.GetAllDepartments.data ? res.GetAllDepartments.data : [];

    }
    )
  };
  private updateBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      {
        label: this._translateService.instant(this.translations.layout.sidebar.home),
        link: '/'
      },
      { label: this._translateService.instant(this.translations.layout.sidebar.employeeList), link: `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.userList}/`}
      ,{
        label: this._translateService.instant(this.translations.layout.sidebar.createEmployee), link: Configuration.modules.UsersManagement 
      },
    ])
  }

  onDepartmentChange(event: any): void {
    console.log(event.target.value)
    const roleIdControl = this.employeeForm.get('roleId');
    const departmentId=event.target?.value;

    if (departmentId === '657004f4-57e1-4715-addc-0e5ff0b00938') //اداره التدقيق 
      { 
        this.isRoleEnabled=true;
        roleIdControl?.setValidators([Validators.required]);
        // this.employeeForm.patchValue({
        //   jobTitle: 'مدير ادارة التدقيق' 
        // });
     } 
    else {
      this.isRoleEnabled=false;
      roleIdControl?.clearValidators();
      if(departmentId === 'fa69b94c-53f2-49ca-8384-072ea272fa08'){
        this.employeeForm.patchValue({
          jobTitle: 'مدير ادارة الصلح' 
        });
      }
      else if(departmentId === '8d3aee1d-353d-48fb-9f8c-f3345eacf3d6'){
        this.employeeForm.patchValue({
          jobTitle: 'مدير ادارة النظام' 
        });
      }
      else{
        this.employeeForm.patchValue({
          jobTitle: 'مدير ادارة التحيكم' 
        });
      }
    }

    roleIdControl?.updateValueAndValidity();
  }

  onRoleChange(event: any): void {
    const RoleId=event.target?.value;
     if(RoleId=="1"){
       this.employeeForm.patchValue({
          jobTitle: 'موظف ادارة التدقيق' 
        });
       }
       else if(RoleId=="2"){
         this.employeeForm.patchValue({
          jobTitle: 'مدير ادارة التدقيق' 
        });
        }
  }

    private showSuccess(msg: string): void {
      this._toastrNotificationService.showSuccess(msg);
    }

private fillKeysValueFromEnum(type: any) {
    return Object.keys(type).filter(t => isNaN(+t)).map(el => {
        return {
            key: el,
            value: Object(type)[el]
        }
    });
}

private navigateToList(): void {
    this._router.navigate([this.employeeListURL])
 }

}
