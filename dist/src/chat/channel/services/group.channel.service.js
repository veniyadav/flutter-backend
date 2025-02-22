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
exports.GroupChannelService = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
const update_role_dto_1 = require("../dto/update.role.dto");
const chat_helper_1 = require("../chat.helper");
const socket_io_service_1 = require("../../socket_io/socket_io.service");
const remove_accents_1 = require("remove-accents");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const room_member_service_1 = require("../../room_member/room_member.service");
const message_service_1 = require("../../message/message.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const user_ban_service_1 = require("../../../api/user_modules/user_ban/user_ban.service");
const group_settings_service_1 = require("../../group_settings/group_settings.service");
const group_member_service_1 = require("../../group_member/group_member.service");
const room_middleware_service_1 = require("../../room_middleware/room_middleware.service");
const file_uploader_service_1 = require("../../../common/file_uploader/file_uploader.service");
const utils_1 = require("../../../core/utils/utils");
const enums_1 = require("../../../core/utils/enums");
const group_message_status_service_1 = require("../../group_message_status/group_message_status.service");
const message_channel_service_1 = require("./message.channel.service");
const app_config_service_1 = require("../../../api/app_config/app_config.service");
const notification_emitter_channel_service_1 = require("./notification_emitter_channel.service");
let GroupChannelService = class GroupChannelService {
    constructor(channelService, roomMemberService, groupMessageStatusService, messageService, messageChannelService, userService, s3, config, socketIoService, middlewareService, notificationService, appConfig, groupMember, groupSetting, userBan) {
        this.channelService = channelService;
        this.roomMemberService = roomMemberService;
        this.groupMessageStatusService = groupMessageStatusService;
        this.messageService = messageService;
        this.messageChannelService = messageChannelService;
        this.userService = userService;
        this.s3 = s3;
        this.config = config;
        this.socketIoService = socketIoService;
        this.middlewareService = middlewareService;
        this.notificationService = notificationService;
        this.appConfig = appConfig;
        this.groupMember = groupMember;
        this.groupSetting = groupSetting;
        this.userBan = userBan;
    }
    async createGroupChat(dto, session) {
        let config = await this.appConfig.getConfig();
        let maxGroupCount = config.maxGroupMembers;
        if (dto.peerIds.includes(dto.myUser._id))
            throw new common_1.BadRequestException('My id should not included');
        if (dto.peerIds.length + 1 > maxGroupCount)
            throw new common_1.BadRequestException(`Max group count is ${maxGroupCount}`);
        dto.imgUrl = config.groupIcon;
        if (dto.imageBuffer) {
            dto.imgUrl = await this.s3.putImageCropped(dto.imageBuffer, dto.myUser._id);
            dto.imageBuffer = undefined;
        }
        dto.peerIds.push(dto.myUser._id);
        let groupId = (0, utils_1.newMongoObjId)().toString();
        let users = await this.userService.findByIds(dto.peerIds, "fullName fullNameEn userImage");
        let roomMembers = [];
        let groupMembers = [];
        let messages = [];
        let createGroupMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            _id: (0, utils_1.newMongoObjId)().toString(),
            user: dto.myUser,
            rId: groupId,
            att: {
                adminName: dto.myUser.fullName,
                targetName: dto.groupName,
                targetId: groupId,
                action: enums_1.MessageInfoType.CreateGroup
            },
            content: dto.myUser.fullName + ' Create group chat with you ' + config.roomIcons.group
        });
        for (let user of users) {
            let ban = await this.userBan.getBan(dto.myUser._id, user._id);
            if (ban)
                continue;
            let sendMsgDto = (0, chat_helper_1.getMsgDtoObj)({
                mT: enums_1.MessageType.Info,
                user: dto.myUser,
                rId: groupId,
                att: {
                    adminName: dto.myUser.fullName,
                    targetName: user.fullName,
                    targetId: user._id,
                    action: enums_1.MessageInfoType.AddGroupMember
                },
                content: user.fullName + ' Added by ' + dto.myUser.fullName,
            });
            roomMembers.push({
                uId: user._id,
                rId: groupId,
                lSMId: groupId,
                isOneSeen: false,
                rT: enums_1.RoomType.GroupChat,
                t: dto.groupName,
                tEn: (0, remove_accents_1.remove)(dto.groupName),
                img: dto.imgUrl,
            });
            groupMembers.push({
                uId: user._id,
                rId: groupId,
                userData: {
                    _id: user._id,
                    userImage: user.userImage,
                    fullName: user.fullName,
                    fullNameEn: user.fullNameEn,
                },
                gR: user._id.toString() == dto.myUser._id
                    ? enums_1.GroupRoleType.SuperAdmin
                    : enums_1.GroupRoleType.Member,
            });
            if (user._id.toString() != dto.myUser._id) {
                messages.push(sendMsgDto);
            }
        }
        let admin = await this.userService.findOneByEmail("admin@admin.com");
        if (admin) {
            roomMembers.push({
                uId: admin._id,
                rId: groupId,
                lSMId: groupId,
                isOneSeen: false,
                rT: enums_1.RoomType.GroupChat,
                t: dto.groupName,
                tEn: (0, remove_accents_1.remove)(dto.groupName),
                img: dto.imgUrl,
            });
        }
        else {
            console.log("No admin@admin.com found to be added in the group");
        }
        await this.roomMemberService.createMany(roomMembers, session);
        await this.groupMember.createMany(groupMembers, session);
        await this.groupSetting.create({
            _id: groupId,
            cId: dto.myUser._id,
            gImg: dto.imgUrl,
            gName: dto.groupName,
            desc: dto.groupDescription,
            extraData: dto.extraData,
        }, session);
        await this.socketIoService.joinRoom({
            roomId: groupId.toString(),
            usersIds: dto.peerIds,
        });
        let msg = await this.messageService.create(createGroupMsgDto, session);
        await this.messageService.createMany(messages);
        this.socketIoService.io
            .to(groupId.toString())
            .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(msg));
        this.notificationService.groupChatNotification(msg, dto.groupName).then();
        return this.channelService._getOneFullRoomModel({
            roomId: groupId,
            userId: dto.myUser._id
        });
    }
    async addMembersToGroup(gId, dto) {
        let rM = await this.checkGroupAdminMember(gId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.GroupChat)
            throw new common_1.BadRequestException("it must be GroupChat!");
        if (dto.ids.includes(dto.myUser._id.toString()))
            throw new common_1.BadRequestException('My id should not included');
        let added = 0;
        for (let id of dto.ids) {
            let peerUser = await this.userService.findByIdOrThrow(id, "fullName fullNameEn userImage");
            let ban = await this.userBan.getBan(dto.myUser._id, id);
            if (ban)
                continue;
            let iGroupMember = await this.groupMember.findOne({ rId: gId, uId: id });
            if (iGroupMember)
                continue;
            ++added;
            await this.groupMember.create({
                uId: peerUser._id,
                rId: gId,
                userData: {
                    _id: peerUser._id,
                    userImage: peerUser.userImage,
                    fullName: peerUser.fullName,
                    fullNameEn: peerUser.fullNameEn,
                },
                gR: enums_1.GroupRoleType.Member,
            });
            await this.roomMemberService.create({
                uId: peerUser._id,
                rId: gId,
                lSMId: (0, utils_1.newMongoObjId)().toString(),
                rT: enums_1.RoomType.GroupChat,
                t: rM.t,
                tEn: rM.tEn,
                isOneSeen: false,
                img: rM.img,
            });
            await this.socketIoService.joinRoom({ roomId: gId, usersIds: [id] });
            let msgDto = (0, chat_helper_1.getMsgDtoObj)({
                mT: enums_1.MessageType.Info,
                user: dto.myUser,
                rId: gId,
                att: {
                    adminName: dto.myUser.fullName,
                    targetId: peerUser._id,
                    targetName: peerUser.fullName,
                    action: enums_1.MessageInfoType.AddGroupMember
                },
                content: peerUser.fullName + " Added BY " + dto.myUser.fullName,
            });
            this.messageChannelService.createMessage(msgDto, true).then();
        }
        await this.groupSetting.findByIdAndUpdate(gId, {
            $pullAll: {
                outUsers: dto.ids,
            },
        });
        return "Users successfully added to the group " + added;
    }
    async checkGroupAdminMember(gId, myId) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(gId, myId);
        if (rM.rT != enums_1.RoomType.GroupChat)
            throw new common_1.BadRequestException('you must perform this action on groups');
        let gM = await this.groupMember.findOne({
            rId: gId,
            uId: myId
        });
        if (!gM)
            throw new common_1.BadRequestException("IGroupMember not exist for addMembersToGroup " + `group id ${gId}, user id ${myId}`);
        if (gM.gR == enums_1.GroupRoleType.Member)
            throw new common_1.BadRequestException("You must be admin to perform");
        return rM;
    }
    async changeGroupUserRole(dto) {
        await this.checkGroupAdminMember(dto.roomId, dto.myUser._id);
        let peerGM = await this.groupMember.findOne({ rId: dto.roomId, uId: dto.peerId });
        if (dto.myUser._id == dto.peerId)
            throw new common_1.BadRequestException("You cant change your role!");
        if (!peerGM)
            throw new common_1.BadRequestException("Room member for peer user not exist in the group!");
        if (peerGM.gR == enums_1.GroupRoleType.SuperAdmin)
            throw new common_1.BadRequestException("You cant play with the group creator");
        await this._changeUserRoleTo(dto, peerGM, dto.role);
        return "success";
    }
    async kickGroupMember(dto) {
        await this.checkGroupAdminMember(dto.roomId, dto.myUser._id);
        let peerGM = await this.groupMember.findOne({
            rId: dto.roomId,
            uId: dto.peerId
        });
        if (dto.myUser._id == dto.peerId) {
            throw new common_1.BadRequestException("You cant kick your self!");
        }
        if (!peerGM) {
            throw new common_1.BadRequestException("Room member for peer user not exist in the group!");
        }
        await this.socketIoService.kickGroupMember(dto.roomId.toString(), dto.peerId.toString());
        await this.groupMember.deleteOne({
            rId: dto.roomId,
            uId: dto.peerId
        });
        await this.roomMemberService.findOneAndDelete({
            rId: dto.roomId,
            uId: dto.peerId
        });
        await this.socketIoService.leaveRoom(dto.roomId.toString(), dto.peerId.toString());
        let msgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            user: dto.myUser,
            rId: dto.roomId,
            att: {
                adminName: dto.myUser.fullName,
                targetName: peerGM.userData.fullName,
                targetId: peerGM.uId,
                action: enums_1.MessageInfoType.Kick
            },
            content: dto.myUser.fullName + " Kick " + peerGM.userData.fullName,
        });
        await this.messageChannelService.createMessage(msgDto, true).then();
        await this.groupSetting.findByIdAndUpdate(dto.roomId, {
            $addToSet: {
                outUsers: dto.peerId
            },
        });
        return "Successfully Kicked the user";
    }
    async getGroupMembers(myUser, dto, roomId) {
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
            rId: roomId,
            ...dto.getFilter("userData.fullNameEn")
        };
        return this.groupMember.paginate(paginationParameters);
    }
    async leaveGroupChat(dto) {
        let rM = await this.middlewareService.isThereRoomMember(dto.roomId, dto.myUser._id);
        if (rM == null) {
            return "You already left!";
        }
        let myGroupMember = await this.groupMember.findOne({
            rId: dto.roomId,
            uId: dto.myUser._id
        });
        let membersCount = await this.groupMember.getMembersCount(dto.roomId);
        await this.socketIoService.leaveRoom(dto.roomId, dto.myUser._id);
        if (membersCount == 1) {
            await this.roomMemberService.deleteMany({
                rId: dto.roomId
            });
            await this.groupMember.deleteMany({
                rId: dto.roomId
            });
            await this.groupSetting.findByRoomIdAndDelete(dto.roomId);
            return "Group has been deleted";
        }
        if (myGroupMember.gR == enums_1.GroupRoleType.SuperAdmin) {
            let nextSuperAdmin = await this.groupMember.findOne({
                $and: [
                    { rId: dto.roomId },
                    { uId: { $ne: dto.myUser._id } }
                ],
            }, null);
            let cDto = new update_role_dto_1.UpdateRoleDto();
            cDto.myUser = dto.myUser;
            cDto.role = enums_1.GroupRoleType.SuperAdmin;
            cDto.roomId = dto.roomId;
            cDto.peerId = nextSuperAdmin.uId;
            await this._changeUserRoleTo(cDto, nextSuperAdmin, enums_1.GroupRoleType.SuperAdmin);
        }
        let msgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            user: dto.myUser,
            rId: dto.roomId,
            att: {
                adminName: dto.myUser.fullName,
                targetName: dto.myUser.fullName,
                targetId: dto.myUser._id,
                action: enums_1.MessageInfoType.Leave
            },
            content: dto.myUser.fullName + " Left the group "
        });
        this.messageChannelService.createMessage(msgDto, true).then();
        await this.groupMember.deleteOne({
            rId: dto.roomId,
            uId: dto.myUser._id
        });
        await this.roomMemberService.findOneAndDelete({
            rId: dto.roomId,
            uId: dto.myUser._id
        });
        await this.groupSetting.findByIdAndUpdate(dto.roomId, {
            $addToSet: {
                outUsers: dto.myUser._id,
            },
        });
        return "left successfully";
    }
    async updateTitle(dto, title) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.GroupChat)
            throw new common_1.BadRequestException("it must be group!");
        await this.roomMemberService.findByRoomIdAndUpdate(dto.roomId, {
            t: title,
            tEn: (0, remove_accents_1.remove)(title)
        });
        let msgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            user: dto.myUser,
            rId: dto.roomId,
            att: {
                adminName: dto.myUser.fullName,
                targetName: title,
                targetId: dto.myUser._id,
                action: enums_1.MessageInfoType.UpdateTitle
            },
            content: "Title updated to " + title + " BY " + dto.myUser.fullName
        });
        this.messageChannelService.createMessage(msgDto, true).then();
        await this.groupSetting.findByIdAndUpdate(dto.roomId, {
            gName: title
        });
        return "Room has been renamed successfully";
    }
    async updateImage(dto, file) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.GroupChat)
            throw new common_1.BadRequestException("it must be group!");
        let keyImage = `${enums_1.S3UploaderTypes.profileImage}-${(0, uuid_1.v4)()}.jpg`;
        let url = await this.s3.putImageCropped(file.buffer, keyImage);
        await this.roomMemberService.findByRoomIdAndUpdate(dto.roomId, { img: url });
        let msgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            user: dto.myUser,
            rId: dto.roomId,
            att: {
                adminName: dto.myUser.fullName,
                targetName: url,
                targetId: dto.myUser._id,
                action: enums_1.MessageInfoType.UpdateImage
            },
            content: "Photo updated BY " + dto.myUser.fullName,
        });
        this.messageChannelService.createMessage(msgDto, true).then();
        await this.groupSetting.findByIdAndUpdate(dto.roomId, {
            gImg: url
        });
        return url;
    }
    async getMyGroupInfo(dto) {
        let roomMember = await this.middlewareService.isThereRoomMember(dto.roomId, dto.myUser._id);
        if (roomMember == null) {
            return {
                isMeOut: true,
                membersCount: 0,
                myRole: enums_1.GroupRoleType.Member,
                groupSettings: null,
                totalOnline: 0
            };
        }
        let settings = await this.groupSetting.findByIdOrThrow(dto.roomId, "+outUsers");
        if (!settings)
            throw new common_1.NotFoundException("get Group Settings with id" + dto.roomId + " not exist");
        let groupMembersCount = await this.groupMember.getMembersCount(dto.roomId);
        let myRole = enums_1.GroupRoleType.Member;
        let groupMember = await this.groupMember.findOne({
            rId: dto.roomId,
            uId: dto.myUser._id,
        });
        if (groupMember) {
            myRole = groupMember.gR;
        }
        let groupSettings = await this.groupSetting.findByIdOrThrow(dto.roomId);
        return {
            isMeOut: false,
            membersCount: groupMembersCount,
            myRole: myRole,
            groupSettings: groupSettings,
            totalOnline: await this.socketIoService.getOnlineRoomId(dto.roomId)
        };
    }
    async getMyGroupStatus(dto) {
        let roomMember = await this.middlewareService.isThereRoomMember(dto.roomId, dto.myUser._id);
        return {
            isMeOut: roomMember == null,
        };
    }
    async updateGroupExtraData(dto, data) {
        if (Object.keys(data).length == 0)
            throw new common_1.BadRequestException("object data in body  is required and not be empty");
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.groupSetting.findByIdAndUpdate(dto.roomId, {
            extraData: data
        });
        return "success";
    }
    async getGroupMessageInfo(dto, x) {
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: x.getLimit(),
                page: x.getPage(),
                sort: "sAt dAt",
                select: "-mId -rId -_id",
                populate: {
                    path: 'uId',
                    select: "fullName fullNameEn userImage",
                },
                lean: true,
            },
        }).get();
        paginationParameters[0] = {
            rId: dto.roomId,
            mId: dto.messageId,
            uId: { $ne: dto.myUser._id }
        };
        if (dto.type == enums_1.MessageStatusType.Seen) {
            paginationParameters[0]['sAt'] = {
                $ne: null
            };
            paginationParameters[0]['dAt'] = {
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
        let data = await this.groupMessageStatusService.paginate(paginationParameters);
        for (let d of data.docs) {
            d['userData'] = d['uId'];
            delete d['uId'];
        }
        return data;
    }
    async updateDescription(dto, description) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.GroupChat)
            throw new common_1.BadRequestException("it must be group!");
        await this.groupSetting.findByIdAndUpdate(dto.roomId, {
            desc: description
        });
        return "Description updated successfully";
    }
    async _changeUserRoleTo(dto, peerGM, role) {
        let text = peerGM.userData.fullName;
        if (role == enums_1.GroupRoleType.Member) {
            text = text + " down to member by ";
        }
        else {
            text = text + " promoted to admin by ";
        }
        text = text + dto.myUser.fullName;
        let msgDto = (0, chat_helper_1.getMsgDtoObj)({
            mT: enums_1.MessageType.Info,
            user: dto.myUser,
            rId: peerGM.rId,
            att: {
                adminName: dto.myUser.fullName,
                targetName: peerGM.userData.fullName,
                targetId: peerGM.uId,
                action: role == enums_1.GroupRoleType.Member ? enums_1.MessageInfoType.DownMember : enums_1.MessageInfoType.UpAdmin
            },
            content: text,
        });
        await this.groupMember.findOneAndUpdate({ _id: peerGM._id }, {
            gR: role,
        });
        if (dto.role != peerGM.gR) {
            await this.messageChannelService.createMessage(msgDto, true);
        }
        return text;
    }
    async getAvailableUsersToAdd(dto, roomId, myId) {
        await this.checkGroupAdminMember(roomId, myId);
        let outUsers = [];
        let myBans = await this.userBan.getMyBlockTheyAndMe(myId);
        outUsers.push(myId);
        outUsers.push(...myBans);
        let groupMembers = await this.groupMember.findAll({ rId: roomId }, "uId");
        outUsers.push(...groupMembers.map(value => value.uId.toString()));
        return this.userService.searchV2(dto, outUsers);
    }
};
GroupChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [channel_service_1.ChannelService,
        room_member_service_1.RoomMemberService,
        group_message_status_service_1.GroupMessageStatusService,
        message_service_1.MessageService,
        message_channel_service_1.MessageChannelService,
        user_service_1.UserService,
        file_uploader_service_1.FileUploaderService,
        config_1.ConfigService,
        socket_io_service_1.SocketIoService,
        room_middleware_service_1.RoomMiddlewareService,
        notification_emitter_channel_service_1.NotificationEmitterChannelService,
        app_config_service_1.AppConfigService,
        group_member_service_1.GroupMemberService,
        group_settings_service_1.GroupSettingsService,
        user_ban_service_1.UserBanService])
], GroupChannelService);
exports.GroupChannelService = GroupChannelService;
//# sourceMappingURL=group.channel.service.js.map