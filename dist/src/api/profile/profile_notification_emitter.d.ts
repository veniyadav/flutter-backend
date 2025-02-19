import { NotificationEmitterService } from "../../common/notification_emitter/notification_emitter.service";
import { UserService } from "../user_modules/user/user.service";
import { UserDeviceService } from "../user_modules/user_device/user_device.service";
import { IUser } from "../user_modules/user/entities/user.entity";
export declare class ProfileNotificationEmitter {
    readonly emitterService: NotificationEmitterService;
    private readonly userService;
    private readonly userDevice;
    constructor(emitterService: NotificationEmitterService, userService: UserService, userDevice: UserDeviceService);
    notify(peerId: string, myUser: IUser): Promise<void>;
    private emit;
}
