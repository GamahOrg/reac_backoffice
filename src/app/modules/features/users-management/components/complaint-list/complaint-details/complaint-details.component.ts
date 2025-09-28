import { Component, OnInit } from '@angular/core';
import { ComplainDto, getComplaintStatusName, getComplaintTypeName, getStatusBadgeClass, UpdateComplainResponseDto } from '../../../models/ComplainDto';
import { environment } from '@environment/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplaintService } from '../../../services/ComplaintService.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import Swal from 'sweetalert2';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { Configuration } from '@app/core/configurations/shared.config';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrl: './complaint-details.component.scss'
})
export class ComplaintDetailsComponent extends BaseComponent implements OnInit{
  complaint: ComplainDto | null = null;
  loading = false;
  responding = false;
  showResponseForm = false;
  isStaff = true; // Should be determined from auth service
  baseUrl = `${environment.baseURL}/`;
  
  responseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private complaintService: ComplaintService,
    private fb: FormBuilder,
    private _toastrNotificationService:ToastrNotificationService,
    
  ) {
    super();
    this.responseForm = this.fb.group({
      responseText: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  ngOnInit(): void {
    this.isStaff = true;
    this.loadComplaint();
  }


  loadComplaint(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/complaints']);
      return;
    }

    this.loading = true;
    this.complaintService.getComplaintById(+id, this.isStaff ).subscribe({
      next: (response:any) => {
        if (response.success) {
          this.complaint = response.data;
        } else {
          this._toastrNotificationService.showError('فشل في تحميل بيانات الشكوى: ' + response.message);
          this.router.navigate(['/complaints']);
        }
        this.loading = false;
      },
      error: (error:any) => {
        console.error('Error loading complaint:', error);
        this._toastrNotificationService.showError('حدث خطأ أثناء تحميل بيانات الشكوى');
        this.router.navigate(['/complaints']);
        this.loading = false;
      }
    });
  }

  toggleResponseForm(): void {
    this.showResponseForm = !this.showResponseForm;
    if (!this.showResponseForm) {
      this.responseForm.reset();
    }
  }

  submitResponse(): void {
    if (this.responseForm.valid && this.complaint) {
      this.responding = true;

      const updateDto: UpdateComplainResponseDto = {
        responseText: this.responseForm.value.responseText.trim()
      };

      this.complaintService.updateComplaintResponse(this.complaint.id, updateDto).subscribe({
        next: (response:any) => {
          if (response.success) {
            this._toastrNotificationService.showSuccess('تم إرسال الرد بنجاح');
            this.complaint = response.data;
            this.showResponseForm = false;
            this.responseForm.reset();
          } else {
            this._toastrNotificationService.showError('فشل في إرسال الرد: ' + response.message);
          }
          this.responding = false;
        },
        error: (error:any) => {
          console.error('Error submitting response:', error);
          this._toastrNotificationService.showError('حدث خطأ أثناء إرسال الرد');
          this.responding = false;
        }
      });
    }
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
          this.complaintService.closeComplaint(id).subscribe({
            next: (response:any) => {
              if (response.success) {
                this._toastrNotificationService.showSuccess('تم إغلاق الشكوى بنجاح');
                this.complaint = response.data;
              } else {
                this._toastrNotificationService.showError('فشل في إغلاق الشكوى: ' + response.message);
              }
            },
            error: (error:any) => {
              console.error('Error closing complaint:', error);
              this._toastrNotificationService.showError('حدث خطأ أثناء إغلاق الشكوى');
            }
          });
        
        }
      });
    }

  downloadAttachment(attachment: any): void {
    if (attachment.fileUrl) {
      window.open(attachment.fileUrl, '_blank');
    }
  }

  goBack(): void {
    this.router.navigate(['/' + Configuration.modules.UsersManagement + '/' + Configuration.pages.usersManagement.Complaints]);
  }

  // Helper methods
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
    return timeString ? timeString.substring(0, 5) : '';
  }

  canRespond(): boolean {
    return!!(this.isStaff && this.complaint && this.complaint.complainsStatusId === 1);
  }

  canClose(): boolean {
    return !!(this.isStaff && this.complaint && this.complaint.complainsStatusId !== 3);
  }

  getResponseCharCount(): number {
    return this.responseForm.get('responseText')?.value?.length || 0;
  }
}
