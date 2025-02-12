import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { SysNotification } from '../../models/sys-notification.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { NotificationResponseDto } from '../../models/notification-response-dto.model';
import { Pagination, pagination } from '@app/shared/models/pagination.model';

@Injectable()
export class NotificationsService {

  constructor(private _HttpClient: HttpClient) { }

  GetNotificationListForBackOffice(): Observable<BaseResponse<NotificationResponseDto>> {
    return this._HttpClient.get<BaseResponse<NotificationResponseDto>>(Configuration.APIs.Notification.GetNotificationListForBackOffice)
  };
  GetNotificationListForBackOfficePaged(pageIndex: number , pageSize:number): Observable<BaseResponse<Pagination<NotificationResponseDto[]>>> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append("pageIndex", pageIndex);
    queryParams = queryParams.append("pageSize", pageSize);

    return this._HttpClient.get<BaseResponse<Pagination<NotificationResponseDto[]>>>(Configuration.APIs.Notification.GetNotificationListForBackOfficePaged , { params: queryParams })
  };

  MarkNotificationViewed(notificationId: string): Observable<BaseResponse<any>> {
    return this._HttpClient.get<BaseResponse<any>>(`${Configuration.APIs.Notification.MarkNotificationViewed}/${notificationId}`)
  };

}
