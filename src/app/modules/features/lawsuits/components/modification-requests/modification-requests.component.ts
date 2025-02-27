import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { ModificationListItem, ModificationRequesteStatusUpdate } from '../../models/modification-request.model';
import { BreadcrumbService } from '@app/shared/services/breadcrumb/breadcrumb.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { ToastrNotificationService } from '@app/core/services/toastr-notification/toastr-notification.service';
import Swal from 'sweetalert2';
import { Pagination } from '@app/shared/models/pagination.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';
import { Router } from '@angular/router';
import { LitigationRequestCorrespondencesService } from '../../services/litigation-request-correspondence/litigation-request-correspondence-service';
import { NotificationActorType } from '@app/modules/layout/models/enums/notification-actor-type.model';

@Component({
  selector: 'app-modification-requests',
  templateUrl: './modification-requests.component.html',
  styleUrl: './modification-requests.component.scss'
})
export class ModificationRequestsComponent  extends BaseComponent implements OnInit {

  requestsList: ModificationListItem[] | undefined;
  detailsRequestUrl: string = `/${Configuration.modules.lawsuits}/${Configuration.pages.litigation.litigationRequestCorrespondencesDetails}`

  reqList: Pagination<ModificationListItem[]> = {} as Pagination<ModificationListItem[]>;
    newPageNo: number = 1;
    pagintationData = {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
    }

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _translateService: TranslateService,
    private _toastrNotificationService:ToastrNotificationService,
    private _paginationService: PaginationService,
    private router: Router,
    private _litigationRequestCorrespondencesService: LitigationRequestCorrespondencesService
  ) {
    super();

  }
  
  ngOnInit(): void {
    this.setBreadcrumb()
    this.GetLitigationModificationRequests();
  }

 notificationActorType(type:number) {
    switch (type) {
      case 1:
        return 'موظف'
        break;
        case 2:
          return 'مصلح'
          break;
          case 3:
            return 'محكم'
            break;
            case 4:
              return 'المدعى'
              break;
              case 5:
                return 'المدعى عليه'
                break;
      default:
        return''
        break;
    }
  }; 

  private setBreadcrumb(): void {
    this._breadcrumbService.updateBreadcrumbListContent([
        { label: this._translateService.instant(this.translations.layout.sidebar.home), link: '/' },
        { label: this._translateService.instant(this.translations.layout.sidebar.litigationModificationRequest) }
    ])
}

GetLitigationModificationRequests(): void {
      this._litigationRequestCorrespondencesService.GetLitigationModificationRequests(this.pagintationData.currentPage, this.pagintationData.pageSize)
          .subscribe((res: Pagination<ModificationListItem[]> | null) => {
            console.log("res",res);
              if (res)
                this.updateRequestList(res as Pagination<ModificationListItem[]>)
          })
}


showConfirmApproveDialog(employee: any): void {
  const action =  'الموافقه';

  // Show confirmation dialog using SweetAlert2
  Swal.fire({
    title: `هل تريد  ${action} لهذا الطلب?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم, بالتاكيد',
    cancelButtonText: 'الغاء',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, toggle the status
      this.toggleApproveRequest(employee);
    }
  });
}

toggleApproveRequest(request: any): void {
 
  request.isApproved = true;
  var StatusUpdate:ModificationRequesteStatusUpdate= {
   modificationRequestId : request.id,
   isApproved:request.isApproved
  }
  // Update the status in the backend
  this._litigationRequestCorrespondencesService.UpdateModificationRequestStatus(StatusUpdate).subscribe(
    response => {
      this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
      this.GetLitigationModificationRequests();
    },
    error => {
      this.showError(this._translateService.instant(this.translations.general.errorSave));
    }
  );
}

showConfirmDisapproveDialog(employee: any): void {
  const action =  'رفض';

  // Show confirmation dialog using SweetAlert2
  Swal.fire({
    title: `هل تريد  ${action} هذا الطلب?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'نعم, بالتاكيد',
    cancelButtonText: 'الغاء',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, toggle the status
      this.toggleDisapproveRequest(employee);
    }
  });
}

toggleDisapproveRequest(request: any): void {
 
  request.isApproved = false;
  var StatusUpdate:ModificationRequesteStatusUpdate= {
   modificationRequestId : request.id,
   isApproved:request.isApproved
  }
  // Update the status in the backend
  this._litigationRequestCorrespondencesService.UpdateModificationRequestStatus(StatusUpdate).subscribe(
    response => {
      this.showSuccess(this._translateService.instant(this.translations.general.successfullySave));
      this.GetLitigationModificationRequests();
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

private updateRequestList(TypeListView: Pagination<ModificationListItem[]>): void {
  console.log(" this.reqList 1", TypeListView )
  this.reqList = TypeListView;
  console.log(" this.reqList ", this.reqList )
  this.setPaginationData(
      this.reqList.pageSize,
      this.reqList.totalCount,
  );
}
private setPaginationData(pageSize: number, total: number): void {
  this.pagintationData.pageSize = pageSize
  this.pagintationData.totalCount = total
  this._paginationService.updatePaginationData(this.pagintationData);
}

goToDetailsPage(requestId: string) {
 this.router.navigate([this.detailsRequestUrl, requestId]);
}
}
