import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '@app/core/models/base-response';
import { Observable } from 'rxjs';
import { SysNotification } from '../../models/sys-notification.model';
import { Configuration } from '@app/core/configurations/shared.config';
import { NotificationResponseDto } from '../../models/notification-response-dto.model';

@Injectable()
export class NotificationsService {

  constructor(private _HttpClient: HttpClient) { }

  GetNotificationListForBackOffice(): Observable<BaseResponse<NotificationResponseDto>> {
    return this._HttpClient.get<BaseResponse<NotificationResponseDto>>(Configuration.APIs.Notification.GetNotificationListForBackOffice)
  };

  MarkNotificationViewed(notificationId: string): Observable<BaseResponse<any>> {
    return this._HttpClient.get<BaseResponse<any>>(`${Configuration.APIs.Notification.MarkNotificationViewed}/${notificationId}`)
  };

}
