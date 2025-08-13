import { Component, inject, OnInit } from '@angular/core';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { BaseComponent } from '@app/shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { BaseResponse } from '@app/core/models/base-response';
import { SysNotification } from '../../models/sys-notification.model';
import { NotificationResponseDto } from '../../models/notification-response-dto.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { RequestType } from '../../models/enums/request-type.model';
import { NotificationActorType } from '../../models/enums/notification-actor-type.model';
import { Router } from '@angular/router';
import { PaginationService } from '@app/shared/services/pagination/pagination.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent extends BaseComponent implements OnInit {
  private _notificationsService = inject(NotificationsService);
  private _router = inject(Router)
  private _paginationService = inject(PaginationService)

  notViewedCount: number = 0;
  notificationList: SysNotification[] | null = null;

  ReformerTaskrequestsUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerassigningrequestforall}`
  ReformationSessionUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.sessionList}`
  // ReformationReportUrl: string = ``
  ExtendReconciliationPeriodRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.requestToExtendSettlementPeriodDetails}`
  StopFreeUpReformerUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.reformerDecisionDetails}/`

  ArbitratorTaskrequestsUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.assignedArbitrationRequestsDocumnets}`
  ArbitrationSessionUrl: string = `/${Configuration.modules.arbitration}/${Configuration.pages.arbitration.arbitratorSessionList}`
  // ArbitrationReportUrl: string = ``
  ExtendArbitrationPeriodRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.requestToExtendArbitrationPeriodDetails}`
  StopFreeUpArbitratorUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.arbitratorDecisionDetails}/`
  LitigationRequestUrl: string = `/${Configuration.modules.lawsuits}/${Configuration.pages.lawsuits.lawsuitDetails}`
  JoinRequestAsReformerRequesUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/reformer/`
  JoinRequestAsArbitratorRequestUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.details}/arbitrator/`

  ArbitratorNominationListUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.assignArbitrationMemberDetails}`
  ArbitratorChairmanNominationListUrl: string = `/${Configuration.modules.citizenRequests}/${Configuration.pages.citizenRequests.assignArbitrationHeadDetails}`

  page = 1;
  pageSize = 10;
  collectionSize!: number;
  pagintationData = {
      currentPage: this.page,
      pageSize: 0,
      totalCount: 0,
      from: 0,
      to: 0,
  }
  newPageNo!: number;


  // getter 
  get requestType() {
    return RequestType
  };
  get notificationActorType() {
    return NotificationActorType
  };

  ngOnInit(): void {
    this.GetNotificationListForBackOffice(this.page, this.pageSize);
    this.watchPaginationActions();
  };

  private setPaginationData(currentPage: number, pageSize: number, totalCount: number): void {
    const from = (currentPage - 1) * pageSize + 1;
    const to = Math.min(currentPage * pageSize, totalCount);

    this.pagintationData = {
        currentPage,
        pageSize,
        totalCount,
        from,
        to,
    };

    this._paginationService.updatePaginationData(this.pagintationData);
}

private watchPaginationActions(): void {
  this.watchPagechanged();
  this.watchPaginationClicked();
}

private watchPagechanged(): void {
  this._paginationService.pageChanged
    .pipe(takeUntil(this.destroy$))
    .subscribe((pageNo) => {
      
      this.newPageNo = pageNo;
        this.loadNextPage(this.newPageNo);

    })
}

private watchPaginationClicked(): void {
  this._paginationService.pageClicked
    .pipe(takeUntil(this.destroy$))
    .subscribe((nextPage: number) => {
      

      if (this.pagintationData.currentPage != nextPage) {
        this.loadNextPage(nextPage);
        this.pagintationData.currentPage = this.newPageNo;
      }
    })
}

private loadNextPage(nextPage: number): void {
  this.pagintationData.currentPage = nextPage;
  this.GetNotificationListForBackOffice(this.pagintationData.currentPage, this.pagintationData.pageSize);
}

  private GetNotificationListForBackOffice(currentPage: number , pageSize:number): void {
    this._notificationsService.GetNotificationListForBackOfficePaged(currentPage,pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        
        if (res.isDone && res.data) {
          this.notificationList = res.data.results;
          this.notViewedCount = res.data.totalCount

          this.setPaginationData(this.pagintationData.currentPage, this.pageSize, this.notViewedCount)

        }
      })
  }
  public onNotificationClicked(notification: SysNotification) {
    console.log("notification", notification);
    this._notificationsService.MarkNotificationViewed(notification.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: BaseResponse<any>) => {
        if (res) {
          this.GetNotificationListForBackOffice(this.pagintationData.currentPage, this.pagintationData.pageSize);
          switch (notification.notificationActorTypeId) {
            case (this.notificationActorType.Employee):
              switch (notification.requestTypeId) {
                case (this.requestType.ReformerTaskrequests):
                  this.navigateReformerTask(notification.requestId)
                  break;
                case (this.requestType.ReformationSession):
                  this.navigateReformationSession(notification.requestId)
                  break;
                // case (this.requestType.ReformationReport):
                //   this.navigateReformationReport(notification.requestId)
                //   break;
                case (this.requestType.ExtendReconciliationPeriodRequest):
                  this.navigateExtendReconciliationPeriodRequest(notification.requestId)
                  break;
                case (this.requestType.StopFreeUpReformer):
                  this.navigateStopFreeUpReformer(notification.requestId)
                  break;
                case (this.requestType.ArbitratorTaskrequests):
                  this.navigateArbitratorTaskrequests(notification.requestId)
                  break;
                case (this.requestType.ArbitrationSession):
                  this.navigateArbitrationSession(notification.requestId)
                  break;
                // case (this.requestType.ArbitrationReport):
                //   this.navigateArbitrationReport(notification.requestId)
                //   break;
                case (this.requestType.ExtendArbitrationPeriodRequest):
                  this.navigateExtendArbitrationPeriodRequest(notification.requestId)
                  break;
                case (this.requestType.StopFreeUpArbitrator):
                  this.navigateStopFreeUpArbitrator(notification.requestId)
                  break;

                case (this.requestType.LitigationRequest):
                  this.navigateLitigationRequest(notification.requestId)
                  break;
                case (this.requestType.JoinRequestAsReformerRequest):
                  this.navigateJoinRequestAsReformerRequest(notification.requestId)
                  break;
                case (this.requestType.JoinRequestAsArbitratorRequest):
                  this.navigateJoinRequestAsArbitratorRequest(notification.requestId)
                  break;
                case (this.requestType.ArbitratorNominationList):
                  this.navigateArbitratorNominationList(notification.requestId)
                  break;
                case (this.requestType.ArbitratorChairmanNominationList):
                  this.navigateArbitratorChairmanNominationList(notification.requestId)
                  break;
              }
              break;
          }
        }
      })
  }

  // helper methods
  private navigateReformerTask(requestId: string): void {
    this._router.navigate([this.ReformerTaskrequestsUrl]);
  }
  private navigateReformationSession(requestId: string): void {
    this._router.navigate([this.ReformationSessionUrl]);
    // this._router.navigate([this.ReformationSessionUrl, requestId]);
  }
  // private navigateReformationReport(requestId: string): void {
  //   this._router.navigate([this.ReformationReportUrl, requestId]);
  // }

  private navigateExtendReconciliationPeriodRequest(requestId: string): void {
    this._router.navigate([this.ExtendReconciliationPeriodRequestUrl, requestId]);
  }
  private navigateStopFreeUpReformer(requestId: string): void {
    this._router.navigate([this.StopFreeUpReformerUrl, requestId]);
  }
  private navigateArbitratorTaskrequests(requestId: string): void {
    this._router.navigate([this.ArbitratorTaskrequestsUrl, requestId]);
  }
  private navigateArbitrationSession(requestId: string): void {
    this._router.navigate([this.ArbitrationSessionUrl]);
    // this._router.navigate([this.ArbitrationSessionUrl, requestId]);
  }
  // private navigateArbitrationReport(requestId: string): void {
  //   this._router.navigate([this.ArbitrationReportUrl, requestId]);
  // }
  private navigateExtendArbitrationPeriodRequest(requestId: string): void {
    this._router.navigate([this.ExtendArbitrationPeriodRequestUrl, requestId]);
  }
  private navigateStopFreeUpArbitrator(requestId: string): void {
    this._router.navigate([this.StopFreeUpArbitratorUrl, requestId]);
  }
  private navigateLitigationRequest(requestId: string): void {
    this._router.navigate([this.LitigationRequestUrl, requestId]);
  }
  private navigateJoinRequestAsReformerRequest(requestId: string): void {
    this._router.navigate([this.JoinRequestAsReformerRequesUrl, requestId]);
  }
  private navigateJoinRequestAsArbitratorRequest(requestId: string): void {
    this._router.navigate([this.JoinRequestAsArbitratorRequestUrl, requestId]);
  }
  private navigateArbitratorNominationList(requestId: string): void {
    this._router.navigate([this.ArbitratorNominationListUrl, requestId]);
  }
  private navigateArbitratorChairmanNominationList(requestId: string): void {
    this._router.navigate([this.ArbitratorChairmanNominationListUrl, requestId]);
  }

}
