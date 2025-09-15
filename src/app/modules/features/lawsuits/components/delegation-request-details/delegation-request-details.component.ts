import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { DelegationRequestService } from '../../services/delegation-request.service';
import { environment } from '@environment/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // If using ng-bootstrap for modal
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';

@Component({
  selector: 'app-delegation-request-details',
  templateUrl: './delegation-request-details.component.html',
  styleUrls: ['./delegation-request-details.component.scss']
})
export class DelegationRequestDetailsComponent extends BaseComponent implements OnInit {
  delegationRequest?: any;
  loading = true;
  error?: string;
  baseUrl = `${environment.baseURL}/`;
  rejectReason: string = '';
  showRejectModal: boolean = false;
  delegationRequestId!: string;
    private toastrNotificationService = inject(ToastrNotificationService)

  constructor(
    private route: ActivatedRoute,
    private delegationRequestsService: DelegationRequestService,
    private modalService: NgbModal // If using ng-bootstrap
  ) {
    super();
  }

  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.delegationRequestsService.getDelegationRequestById(id)
        .subscribe({
          next: (data) => {
            
            this.delegationRequest = data?.data.delegator;
            this.delegationRequestId = data?.data?.id;
            this.loading = false;
          },
          error: (err) => {
            this.error = 'Failed to load delegation request.';
            this.loading = false;
          }
        });
    } else {
      this.error = 'No delegation request ID provided.';
      this.loading = false;
    }
  }

  approveOrRejectDelegationRequest(isApproved: boolean) {
    if (isApproved) {
      this.delegationRequestsService.approveOrRejectDelegationRequest(
        this.delegationRequestId,
        true,
        null
      ).subscribe((res) => {
        if (res.isDone){

            this.toastrNotificationService.showSuccess(res.message);
        window.location.href = '/Lawsuits/delegation-requests-list';

        }

      });
    } 
  }

  openRejectReasonModal(content: TemplateRef<any>) {
         this.modalService.open(content, { centered: true });
    }


  submitRejectReason() {
    if (!this.rejectReason.trim()) {
      this.toastrNotificationService.showError('لابد من ادخال سبب الرفض');
      return;
    }
    this.delegationRequestsService.approveOrRejectDelegationRequest(
      this.delegationRequestId,
      false,
      this.rejectReason
    ).subscribe((res) => {
        if(res.isDone){
            this.toastrNotificationService.showSuccess(res.message);
        this.modalService.dismissAll(); // Close the modal
        window.location.href = '/Lawsuits/delegation-requests-list';
        }
    });
  }
}
