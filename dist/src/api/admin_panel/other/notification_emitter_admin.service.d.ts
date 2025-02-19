import { NotificationEmitterService } from "../../../common/notification_emitter/notification_emitter.service";
import { CreateAdminNotificationDto } from "../../admin_notification/dto/create-admin_notification.dto";
export declare class NotificationEmitterAdminService {
    readonly notificationEmitterService: NotificationEmitterService;
    constructor(notificationEmitterService: NotificationEmitterService);
    emitNotification(dto: CreateAdminNotificationDto): Promise<void>;
}
