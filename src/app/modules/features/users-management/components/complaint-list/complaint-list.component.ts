import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ComplainDto, ComplainSearchDto, getComplaintStatusName, getComplaintTypeName, getStatusBadgeClass } from '../../models/ComplainDto';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { Router } from '@angular/router';
import { ComplaintService } from '../../services/ComplaintService.service';
import { Configuration } from '@app/core/configurations/shared.config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.scss'
})
export class ComplaintListComponent extends BaseComponent implements OnInit {
  complaints: ComplainDto[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  totalPages = 0;
  loading = false;
  isStaff = true; 
  Math = Math;
  // Search filters
  searchDto: ComplainSearchDto = {
    pageNumber: 1,
    pageSize: 10
  };

  // Dropdown options
  complaintTypes: any[] = [];
  complaintStatuses: any[] = [];

  constructor(
       private _complaintService:ComplaintService,
       private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.isStaff = true;
    this.complaintTypes = this._complaintService.getLocalComplaintTypes();
    this.complaintStatuses = this._complaintService.getLocalComplaintStatuses(this.isStaff);
    
    this.loadComplaints();
  }


  loadComplaints(): void {
    this.loading = true;
    this.searchDto.isStaff = this.isStaff;
    this._complaintService.getComplaints(this.searchDto).subscribe({
      next: (response:any) => {
        if (response.success) {
          this.complaints = response.data.items;
          this.totalCount = response.data.totalCount;
          this.pageNumber = response.data.pageNumber;
          this.pageSize = response.data.pageSize;
          this.totalPages = response.data.totalPages;

          console.log('Loaded complaints:', this.complaints);
        } else {
          console.error('Error loading complaints:', response.message);
        }
        this.loading = false;
      },
      error: (error:any) => {
        console.error('Error loading complaints:', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.searchDto.pageNumber = 1;
    this.loadComplaints();
  }

  onPageChange(page: number): void {
    this.searchDto.pageNumber = page;
    this.loadComplaints();
  }

  onPageSizeChange(event: any): void {
    var size= event.target.value;
    this.searchDto.pageSize = Number(size);
    this.searchDto.pageNumber = 1;
    this.loadComplaints();
  }

  clearFilters(): void {
    this.searchDto = {
      pageNumber: 1,
      pageSize: this.pageSize
    };
    this.loadComplaints();
  }

  viewComplaint(id: number): void {
    this.router.navigate(["/"+Configuration.modules.UsersManagement+"/"+ Configuration.pages.usersManagement.ComplaintDetails+"/"+id]);
  }

  respondToComplaint(id: number): void {
    this.router.navigate(["/"+Configuration.modules.UsersManagement+"/"+ Configuration.pages.usersManagement.ComplaintDetails+"/"+id]);
  }

  closeComplaint(id: number): void {
     // Show confirmation dialog using SweetAlert2
      Swal.fire({
        title: `  هل تريد إغلاق هذا الطلب  ؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم, بالتاكيد',
        cancelButtonText: 'الغاء',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // If confirmed, toggle the status
          this._complaintService.closeComplaint(id).subscribe({
            next: (response:any) => {
              if (response.success) {
                alert('تم إغلاق الشكوى بنجاح');
                this.loadComplaints();
              } else {
                alert('فشل في إغلاق الشكوى: ' + response.message);
              }
            },
            error: (error:any) => {
              console.error('Error closing complaint:', error);
              alert('حدث خطأ أثناء إغلاق الشكوى');
            }
          });
        
        }
      });
    }
   

  getComplaintTypeName(typeId: number): string {
    return getComplaintTypeName(typeId);
  }

  getComplaintStatusName(statusId: number): string {
    return getComplaintStatusName(statusId, this.isStaff);
  }

  getStatusBadgeClass(statusId: number): string {
    return getStatusBadgeClass(statusId);
  }

  formatTime(timeString: string): string {
    // Format time string for display
    return timeString ? timeString.substring(0, 5) : '';
  }

  onStatusFilterChange(statusIds: number[]): void {
    this.searchDto.statusIds = statusIds;
  }
}
