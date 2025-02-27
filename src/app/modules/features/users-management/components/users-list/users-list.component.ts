import { Component, OnInit, TemplateRef } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersManagementService } from '../../services/usersManagement.service';
import { pagination } from '@app/shared/models/pagination.model';
import { EmployeeDto, EmployeeStatusUpdate } from '../../models/employeeDto';
import { Configuration } from '@app/core/configurations/shared.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent extends BaseComponent implements OnInit {
  
  employeeList: EmployeeDto[] | undefined;
  selectedItem!:any;
  dt=new Date();
  newPageNo: number = 1;
  pageCount: number = 0;
  pagintationData: pagination = {
    currentPage: 1,
    // pageCount: 0,
    pageSize: 10,
    totalCount: 0,
  };
  searchForm!: FormGroup;


  constructor(
    private _usersManagementService:UsersManagementService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private _toastrNotificationService:ToastrNotificationService,
  ) {
    super();

  }
  
  ngOnInit(): void {
    this.initializeForm();
    this.setBreadcrumb()
    this.GetAllEmployeeList()
  }

  initializeForm(): void {
    this.searchForm = this.fb.group({
      name: ['',],
      mobile: [''],
      department: [''],
      isActive: [''],
      dateFrom: [''],
      dateTo: ['']
    });
  }

  GetAllEmployeeList(){
    if (this.searchForm.valid) {
      const searchCriteria = this.searchForm.value;
      console.log('Search criteria:', searchCriteria);
      // Implement search logic here
       this._usersManagementService.GetAllEmployee(this.pagintationData.currentPage,this.pagintationData.pageSize,searchCriteria)
    .subscribe((res:any) => {
      if(res.isDone){
        this.employeeList = res.data?.results;
      }
    })
    }
   
  }


private setBreadcrumb(): void {
  this._breadcrumbService.updateBreadcrumbListContent([
    { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
    { label: this._translateService.instant(this.translations.layout.sidebar.employeeList), link: Configuration.modules.UsersManagement }
  ])
}


showConfirmDialog(employee: any): void {
  const action = employee.isActive ? 'تعطيل' : 'تفعيل';

  // Show confirmation dialog using SweetAlert2
  Swal.fire({
    title: `هل تريد  ${action} لهذا المستخدم?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم, بالتاكيد',
    cancelButtonText: 'الغاء',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, toggle the status
      this.toggleEmployeeStatus(employee);
    }
  });
}

toggleEmployeeStatus(employee: any): void {
  // Toggle the isActive property
  const newStatus = !employee.isActive;
  employee.isActive = newStatus;
var employeeStatusUpdate:EmployeeStatusUpdate= {
employeeId:employee.id,
isActive:employee.isActive
  }
  // Update the status in the backend
  this._usersManagementService.UpdateEmployeeStatus(employeeStatusUpdate).subscribe(
    response => {
      this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
      this.GetAllEmployeeList();
    },
    error => {
      this.showError(this._translateService.instant(this.translations.general.errorSave));
    }
  );
}


private showSuccess(msg: string): void {
  this._toastrNotificationService.showSuccess(msg);
}

private showError(msg: string): void {
  this._toastrNotificationService.showError(msg);
}


OpenDetails(employee:any, content: TemplateRef<any>) {
 this.GetEmployeeById(employee.id,content)    
}

GetEmployeeById(id:string,content: TemplateRef<any>){
  if (id) {
     this._usersManagementService.GetEmployeeById(id)
  .subscribe((res:any) => {
    if(res.isDone){
      console.log(res);
      this.selectedItem = res.data;
      this.modalService.open(content)
    }
  })
  }
 
} 
}
