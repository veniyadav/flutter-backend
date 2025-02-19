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
exports.ChannelAdminService = void 0;
const common_1 = require("@nestjs/common");
const room_member_service_1 = require("../../../chat/room_member/room_member.service");
const message_service_1 = require("../../../chat/message/message.service");
const user_service_1 = require("../../user_modules/user/user.service");
const single_room_settings_service_1 = require("../../../chat/single_room_settings/single_room_settings.service");
const single_room_settings_service_2 = require("../../../chat/order_room_settings/single_room_settings.service");
const group_settings_service_1 = require("../../../chat/group_settings/group_settings.service");
const broadcast_settings_service_1 = require("../../../chat/broadcast_settings/broadcast_settings.service");
const config_1 = require("@nestjs/config");
const enums_1 = require("../../../core/utils/enums");
let ChannelAdminService = class ChannelAdminService {
    constructor(roomService, messageService, userService, singleSettingService, orderRoomSettingsService, groupSettingService, broadcastSettingService, config) {
        this.roomService = roomService;
        this.messageService = messageService;
        this.userService = userService;
        this.singleSettingService = singleSettingService;
        this.orderRoomSettingsService = orderRoomSettingsService;
        this.groupSettingService = groupSettingService;
        this.broadcastSettingService = broadcastSettingService;
        this.config = config;
    }
    async getRoomCounterForPeer(peerId) {
        let single = await this.roomService.findCount({
            uId: peerId,
            rT: enums_1.RoomType.Single
        });
        let group = await this.roomService.findCount({
            uId: peerId,
            rT: enums_1.RoomType.GroupChat
        });
        let broadcast = await this.roomService.findCount({
            uId: peerId,
            rT: enums_1.RoomType.Broadcast
        });
        let order = await this.roomService.findCount({
            uId: peerId,
            rT: enums_1.RoomType.Order
        });
        return {
            "single": single,
            "order": order,
            "group": group,
            "broadcast": broadcast,
            "total": single + order + group + broadcast
        };
    }
    async getRoomCounter() {
        let single = await this.singleSettingService.findCount();
        let order = await this.orderRoomSettingsService.findCount();
        let group = await this.groupSettingService.findCount();
        let broadcast = await this.broadcastSettingService.findCount();
        return {
            "single": single,
            "order": order,
            "group": group,
            "broadcast": broadcast,
            "total": single + order + group + broadcast
        };
    }
    async getMessagesCounterForPeer(peerId) {
        return {
            "messages": await this.messageService.findCount({
                sId: peerId
            }),
            "textMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Text },
                sId: peerId
            }),
            "imageMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Image },
                sId: peerId
            }),
            "videoMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Video },
                sId: peerId
            }),
            "voiceMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Voice },
                sId: peerId
            }),
            "callMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Call },
                sId: peerId
            }),
            "voiceCallMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Call },
                sId: peerId,
                "msgAtt.withVideo": { $eq: false }
            }),
            "videoCallMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Call },
                sId: peerId,
                "msgAtt.withVideo": { $eq: true }
            }),
            "fileMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.File },
                sId: peerId
            }),
            "infoMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Info },
                sId: peerId
            }),
            "locationMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Location },
                sId: peerId
            }),
            "allDeletedMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.AllDeleted },
                sId: peerId
            }),
        };
    }
    async getMessagesCounter() {
        return {
            "messages": await this.messageService.findCount(),
            "textMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Text }
            }),
            "imageMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Image }
            }),
            "videoMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Video }
            }),
            "voiceMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Voice }
            }),
            "fileMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.File }
            }),
            "infoMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Info }
            }),
            "callMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Call }
            }),
            "voiceCallMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Call },
                "msgAtt.withVideo": { $eq: false }
            }),
            "videoCallMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Call },
                "msgAtt.withVideo": { $eq: true }
            }),
            "locationMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.Location }
            }),
            "allDeletedMessages": await this.messageService.findCount({
                mT: { $eq: enums_1.MessageType.AllDeleted }
            }),
        };
    }
};
ChannelAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_member_service_1.RoomMemberService,
        message_service_1.MessageService,
        user_service_1.UserService,
        single_room_settings_service_1.SingleRoomSettingsService,
        single_room_settings_service_2.OrderRoomSettingsService,
        group_settings_service_1.GroupSettingsService,
        broadcast_settings_service_1.BroadcastSettingsService,
        config_1.ConfigService])
], ChannelAdminService);
exports.ChannelAdminService = ChannelAdminService;
//# sourceMappingURL=channel_admin_service.js.map