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
exports.BroadcastChannelService = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const create_single_room_dto_1 = require("../dto/create-single-room.dto");
const chat_helper_1 = require("../chat.helper");
const socket_io_service_1 = require("../../socket_io/socket_io.service");
const remove_accents_1 = require("remove-accents");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const room_member_service_1 = require("../../room_member/room_member.service");
const message_service_1 = require("../../message/message.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const user_ban_service_1 = require("../../../api/user_modules/user_ban/user_ban.service");
const single_room_settings_service_1 = require("../../single_room_settings/single_room_settings.service");
const broadcast_settings_service_1 = require("../../broadcast_settings/broadcast_settings.service");
const broadcast_member_service_1 = require("../../broadcast_member/broadcast_member.service");
const room_middleware_service_1 = require("../../room_middleware/room_middleware.service");
const file_uploader_service_1 = require("../../../common/file_uploader/file_uploader.service");
const utils_1 = require("../../../core/utils/utils");
const enums_1 = require("../../../core/utils/enums");
const app_config_service_1 = require("../../../api/app_config/app_config.service");
const notification_emitter_channel_service_1 = require("./notification_emitter_channel.service");
let BroadcastChannelService = class BroadcastChannelService {
    constructor(channelService, roomMemberService, singleRoomSetting, messageService, userService, s3, config, socketIoService, middlewareService, broadcastSetting, broadcastMember, notificationService, appConfig, userBan) {
        this.channelService = channelService;
        this.roomMemberService = roomMemberService;
        this.singleRoomSetting = singleRoomSetting;
        this.messageService = messageService;
        this.userService = userService;
        this.s3 = s3;
        this.config = config;
        this.socketIoService = socketIoService;
        this.middlewareService = middlewareService;
        this.broadcastSetting = broadcastSetting;
        this.broadcastMember = broadcastMember;
        this.notificationService = notificationService;
        this.appConfig = appConfig;
        this.userBan = userBan;
    }
    async createBroadcastChat(dto, session) {
        let appSetting = await this.appConfig.getConfig();
        let maxBroadcastCount = appSetting.maxBroadcastMembers;
        if (dto.peerIds.length + 1 > maxBroadcastCount)
            throw new common_1.BadRequestException(`Max broadcast count is ${maxBroadcastCount}`);
        if (dto.peerIds.includes(dto.myUser._id))
            throw new common_1.BadRequestException('Your id should not included');
        let config = await this.appConfig.getConfig();
        dto.imgUrl = config.broadcastIcon;
        if (dto.imageBuffer) {
            dto.imgUrl = await this.s3.putImageCropped(dto.imageBuffer, dto.myUser._id);
            dto.imageBuffer = undefined;
        }
        let broadcastId = (0, utils_1.newMongoObjId)().toString();
        await this.roomMemberService.create({
            uId: dto.myUser._id,
            rId: broadcastId,
            lSMId: broadcastId,
            rT: enums_1.RoomType.Broadcast,
            t: dto.broadcastName,
            tEn: (0, remove_accents_1.remove)(dto.broadcastName),
            img: dto.imgUrl
        }, session);
        await this.socketIoService.joinRoom({
            roomId: broadcastId,
            usersIds: [dto.myUser._id.toString()],
        });
        let broadcastMembers = [];
        for (let uId of dto.peerIds) {
            let ban = await this.userBan.getBan(dto.myUser._id, uId);
            if (ban)
                continue;
            let rId = await this.middlewareService.getSingleRoomId(uId, dto.myUser._id);
            let peerUser = await this.userService.findByIdOrThrow(uId, "fullName fullNameEn userImage");
            if (rId) {
                broadcastMembers.push({
                    uId: uId,
                    rId: rId,
                    bId: broadcastId,
                    userData: {
                        _id: uId,
                        userImage: peerUser.userImage,
                        fullName: peerUser.fullName,
                        fullNameEn: peerUser.fullNameEn,
                    },
                });
                let sendMsgDto = (0, chat_helper_1.getMsgDtoObj)({
                    mT: enums_1.MessageType.Info,
                    user: dto.myUser,
                    rId: rId.toString(),
                    att: {
                        adminName: dto.myUser.fullName,
                        targetName: dto.broadcastName,
                        targetId: uId,
                        action: enums_1.MessageInfoType.AddToBroadcast
                    },
                    content: `${dto.myUser.fullName} added you to new broadcast ${dto.broadcastName} ${config.roomIcons.broadcast}`
                });
                let newMsg = await this.messageService.create(sendMsgDto, session);
                this.socketIoService.io
                    .to(rId.toString())
                    .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMsg));
            }
            else {
                let cDto = new create_single_room_dto_1.CreateSingleRoomDto();
                cDto.myUser = dto.myUser;
                cDto.peerId = uId;
                let newRoomId = (0, utils_1.newMongoObjId)().toString();
                await this._createPeerRoom(cDto, newRoomId, peerUser, session);
                broadcastMembers.push({
                    uId: uId,
                    rId: newRoomId,
                    bId: broadcastId,
                    userData: {
                        _id: uId,
                        userImage: peerUser.userImage,
                        fullName: peerUser.fullName,
                        fullNameEn: peerUser.fullNameEn,
                    },
                });
                let sendMsgDto = (0, chat_helper_1.getMsgDtoObj)({
                    mT: enums_1.MessageType.Info,
                    user: dto.myUser,
                    rId: newRoomId.toString(),
                    att: {
                        adminName: dto.myUser.fullName,
                        targetName: dto.broadcastName,
                        targetId: uId,
                        action: enums_1.MessageInfoType.AddToBroadcast
                    },
                    content: `${dto.myUser.fullName} added you to new broadcast ${dto.broadcastName} ${config.roomIcons.broadcast}`
                });
                let newMsg = await this.messageService.create(sendMsgDto, session);
                this.socketIoService.io
                    .to(newRoomId.toString())
                    .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMsg));
            }
        }
        let sendMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            user: dto.myUser,
            rId: broadcastId.toString(),
            att: {
                adminName: dto.myUser.fullName,
                targetName: dto.broadcastName,
                targetId: dto.myUser._id,
                action: enums_1.MessageInfoType.AddToBroadcast
            },
            content: dto.broadcastName + ' created by me ' + config.roomIcons.broadcast
        });
        let myMsg = await this.messageService.create(sendMsgDto, session);
        this.socketIoService.io
            .to(broadcastId.toString())
            .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(myMsg));
        await this.broadcastMember.createMany(broadcastMembers, session);
        await this.broadcastSetting.create({
            _id: broadcastId,
            cId: dto.myUser._id,
            bImg: dto.imgUrl,
            bName: dto.broadcastName
        }, session);
        this.notificationService.broadcastNotification(myMsg).then();
        return this.channelService._getOneFullRoomModel({ roomId: broadcastId, userId: dto.myUser._id });
    }
    async addMembersToBroadcast(bId, dto, session) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(bId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Broadcast)
            throw new common_1.BadRequestException("it must be broadcast!");
        let added = 0;
        if (dto.ids.includes(dto.myUser._id))
            throw new common_1.BadRequestException('My id should not included');
        let _appCfg = await this.appConfig.getConfig();
        let maxBroadcastCount = _appCfg.maxBroadcastMembers;
        let count = await this.broadcastMember.getBroadcastMembersCount(rM.rId);
        let newCount = dto.ids.length + count;
        if (newCount > maxBroadcastCount)
            throw new common_1.BadRequestException(`Max broadcast count is ${maxBroadcastCount}`);
        let broadcastMembers = [];
        for (let uId of dto.ids) {
            let ban = await this.userBan.getBan(dto.myUser._id, uId);
            if (ban)
                continue;
            let bUser = await this.broadcastMember.findOne({
                bId: bId,
                uId: uId
            });
            if (bUser)
                continue;
            let rId = await this.middlewareService.getSingleRoomId(uId, dto.myUser._id);
            if (rId) {
                let peerUser = await this.userService.findByIdOrThrow(uId, "fullName fullNameEn userImage");
                broadcastMembers.push({
                    uId: uId,
                    rId: rId,
                    bId: bId,
                    userData: {
                        _id: uId,
                        userImage: peerUser.userImage,
                        fullName: peerUser.fullName,
                        fullNameEn: peerUser.fullNameEn,
                    },
                });
                let sendMsgDto = (0, chat_helper_1.getMsgDtoObj)({
                    mT: enums_1.MessageType.Info,
                    user: dto.myUser,
                    rId: rId.toString(),
                    att: {
                        adminName: dto.myUser.fullName,
                        targetName: rM.t,
                        targetId: uId,
                        action: enums_1.MessageInfoType.AddToBroadcast
                    },
                    content: `${dto.myUser.fullName} added you to new broadcast ${rM.t} ${_appCfg.roomIcons.broadcast}`,
                });
                let newMsg = await this.messageService.create(sendMsgDto, session);
                this.socketIoService.io
                    .to(rId.toString())
                    .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMsg));
            }
            else {
                let cDto = new create_single_room_dto_1.CreateSingleRoomDto();
                cDto.myUser = dto.myUser;
                cDto.peerId = uId;
                let newRoomId = (0, utils_1.newMongoObjId)().toString();
                let peerUser = await this.userService.findByIdOrThrow(uId, "fullName fullNameEn userImage");
                await this._createPeerRoom(cDto, newRoomId, peerUser, session);
                broadcastMembers.push({
                    uId: uId,
                    rId: newRoomId,
                    bId: bId,
                    userData: {
                        _id: uId,
                        userImage: peerUser.userImage,
                        fullName: peerUser.fullName,
                        fullNameEn: peerUser.fullNameEn,
                    },
                });
                let sendMsgDto = (0, chat_helper_1.getMsgDtoObj)({
                    mT: enums_1.MessageType.Info,
                    user: dto.myUser,
                    rId: newRoomId.toString(),
                    att: {
                        adminName: dto.myUser.fullName,
                        targetName: rM.t,
                        targetId: uId,
                        action: enums_1.MessageInfoType.AddToBroadcast
                    },
                    content: `${dto.myUser.fullName} added you to new broadcast ${rM.t} ${_appCfg.roomIcons.broadcast}`,
                });
                let newMsg = await this.messageService.create(sendMsgDto, session);
                this.socketIoService.io
                    .to(newRoomId.toString())
                    .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMsg));
            }
            ++added;
        }
        await this.broadcastMember.createMany(broadcastMembers, session);
        return "Users added successfully count is " + added;
    }
    async kickBroadcastMember(dto) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Broadcast)
            throw new common_1.BadRequestException("it must be broadcast!");
        if (dto.myUser._id == dto.peerId) {
            throw new common_1.BadRequestException("You cant kick your self!");
        }
        await this.broadcastMember.deleteOne({
            bId: dto.roomId,
            uId: dto.peerId
        });
        return "Successfully Kicked the user";
    }
    async getBroadcastMembers(myUser, dto, roomId) {
        await this.middlewareService.isThereRoomMemberOrThrow(roomId, myUser._id);
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 30,
                page: 1,
                sort: "-_id",
                ...dto,
            },
        }).get();
        if (paginationParameters[1].page <= 0) {
            paginationParameters[1].page = 1;
        }
        if (paginationParameters[1].limit <= 0 || paginationParameters[1].limit >= 50) {
            paginationParameters[1].limit = 30;
        }
        paginationParameters[0] = {
            bId: roomId,
            ...dto.getFilter("userData.fullNameEn")
        };
        return this.broadcastMember.paginate(paginationParameters);
    }
    async updateTitle(dto, title) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Broadcast)
            throw new common_1.BadRequestException("it must be broadcast!");
        await this.roomMemberService.findByRoomIdAndUpdate(dto.roomId, {
            t: title,
            tEn: (0, remove_accents_1.remove)(title)
        });
        return "room has been renamed successfully";
    }
    async updateImage(dto, file) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Broadcast)
            throw new common_1.BadRequestException("it must be broadcast!");
        let keyImage = `v-public/${dto.myUser._id}/${enums_1.S3UploaderTypes.profileImage}-${(0, uuid_1.v4)()}.jpg`;
        let url = await this.s3.putImageCropped(file.buffer, keyImage);
        await this.roomMemberService.findByRoomIdAndUpdate(dto.roomId, {
            img: url
        });
        return url;
    }
    async getBroadcastMyInfo(dto) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Broadcast) {
            throw new common_1.BadRequestException("Room must be broadcast to continue " + rM.rT);
        }
        let count = await this.broadcastMember.getBroadcastMembersCount(dto.roomId);
        let broadcastSettings = await this.broadcastSetting.findByIdOrThrow(dto.roomId);
        return {
            totalUsers: count,
            broadcastSettings: broadcastSettings
        };
    }
    async getBroadcastMessageInfo(dto, x) {
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: x.getLimit(),
                page: x.getPage(),
                sort: "sAt dAt",
                select: "peerData sAt dAt createdAt",
                lean: true,
            },
        }).get();
        paginationParameters[0] = {
            pBId: dto.messageId,
        };
        if (dto.type == enums_1.MessageStatusType.Seen) {
            paginationParameters[0]['sAt'] = {
                $ne: null
            };
        }
        else {
            paginationParameters[0]['sAt'] = {
                $eq: null
            };
            paginationParameters[0]['dAt'] = {
                $ne: null
            };
        }
        let data = await this.messageService.paginated(paginationParameters);
        for (let d of data.docs) {
            d['userData'] = d['peerData'];
            delete d['peerData'];
        }
        return data;
    }
    async _createPeerRoom(dto, newRoomId, peerUser, session) {
        await this.singleRoomSetting.create({
            _id: newRoomId,
            cId: dto.myUser._id,
            pId: dto.peerId,
        }, session);
        await this.roomMemberService.createMany([
            {
                uId: dto.myUser._id,
                rId: newRoomId,
                lSMId: newRoomId,
                rT: enums_1.RoomType.Single,
                t: peerUser.fullName,
                img: peerUser.userImage,
                pId: dto.peerId,
                isD: true,
                tEn: peerUser.fullNameEn,
            },
            {
                uId: peerUser._id,
                rId: newRoomId,
                lSMId: newRoomId,
                rT: enums_1.RoomType.Single,
                t: dto.myUser.fullName,
                img: dto.myUser.userImage,
                pId: dto.myUser._id,
                isD: true,
                tEn: dto.myUser.fullNameEn,
            },
        ], session);
        await this.socketIoService.joinRoom({
            usersIds: [dto.peerId, dto.myUser._id.toString()],
            roomId: newRoomId,
        });
    }
    async getAvailableUsersToAdd(dto, roomId, myId) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(roomId, myId);
        if (rM.rT != enums_1.RoomType.Broadcast) {
            throw new common_1.BadRequestException("Room must be broadcast to continue " + rM.rT);
        }
        let outUsers = [];
        let myBans = await this.userBan.getMyBlockTheyAndMe(myId);
        outUsers.push(myId);
        outUsers.push(...myBans);
        let broadcastMembers = await this.broadcastMember.findAll({ bId: roomId }, "uId");
        outUsers.push(...broadcastMembers.map(value => value.uId.toString()));
        return this.userService.searchV2(dto, outUsers);
    }
};
BroadcastChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        room_member_service_1.RoomMemberService,
        single_room_settings_service_1.SingleRoomSettingsService,
        message_service_1.MessageService,
        user_service_1.UserService,
        file_uploader_service_1.FileUploaderService,
        config_1.ConfigService,
        socket_io_service_1.SocketIoService,
        room_middleware_service_1.RoomMiddlewareService,
        broadcast_settings_service_1.BroadcastSettingsService,
        broadcast_member_service_1.BroadcastMemberService,
        notification_emitter_channel_service_1.NotificationEmitterChannelService,
        app_config_service_1.AppConfigService,
        user_ban_service_1.UserBanService])
], BroadcastChannelService);
exports.BroadcastChannelService = BroadcastChannelService;
//# sourceMappingURL=broadcast.channel.service.js.map