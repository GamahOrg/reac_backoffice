import { NotificationActorType } from "./enums/notification-actor-type.model";
import { RequestType } from "./enums/request-type.model";

export interface SysNotification {
    id: string;
    requestTypeId: RequestType;
    requestId: string;
    notificationActorTypeId: NotificationActorType;
    actorId: string;
    message: string;
    createdOn: Date;
    isViewed: boolean;
    viewedOn?: Date;
    sysNotificationActorType: NotificationActorType;
    sysRequestType: RequestType;
}
