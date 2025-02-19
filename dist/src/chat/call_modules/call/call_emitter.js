"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CallEmitter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallEmitter = void 0;
const common_1 = require("@nestjs/common");
const notification_emitter_service_1 = require("../../../common/notification_emitter/notification_emitter.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const user_device_service_1 = require("../../../api/user_modules/user_device/user_device.service");
const enums_1 = require("../../../core/utils/enums");
const interfaceces_1 = require("../../../core/utils/interfaceces");
const group_member_service_1 = require("../../group_member/group_member.service");
let CallEmitter = CallEmitter_1 = class CallEmitter {
    constructor(emitterService, userService, groupMemberService, userDeviceService) {
        this.emitterService = emitterService;
        this.userService = userService;
        this.groupMemberService = groupMemberService;
        this.userDeviceService = userDeviceService;
        this.logger = new common_1.Logger(CallEmitter_1.name);
    }
    async groupRingNotify(model) {
        try {
            const tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
            const groupId = model.roomId;
            const members = await this.groupMemberService.findAll({
                rId: groupId,
                uId: { $ne: model.callerId }
            }, "uId");
            for (const member of members) {
                const androidDevices = await this.userDeviceService.getUserPushTokens(member.uId, enums_1.Platform.Android);
                tokens.fcm.push(...androidDevices.fcm);
                tokens.oneSignal.push(...androidDevices.oneSignal);
                const iosDevices = await this.userDeviceService.getUserPushTokens(member.uId, enums_1.Platform.Ios);
                tokens.voipKeys.push(...iosDevices.voipKeys);
            }
            this.emitNotification({
                data: {
                    type: enums_1.NotificationType.Call,
                    fromVChat: "true",
                    callData: JSON.stringify(model)
                },
                tag: "",
                body: "NEW CALL",
                title: "NEW CALL",
                sound: "ringtone",
                tokens: []
            }, tokens);
            this.emitVoip(model, tokens.voipKeys);
        }
        catch (error) {
            this.logger.error("Error sending group ring notification", error);
        }
    }
    async singleRingNotify(peerId, model) {
        try {
            const tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
            const androidDevices = await this.userDeviceService.getUserPushTokens(peerId, enums_1.Platform.Android);
            tokens.fcm = androidDevices.fcm;
            tokens.oneSignal = androidDevices.oneSignal;
            const iosDevices = await this.userDeviceService.getUserPushTokens(peerId, enums_1.Platform.Ios);
            tokens.voipKeys = iosDevices.voipKeys;
            this.emitNotification({
                data: {
                    type: enums_1.NotificationType.Call,
                    fromVChat: "true",
                    callData: JSON.stringify(model)
                },
                tag: "",
                body: "NEW CALL",
                title: "NEW CALL",
                sound: "ringtone",
                tokens: []
            }, tokens);
            this.emitVoip(model, tokens.voipKeys);
        }
        catch (error) {
            this.logger.error("Error sending single ring notification", error);
        }
    }
    async singleChatNotification(peerId, msg) {
        try {
            const tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
            const devices = await this.userDeviceService.getUserPushTokens(peerId);
            tokens.fcm = devices.fcm;
            tokens.oneSignal = devices.oneSignal;
            this.emitNotification({
                data: {
                    type: enums_1.NotificationType.SingleChat,
                    vMessage: JSON.stringify(msg),
                    fromVChat: "true"
                },
                tag: msg.rId,
                body: this.parseMessageMentions(msg.c),
                title: msg.sName,
                tokens: []
            }, tokens);
        }
        catch (error) {
            this.logger.error("Error sending single chat notification", error);
        }
    }
    parseMessageMentions(body) {
        return body.replace(notification_emitter_service_1.rExp, substring => {
            try {
                return substring.split(":")[0].substring(1);
            }
            catch (e) {
                return substring;
            }
        });
    }
    emitNotification(notificationData, tokens) {
        if (tokens.fcm.length > 0) {
            notificationData.tokens = tokens.fcm;
            this.emitterService.fcmSend(notificationData);
        }
        if (tokens.oneSignal.length > 0) {
            notificationData.tokens = tokens.oneSignal;
            this.emitterService.oneSignalSend(notificationData);
        }
    }
    emitVoip(model, voipKeys) {
        if (voipKeys.length === 0)
            return;
    }
};
CallEmitter = CallEmitter_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_emitter_service_1.NotificationEmitterService,
        user_service_1.UserService,
        group_member_service_1.GroupMemberService,
        user_device_service_1.UserDeviceService])
], CallEmitter);
exports.CallEmitter = CallEmitter;
//# sourceMappingURL=call_emitter.js.map