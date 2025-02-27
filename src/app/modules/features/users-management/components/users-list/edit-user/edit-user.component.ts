import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersManagementService } from '../../../services/usersManagement.service';
import { Configuration } from '@app/core/configurations/shared.config';
import { DepartmentDto } from '../../../models/departmentDto';
import { CreateEmployeeDto, targetEmployeeDto } from '../../../models/employeeDto';
import { forkJoin, takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent extends BaseComponent implements OnInit {

  employeeForm!: FormGroup;
  employeeListURL:string=`/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.userList}/`;
  isRoleEnabled:boolean=false;
  departments!:DepartmentDto[];
  itemId!: string;
  selectedItem!:any;

  constructor(private _usersManagementService:UsersManagementService,  private _router : Router,private route: ActivatedRoute,private fb: FormBuilder,  private _translateService: TranslateService, private _toastrNotificationService:ToastrNotificationService, private _breadcrumbService: BreadcrumbService) {
    super();
    
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.itemId = params['id'];  // '+' is used to cast to number
      console.log('Item ID from URL:', this.itemId);
      this.GetEmployeeById(this.itemId);  // Fetch data based on the ID
      this.forkJoinAllLookups();
      this.initForm();
    });
    this.updateBreadcrumb();

  }


  initForm(){

     // Initialize the form
     this.employeeForm = this.fb.group({
       id: [''], 
      employeeName: ['', [Validators.required,Validators.maxLength(50)]],
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


  GetEmployeeById(id:string){
    if (id) {
       this._usersManagementService.GetEmployeeById(id)
    .subscribe((res:any) => {
      if(res.isDone){
        console.log(res);
        this.selectedItem = res.data;
        this.employeeForm.patchValue(res.data);
        this.onDepartmentChangeId(res.data?.departmentId)

        // if(this.employeeForm.get('departmentId')?.value == '657004f4-57e1-4715-addc-0e5ff0b00938'){
        //   this.isRoleEnabled=true;
          
        // }
      }
    })
    }
   
  } 

  onSubmit(): void {
    debugger;
    if (this.employeeForm.valid) {
      debugger;
      const employeeData: CreateEmployeeDto = this.employeeForm.value;
      console.log('Employee Data:', employeeData);
      const targetObject : targetEmployeeDto = {
             id:employeeData.id,
            employeeName : employeeData.employeeName,
            identityNumber: employeeData.identityNumber,
            departmentId : employeeData.departmentId,
            jobName: this.employeeForm.get('jobTitle')?.value,
            mobile : employeeData.mobile,
            email: employeeData.email,
            isAdmin : employeeData.roleId == "1" ? false:true,
            isActive: this.employeeForm.controls['isActive']?.value == true ? true:false
      };
      debugger;
      this._usersManagementService.UpdateEmployee(targetObject)
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
        label: this._translateService.instant(this.translations.layout.sidebar.updateEmployee), link: Configuration.modules.UsersManagement 
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

  onDepartmentChangeId(debartmentid: string): void {
    const roleIdControl = this.employeeForm.get('roleId');
    const departmentId=debartmentid;

    if (departmentId === '657004f4-57e1-4715-addc-0e5ff0b00938') //اداره التدقيق 
      { 
        this.isRoleEnabled=true;
        roleIdControl?.setValidators([Validators.required]);
        // this.employeeForm.patchValue({
        //   jobTitle: 'مدير ادارة التدقيق' 
        // });
        this.RoleChangeId(this.selectedItem?.isAdmin)
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

    RoleChangeId(role:boolean): void {
       if(role==false){
         this.employeeForm.patchValue({
            jobTitle: 'موظف ادارة التدقيق' 
          });
        this.employeeForm.controls['roleId'].setValue("1")
         }
         else if(role==true){
           this.employeeForm.patchValue({
            jobTitle: 'مدير ادارة التدقيق' 
          });
          this.employeeForm.controls['roleId'].setValue("2")
          }
      }

    private showSuccess(msg: string): void {
      this._toastrNotificationService.showSuccess(msg);
    }

    private navigateToList(): void {
      this._router.navigate([this.employeeListURL])
    }

}
