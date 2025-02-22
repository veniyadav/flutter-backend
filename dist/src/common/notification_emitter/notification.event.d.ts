import { ConfigService } from "@nestjs/config";
import { UserService } from "../../api/user_modules/user/user.service";
import { UserDeviceService } from "../../api/user_modules/user_device/user_device.service";
export declare class NotificationData {
    tokens: string[];
    title: string;
    body: string;
    tag: string;
    data: {};
    sound?: string;
}
export declare class NotificationEvent {
    private readonly userService;
    private readonly userDevice;
    private readonly config;
    private readonly messaging?;
    private readonly onesignalClient?;
    private readonly isFirebaseFcmEnabled;
    private readonly isOneSignalEnabled;
    constructor(userService: UserService, userDevice: UserDeviceService, config: ConfigService);
    onesignalTopic(event: {
        token: string;
        topic: string;
    }): Promise<void>;
    fcmTopic(event: {
        token: string;
        topic: string;
    }): Promise<void>;
    unsubscribeFCM(event: {
        token: string;
        topic: string;
    }): Promise<void>;
    sendToAllActiveUsers(title: string, body: string): Promise<void>;
    sendToOneSignal(event: NotificationData): Promise<void>;
    sendToFcm(event: NotificationData): Promise<void>;
    private _fcmSend;
    private _oneSignalPush;
    private _afterFcmSendMsg;
}
