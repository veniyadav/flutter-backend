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
exports.UserBanService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const ban_service_1 = require("../../ban/ban.service");
const room_member_service_1 = require("../../../chat/room_member/room_member.service");
const socket_io_service_1 = require("../../../chat/socket_io/socket_io.service");
const room_middleware_service_1 = require("../../../chat/room_middleware/room_middleware.service");
const enums_1 = require("../../../core/utils/enums");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
let UserBanService = class UserBanService {
    constructor(userService, banService, roomMember, socketIoService, roomMiddleWar) {
        this.userService = userService;
        this.banService = banService;
        this.roomMember = roomMember;
        this.socketIoService = socketIoService;
        this.roomMiddleWar = roomMiddleWar;
    }
    async getMyBlockMeOnly(myId, dto) {
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 20,
                page: 1,
                sort: "-_id",
                ...dto,
                populate: [
                    {
                        path: "targetId",
                        select: "fullName bio userImage",
                    },
                ]
            },
        }).get();
        delete dto['limit'];
        delete dto['page'];
        paginationParameters[0] = { ...dto, bannerId: myId };
        return await this.banService.paginate(paginationParameters);
    }
    async getMyBlockTheyAndMe(myId) {
        let outUsers = [];
        let bans = await this.banService.findAll({
            $or: [
                { bannerId: myId },
                { targetId: myId }
            ]
        }, "bannerId targetId");
        for (let b of bans) {
            if (b.bannerId != myId) {
                outUsers.push(b.bannerId.toString());
            }
            if (b.targetId != myId) {
                outUsers.push(b.targetId.toString());
            }
        }
        return outUsers;
    }
    async _updateSingleChatBlock(peerIdDto, myId, toBlock) {
        let singleChatId = await this.roomMiddleWar.getSingleRoomId(peerIdDto.peerId, myId);
        if (!singleChatId)
            return;
        if (toBlock) {
            this.socketIoService.io.to(singleChatId)
                .emit(enums_1.SocketEventsType.v1OnBanUserChat, JSON.stringify({
                ...(await this.checkBans(peerIdDto)),
                "roomId": singleChatId
            }));
            await this.socketIoService.leaveRooms({
                roomId: singleChatId, usersIds: [
                    peerIdDto.peerId.toString(),
                    myId.toString()
                ]
            });
        }
        else {
            await this.socketIoService.joinRoom({
                roomId: singleChatId, usersIds: [
                    peerIdDto.peerId.toString(),
                    myId.toString()
                ]
            });
            this.socketIoService.io.to(singleChatId)
                .emit(enums_1.SocketEventsType.v1OnBanUserChat, JSON.stringify({
                ...(await this.checkBans(peerIdDto)),
                "roomId": singleChatId
            }));
        }
    }
    async getBan(myId, peerId) {
        return this.banService.findOne({
            $or: [
                { $and: [{ targetId: myId }, { bannerId: peerId }] },
                { $and: [{ bannerId: myId }, { targetId: peerId }] }
            ]
        });
    }
    async ban(dto) {
        if (dto.peerId == dto.myUser._id)
            throw new common_1.BadRequestException("You cant ban your self");
        let ban = await this.getBan(dto.myUser._id, dto.peerId);
        if (ban) {
            let myBan = await this.banService.findOne({
                bannerId: dto.myUser._id,
                targetId: dto.peerId
            });
            if (myBan) {
                return "You already ban this user";
            }
            await this.banService.create({
                bannerId: dto.myUser._id,
                targetId: dto.peerId
            });
            await this._updateSingleChatBlock(dto, dto.myUser._id, true);
        }
        else {
            await this.banService.create({
                bannerId: dto.myUser._id,
                targetId: dto.peerId
            });
            await this._updateSingleChatBlock(dto, dto.myUser._id, true);
        }
        return "you block successfully";
    }
    async unBan(dto) {
        if (dto.peerId == dto.myUser._id)
            throw new common_1.BadRequestException("You cant un ban your self");
        if (dto.peerId.toString() == dto.myUser._id) {
            throw new common_1.BadRequestException("You cant apply this action to your self");
        }
        let ban = await this.getBan(dto.myUser._id, dto.peerId);
        if (!ban)
            return "Already un baned";
        let myBan = await this.banService.findOne({
            bannerId: dto.myUser._id,
            targetId: dto.peerId
        });
        if (!myBan) {
            throw new common_1.BadRequestException("you dont have access you dont have baned this user");
        }
        await this.banService.findByIdAndDelete(myBan._id);
        await this._updateSingleChatBlock(dto, dto.myUser._id, false);
        return "success";
    }
    async checkBans(dto) {
        let singleChatId = await this.roomMiddleWar.getSingleRoomId(dto.peerId, dto.myUser._id);
        let res = {
            isMeBanner: false,
            isPeerBanner: false,
            roomId: singleChatId ?? ""
        };
        let bans = await this.banService.findAll({
            $or: [
                { $and: [{ targetId: dto.myUser._id }, { bannerId: dto.peerId }] },
                { $and: [{ bannerId: dto.myUser._id }, { targetId: dto.peerId }] }
            ]
        });
        if (bans.length == 0) {
            return res;
        }
        for (let ban of bans) {
            if (ban.bannerId.toString() == dto.myUser._id) {
                res.isMeBanner = true;
            }
            else {
                res.isPeerBanner = true;
            }
        }
        return res;
    }
};
UserBanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        ban_service_1.BanService,
        room_member_service_1.RoomMemberService,
        socket_io_service_1.SocketIoService,
        room_middleware_service_1.RoomMiddlewareService])
], UserBanService);
exports.UserBanService = UserBanService;
//# sourceMappingURL=user_ban.service.js.map