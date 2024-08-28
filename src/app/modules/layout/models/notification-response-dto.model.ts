import { SysNotification } from "./sys-notification.model";

export interface NotificationResponseDto {
    notViewedCount: number;
    notificationList: SysNotification[]

}
