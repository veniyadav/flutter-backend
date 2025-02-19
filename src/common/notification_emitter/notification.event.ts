import { Inject, Logger, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import * as OneSignal from "onesignal-node";
import { ConfigService } from "@nestjs/config";
import { CreateNotificationBody } from "onesignal-node/lib/types";
import { getMessaging, Message, Messaging } from "firebase-admin/messaging";
import { UserService } from "../../api/user_modules/user/user.service";
import { UserDeviceService } from "../../api/user_modules/user_device/user_device.service";
import { PushTopics } from "../../core/utils/enums";

// Notification Data Structure
export class NotificationData {
    tokens: string[];
    title: string;
    body: string;
    tag: string;
    data: {};
    sound?: string;
}

// Firebase error codes for token validation
const fcmErrorCodes = [
    "messaging/invalid-registration-token",
    "messaging/registration-token-not-registered",
    "messaging/invalid-argument"
];

@Injectable()
export class NotificationEvent {
    private readonly messaging?: Messaging;
    private readonly onesignalClient?: OneSignal.Client;
    private readonly isFirebaseFcmEnabled: boolean;
    private readonly isOneSignalEnabled: boolean;

    constructor(
        private readonly userService: UserService,
        private readonly userDevice: UserDeviceService,
        private readonly config: ConfigService
    ) {
        this.isFirebaseFcmEnabled = "true" === "true";
        this.isOneSignalEnabled = "true" === "true";

        if (this.isFirebaseFcmEnabled) {
            this.messaging = getMessaging();
        }
        
        if (this.isOneSignalEnabled) {
            this.onesignalClient = new OneSignal.Client(
                "99976f21-4d5b-45c4-a0bd-0b601c6824be",
                "os_v2_app_tglw6iknlnc4jif5bnqby2bex3dawied6fuehtms2lr3q5cauzbyc2evclak454agw47viyngbpmus42zd6ev2ke4lp7onzotyagwmy"
            );
        }
    }

    /** Subscribe to OneSignal topic */
    @OnEvent("topic.onesignal")
    async onesignalTopic(event: { token: string; topic: string }) {
        if (!this.onesignalClient) return;
        await this.onesignalClient.editDevice(event.token, { tags: { [event.topic]: true } });
    }

    /** Subscribe to FCM topic */
    @OnEvent("topic.fcm")
    async fcmTopic(event: { token: string; topic: string }) {
        if (this.messaging) {
            await this.messaging.subscribeToTopic(event.token, event.topic);
        }
    }

    /** Unsubscribe from FCM topic */
    @OnEvent("un.sub")
    async unsubscribeFCM(event: { token: string; topic: string }) {
        if (this.messaging) {
            await this.messaging.unsubscribeFromTopic(event.token, event.topic);
        }
    }

    /** Send notification to all active users */
    @OnEvent("send.all.active")
    async sendToAllActiveUsers(title: string, body: string) {
        if (this.isFirebaseFcmEnabled && this.messaging) {
            try {
                await this.messaging.send({
                    topic: PushTopics.AdminAndroid,
                    notification: { body, title },
                    android: { priority: "high" }
                });

                await this.messaging.send({
                    topic: PushTopics.AdminIos,
                    notification: { body, title },
                    apns: { headers: { "apns-priority": "10" } }
                });
            } catch (err) {
                console.error(err);
            }
        }

        if (this.isOneSignalEnabled && this.onesignalClient) {
            const notification: CreateNotificationBody = {
                included_segments: ["Active Users", "Subscribed Users"],
                priority: 10,
                headings: { en: title },
                contents: { en: body }
            };

            this.onesignalClient.createNotification(notification).catch(console.error);
        }
    }

    /** Send OneSignal Notification */
    @OnEvent("send.onesignal")
    async sendToOneSignal(event: NotificationData) {
        if (!event.tokens.length) return;
        event.body = event.body.slice(0, 1000);

        if (JSON.stringify(event.data).length >= 4000) {
            delete event.data["vMessage"];
        }

        try {
            for (let i = 0; i < event.tokens.length; i += 2000) {
                const batchTokens = event.tokens.slice(i, i + 2000);
                await this._oneSignalPush(event, batchTokens);
            }
        } catch (e) {
            console.error(e);
        }
    }

    /** Send Firebase Cloud Messaging (FCM) Notification */
    @OnEvent("send.fcm")
    async sendToFcm(event: NotificationData) {
        if (!event.tokens.length) return;
        event.body = event.body.slice(0, 1000);

        if (JSON.stringify(event.data).length >= 4000) {
            delete event.data["vMessage"];
        }

        try {
            if (this.isFirebaseFcmEnabled) {
                for (let i = 0; i < event.tokens.length; i += 1000) {
                    const batchTokens = event.tokens.slice(i, i + 1000);
                    await this._fcmSend(event, batchTokens);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    private async _fcmSend(event: NotificationData, tokens: string[]) {
        const messages: Message[] = tokens.map(token => ({
            token, // Each token needs an individual message
            notification: {
                title: event.title,
                body: event.body,
            },
            data: event.data,
            android: {
                notification: {
                    tag: Math.random().toString(),
                    icon: "@mipmap/ic_launcher",
                    priority: "high",  // Fix: Explicitly using "high" instead of a string
                    defaultSound: true,
                    channelId: event.tag
                },
                priority: "high" // Fix: Explicitly set the correct enum value
            },
            apns: {
                payload: {
                    aps: {
                        contentAvailable: true,
                    },
                },
                headers: {
                    "apns-priority": "10"
                }
            }
        }));
    
        try {
            const response = await this.messaging.sendEach(messages);
            console.log("Successfully sent messages:", response);
        } catch (error) {
            console.error("Error sending messages:", error);
        }
    }
    
    /** Send push notification to OneSignal */
    private async _oneSignalPush(event: NotificationData, tokens: string[]) {
        const notification: CreateNotificationBody = {
            included_segments: ["include_player_ids"],
            priority: 10,
            include_player_ids: tokens,
            headings: { en: event.title },
            contents: { en: event.body },
            content_available: true,
            data: event.data
        };

        this.onesignalClient.createNotification(notification).catch(console.error);
    }

    /** Handle FCM failures and remove invalid tokens */
    private async _afterFcmSendMsg(reason, event: NotificationData) {
        let tokensToDelete: string[] = [];

        for (const response of reason.responses) {
            if (!response.success) {
                const err = response.error?.code;
                const errInfo = response.error?.errorInfo?.code;
                if (fcmErrorCodes.includes(err) || fcmErrorCodes.includes(errInfo)) {
                    tokensToDelete.push(event.tokens[reason.responses.indexOf(response)]);
                }
            }
        }

        if (tokensToDelete.length) {
            console.log("Deleting invalid tokens:", tokensToDelete);
            await this.userDevice.deleteFcmTokens(tokensToDelete);
        }
    }
}
