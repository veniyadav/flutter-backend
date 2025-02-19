"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEvent = exports.NotificationData = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const OneSignal = __importStar(require("onesignal-node"));
const config_1 = require("@nestjs/config");
const messaging_1 = require("firebase-admin/messaging");
const user_service_1 = require("../../api/user_modules/user/user.service");
const user_device_service_1 = require("../../api/user_modules/user_device/user_device.service");
const enums_1 = require("../../core/utils/enums");
class NotificationData {
}
exports.NotificationData = NotificationData;
const fcmErrorCodes = [
    "messaging/invalid-registration-token",
    "messaging/registration-token-not-registered",
    "messaging/invalid-argument"
];
let NotificationEvent = class NotificationEvent {
    constructor(userService, userDevice, config) {
        this.userService = userService;
        this.userDevice = userDevice;
        this.config = config;
        this.isFirebaseFcmEnabled = "true" === "true";
        this.isOneSignalEnabled = "true" === "true";
        if (this.isFirebaseFcmEnabled) {
            this.messaging = (0, messaging_1.getMessaging)();
        }
        if (this.isOneSignalEnabled) {
            this.onesignalClient = new OneSignal.Client("99976f21-4d5b-45c4-a0bd-0b601c6824be", "os_v2_app_tglw6iknlnc4jif5bnqby2bex3dawied6fuehtms2lr3q5cauzbyc2evclak454agw47viyngbpmus42zd6ev2ke4lp7onzotyagwmy");
        }
    }
    async onesignalTopic(event) {
        if (!this.onesignalClient)
            return;
        await this.onesignalClient.editDevice(event.token, { tags: { [event.topic]: true } });
    }
    async fcmTopic(event) {
        if (this.messaging) {
            await this.messaging.subscribeToTopic(event.token, event.topic);
        }
    }
    async unsubscribeFCM(event) {
        if (this.messaging) {
            await this.messaging.unsubscribeFromTopic(event.token, event.topic);
        }
    }
    async sendToAllActiveUsers(title, body) {
        if (this.isFirebaseFcmEnabled && this.messaging) {
            try {
                await this.messaging.send({
                    topic: enums_1.PushTopics.AdminAndroid,
                    notification: { body, title },
                    android: { priority: "high" }
                });
                await this.messaging.send({
                    topic: enums_1.PushTopics.AdminIos,
                    notification: { body, title },
                    apns: { headers: { "apns-priority": "10" } }
                });
            }
            catch (err) {
                console.error(err);
            }
        }
        if (this.isOneSignalEnabled && this.onesignalClient) {
            const notification = {
                included_segments: ["Active Users", "Subscribed Users"],
                priority: 10,
                headings: { en: title },
                contents: { en: body }
            };
            this.onesignalClient.createNotification(notification).catch(console.error);
        }
    }
    async sendToOneSignal(event) {
        if (!event.tokens.length)
            return;
        event.body = event.body.slice(0, 1000);
        if (JSON.stringify(event.data).length >= 4000) {
            delete event.data["vMessage"];
        }
        try {
            for (let i = 0; i < event.tokens.length; i += 2000) {
                const batchTokens = event.tokens.slice(i, i + 2000);
                await this._oneSignalPush(event, batchTokens);
            }
        }
        catch (e) {
            console.error(e);
        }
    }
    async sendToFcm(event) {
        if (!event.tokens.length)
            return;
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
        }
        catch (e) {
            console.error(e);
        }
    }
    async _fcmSend(event, tokens) {
        const messages = tokens.map(token => ({
            token,
            notification: {
                title: event.title,
                body: event.body,
            },
            data: event.data,
            android: {
                notification: {
                    tag: Math.random().toString(),
                    icon: "@mipmap/ic_launcher",
                    priority: "high",
                    defaultSound: true,
                    channelId: event.tag
                },
                priority: "high"
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
        }
        catch (error) {
            console.error("Error sending messages:", error);
        }
    }
    async _oneSignalPush(event, tokens) {
        const notification = {
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
    async _afterFcmSendMsg(reason, event) {
        let tokensToDelete = [];
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
};
__decorate([
    (0, event_emitter_1.OnEvent)("topic.onesignal"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEvent.prototype, "onesignalTopic", null);
__decorate([
    (0, event_emitter_1.OnEvent)("topic.fcm"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEvent.prototype, "fcmTopic", null);
__decorate([
    (0, event_emitter_1.OnEvent)("un.sub"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationEvent.prototype, "unsubscribeFCM", null);
__decorate([
    (0, event_emitter_1.OnEvent)("send.all.active"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], NotificationEvent.prototype, "sendToAllActiveUsers", null);
__decorate([
    (0, event_emitter_1.OnEvent)("send.onesignal"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NotificationData]),
    __metadata("design:returntype", Promise)
], NotificationEvent.prototype, "sendToOneSignal", null);
__decorate([
    (0, event_emitter_1.OnEvent)("send.fcm"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NotificationData]),
    __metadata("design:returntype", Promise)
], NotificationEvent.prototype, "sendToFcm", null);
NotificationEvent = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_device_service_1.UserDeviceService,
        config_1.ConfigService])
], NotificationEvent);
exports.NotificationEvent = NotificationEvent;
//# sourceMappingURL=notification.event.js.map