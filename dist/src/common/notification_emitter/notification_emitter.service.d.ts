import { EventEmitter2 } from "@nestjs/event-emitter";
import { PushTopics } from "../../core/utils/enums";
import { NotificationData } from "./notification.event";
export declare const rExp: RegExp;
export declare class NotificationEmitterService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    adminNotification(title: string, body: string): Promise<void>;
    subscribeOnesignalTopic(token: string, topic: PushTopics): Promise<void>;
    subscribeFcmTopic(token: string, topic: PushTopics): Promise<void>;
    unSubscribeFcmTopic(token: string, topic: PushTopics): Promise<void>;
    fcmSend(notificationData: NotificationData): void;
    oneSignalSend(notificationData: NotificationData): void;
}
