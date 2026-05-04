import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReopenLitigationRequestService } from '../../services/reopenLitigationRequest.service';
import { LitigationRequestReopenInfoDto, ReopenLitigationRequestDto } from '../../models/reopenLitigationRequestDto';
import { Configuration } from '@app/core/configurations/shared.config';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-reopen-litigation-request-details',
  templateUrl: './reopen-litigation-request-details.component.html',
  styleUrl: './reopen-litigation-request-details.component.scss'
})
export class ReopenLitigationRequestDetailsComponent extends BaseComponent implements OnInit {

  litigationRequestId!: string;
  reopenInfo: LitigationRequestReopenInfoDto | undefined;
  reopenForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _reopenService: ReopenLitigationRequestService,
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toastrNotificationService: ToastrNotificationService,
    private fb: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
    this._activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.litigationRequestId = params['id'];
        if (this.litigationRequestId) {
          this.loadReopenInfo();
        }
      });
    this.setBreadcrumb();
  }

  initializeForm(): void {
    this.reopenForm = this.fb.group({
      reopenReason: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  loadReopenInfo(): void {
    this._reopenService.GetLitigationRequestReopenInfo(this.litigationRequestId)
      .subscribe((res: any) => {
        if (res.isDone && res.data) {
          this.reopenInfo = res.data;
        }
      });
  }

  onReopen(): void {
    if (this.reopenForm.invalid) {
      this.reopenForm.markAllAsTouched();
      return;
    }

    Swal.fire({
      title: this._translateService.instant(this.translations.reopenLitigationRequest.confirmReopenTitle),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this._translateService.instant(this.translations.reopenLitigationRequest.confirmReopenYes),
      cancelButtonText: this._translateService.instant(this.translations.reopenLitigationRequest.confirmReopenCancel),
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitReopen();
      }
    });
  }

  private submitReopen(): void {
    this.isLoading = true;
    const model: ReopenLitigationRequestDto = {
      litigationRequestId: this.litigationRequestId,
      reopenReason: this.reopenForm.value.reopenReason
    };

    this._reopenService.ReopenLitigationRequest(model)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          if (res.isDone) {
            this._toastrNotificationService.showSuccess(this._translateService.instant(this.translations.reopenLitigationRequest.reopenSuccess));
            this._router.navigate(['/users-management/reopen-litigation-request-list']);
          } else {
            this._toastrNotificationService.showError(res.message || this._translateService.instant(this.translations.reopenLitigationRequest.reopenError));
          }
        },
        error: () => {
          this.isLoading = false;
          this._toastrNotificationService.showError(this._translateService.instant(this.translations.reopenLitigationRequest.reopenError));
        }
      });
  }

  goBack(): void {
    this._router.navigate(['/users-management/reopen-litigation-request-list']);
  }

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
      { label: this._translateService.instant(this.translations.layout.sidebar.home), link: `/${Configuration.modules.UsersManagement}/${Configuration.pages.usersManagement.HomePage}` },
      { label: this._translateService.instant(this.translations.reopenLitigationRequest.reopenClosedRequests), link: `/users-management/reopen-litigation-request-list` },
      { label: this._translateService.instant(this.translations.reopenLitigationRequest.requestDetails), link: '' }
    ]);
  }
}
