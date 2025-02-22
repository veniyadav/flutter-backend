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
exports.RoomMiddlewareService = void 0;
const common_1 = require("@nestjs/common");
const room_member_service_1 = require("../room_member/room_member.service");
const single_room_settings_service_1 = require("../single_room_settings/single_room_settings.service");
let RoomMiddlewareService = class RoomMiddlewareService {
    constructor(roomMember, singleRoomSetting) {
        this.roomMember = roomMember;
        this.singleRoomSetting = singleRoomSetting;
    }
    async isThereRoomMember(roomId, userId, select) {
        return this.roomMember.findOne({ uId: userId, rId: roomId }, select);
    }
    async isThereRoomMemberOrThrow(roomId, userId) {
        let r = await this.isThereRoomMember(roomId, userId);
        if (!r)
            throw new common_1.NotFoundException("While isThereRoomOrThrow No room between roomId " + roomId + " and user " + userId);
        return r;
    }
    async getSingleRoomId(peerId, myId) {
        let x = await this.getSingleRoomSetting(peerId, myId);
        if (!x) {
            return null;
        }
        return x._id.toString();
    }
    async getSingleRoomSetting(user1, user2) {
        return this.singleRoomSetting.findOne({
            $or: [
                { $and: [{ cId: user1 }, { pId: user2 }] },
                { $and: [{ pId: user1 }, { cId: user2 }] }
            ]
        });
    }
    async unDeleteAllRoomMembers(roomId) {
        return this.roomMember.updateMany({
            rId: roomId,
            isD: true
        }, { isD: false });
    }
};
RoomMiddlewareService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_member_service_1.RoomMemberService,
        single_room_settings_service_1.SingleRoomSettingsService])
], RoomMiddlewareService);
exports.RoomMiddlewareService = RoomMiddlewareService;
//# sourceMappingURL=room_middleware.service.js.map