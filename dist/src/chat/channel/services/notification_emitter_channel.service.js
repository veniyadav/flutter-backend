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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEmitterChannelService = void 0;
const common_1 = require("@nestjs/common");
const notification_emitter_service_1 = require("../../../common/notification_emitter/notification_emitter.service");
const room_middleware_service_1 = require("../../room_middleware/room_middleware.service");
const group_member_service_1 = require("../../group_member/group_member.service");
const broadcast_member_service_1 = require("../../broadcast_member/broadcast_member.service");
const user_device_service_1 = require("../../../api/user_modules/user_device/user_device.service");
const interfaceces_1 = require("../../../core/utils/interfaceces");
const enums_1 = require("../../../core/utils/enums");
let NotificationEmitterChannelService = class NotificationEmitterChannelService {
    constructor(emitterService, middlewareService, groupMember, broadcastMember, userDevice) {
        this.emitterService = emitterService;
        this.middlewareService = middlewareService;
        this.groupMember = groupMember;
        this.broadcastMember = broadcastMember;
        this.userDevice = userDevice;
    }
    _parseMessageMentions(body) {
        return body.replaceAll(notification_emitter_service_1.rExp, substring => {
            try {
                return substring.split(":")[0].substring(1);
            }
            catch (e) {
                console.log("Error while _parseMessageMentions in NotificationEmitterService");
                return substring;
            }
        });
    }
    async singleChatNotification(peerId, msg) {
        let tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(msg.rId, peerId);
        if (rM.isM) {
            return;
        }
        let devices = await this.userDevice.getUserPushTokens(peerId);
        tokens.fcm = devices.fcm;
        tokens.oneSignal = devices.oneSignal;
        this.emit({
            data: {
                type: enums_1.NotificationType.SingleChat,
                vMessage: JSON.stringify(msg),
                fromVChat: "true"
            },
            tag: msg.rId,
            body: msg.isOneSeen ? "1️⃣" : this._parseMessageMentions(msg.c),
            title: msg.sName,
            tokens: []
        }, tokens);
    }
    emit(notificationData, tokens) {
        if (tokens.fcm.length != 0) {
            notificationData.tokens = tokens.fcm;
            this.emitterService.fcmSend(notificationData);
        }
        if (tokens.oneSignal.length != 0) {
            notificationData.tokens = tokens.oneSignal;
            this.emitterService.oneSignalSend(notificationData);
        }
    }
    async groupChatNotification(msg, groupName) {
        let tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
        let groupId = msg.rId;
        let members = await this.groupMember.findAll({ rId: groupId }, "uId");
        for (let m of members) {
            let rM = await this.middlewareService.isThereRoomMember(msg.rId, m.uId);
            if (rM == null)
                continue;
            if (!rM.isM && m.uId.toString() != msg.sId) {
                let d = await this.userDevice.getUserPushTokens(m.uId);
                tokens.fcm.push(...d.fcm);
                tokens.oneSignal.push(...d.oneSignal);
            }
        }
        this.emit({
            data: {
                type: enums_1.NotificationType.GroupChat,
                vMessage: JSON.stringify(msg),
                fromVChat: "true"
            },
            tag: msg.rId,
            body: `${msg.sName} : ${msg.isOneSeen == true ? "1️⃣" : this._parseMessageMentions(msg.c)}`,
            title: groupName + " " + "👥",
            tokens: []
        }, tokens);
    }
    async broadcastNotification(msg) {
        let tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
        let broadcastId = msg.rId;
        let members = await this.broadcastMember.findAll({ bId: broadcastId }, 'rId uId');
        for (let m of members) {
            let rM = await this.middlewareService.isThereRoomMember(m.rId, m.uId);
            if (rM == null)
                continue;
            if (!rM.isM && m.uId.toString() != msg.sId) {
                let d = await this.userDevice.getUserPushTokens(m.uId);
                tokens.fcm.push(...d.fcm);
                tokens.oneSignal.push(...d.oneSignal);
            }
        }
        this.emit({
            data: {
                type: enums_1.NotificationType.BroadcastChat,
                vMessage: JSON.stringify(msg),
                fromVChat: "true"
            },
            tag: msg.rId,
            body: msg.isOneSeen ? "1️⃣" : this._parseMessageMentions(msg.c),
            title: msg.sName,
            tokens: []
        }, tokens);
    }
};
NotificationEmitterChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_emitter_service_1.NotificationEmitterService,
        room_middleware_service_1.RoomMiddlewareService,
        group_member_service_1.GroupMemberService,
        broadcast_member_service_1.BroadcastMemberService,
        user_device_service_1.UserDeviceService])
], NotificationEmitterChannelService);
exports.NotificationEmitterChannelService = NotificationEmitterChannelService;
//# sourceMappingURL=notification_emitter_channel.service.js.map