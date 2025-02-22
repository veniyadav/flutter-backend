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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user_modules/user/user.service");
const remove_accents_1 = require("remove-accents");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_device_service_1 = require("../user_modules/user_device/user_device.service");
const user_ban_service_1 = require("../user_modules/user_ban/user_ban.service");
const versions_service_1 = require("../versions/versions.service");
const file_uploader_service_1 = require("../../common/file_uploader/file_uploader.service");
const app_config_service_1 = require("../app_config/app_config.service");
const mongo_peer_id_dto_1 = require("../../core/common/dto/mongo.peer.id.dto");
const room_member_service_1 = require("../../chat/room_member/room_member.service");
const group_member_service_1 = require("../../chat/group_member/group_member.service");
const broadcast_member_service_1 = require("../../chat/broadcast_member/broadcast_member.service");
const user_version_service_1 = require("../user_modules/user_version/user_version.service");
const report_system_service_1 = require("../report_system/report_system.service");
const admin_notification_service_1 = require("../admin_notification/admin_notification.service");
const socket_io_service_1 = require("../../chat/socket_io/socket_io.service");
const auth_service_1 = require("../auth/auth.service");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const notification_emitter_service_1 = require("../../common/notification_emitter/notification_emitter.service");
const enums_1 = require("../../core/utils/enums");
const res_helpers_1 = require("../../core/utils/res.helpers");
const chat_request_service_1 = require("../../chat/chat_request/chat_request.service");
const channel_service_1 = require("../../chat/channel/services/channel.service");
const profile_notification_emitter_1 = require("./profile_notification_emitter");
let ProfileService = class ProfileService {
    constructor(userService, userDevice, authService, banServer, ioService, s3, notificationEmitterService, versionsService, appConfigService, reportSystemService, roomMemberService, groupMember, userVersion, broadcastMember, adminNotificationService, chatRequestService, channelService, profileNotificationEmitter) {
        this.userService = userService;
        this.userDevice = userDevice;
        this.authService = authService;
        this.banServer = banServer;
        this.ioService = ioService;
        this.s3 = s3;
        this.notificationEmitterService = notificationEmitterService;
        this.versionsService = versionsService;
        this.appConfigService = appConfigService;
        this.reportSystemService = reportSystemService;
        this.roomMemberService = roomMemberService;
        this.groupMember = groupMember;
        this.userVersion = userVersion;
        this.broadcastMember = broadcastMember;
        this.adminNotificationService = adminNotificationService;
        this.chatRequestService = chatRequestService;
        this.channelService = channelService;
        this.profileNotificationEmitter = profileNotificationEmitter;
    }
    async getMyProfile(user) {
        let res = {};
        res["me"] = await this.userService.findById(user._id, "-lastMail");
        res["currentDevice"] = await this.userDevice.findById(user.currentDevice._id, "platform language clintVersion");
        return res;
    }
    async getPeerProfile(dto) {
        let res = {};
        let user = await this.userService.findByIdOrThrow(dto.id, "userImage fullName email userPrivacy bio lastSeenAt createdAt hasBadge");
        let chatReq = await this.chatRequestService.findOne({
            $or: [
                { receiverId: dto.myUser._id },
                { senderId: dto.myUser._id },
            ],
            roomType: enums_1.RoomType.Single,
        });
        res = {
            ...user,
            ...await this.banServer.checkBans(new mongo_peer_id_dto_1.MongoPeerIdDto(dto.id, dto.myUser)),
            isOnline: await this.ioService.checkIfUserOnline(dto.id),
            chatReq: chatReq,
        };
        return res;
    }
    async updateMyName(dto) {
        await this.userService.findByIdAndUpdate(dto.myUser._id, {
            fullName: dto.fullName,
            fullNameEn: (0, remove_accents_1.remove)(dto.fullName)
        });
        await this.roomMemberService.updateMany({
            pId: dto.myUser._id
        }, {
            t: dto.fullName,
            tEn: (0, remove_accents_1.remove)(dto.fullName)
        });
        await this.groupMember.updateMany({ uId: dto.myUser._id }, {
            "userData.fullName": dto.fullName,
            "userData.fullNameEn": (0, remove_accents_1.remove)(dto.fullName)
        });
        await this.broadcastMember.updateMany({ uId: dto.myUser._id }, {
            "userData.fullName": dto.fullName,
            "userData.fullNameEn": (0, remove_accents_1.remove)(dto.fullName)
        });
        return dto.fullName;
    }
    async updateMyImage(file, myUser) {
        let res = await this.s3.putImageCropped(file.buffer, myUser._id);
        await this.userService.findByIdAndUpdate(myUser._id, {
            userImage: res
        });
        await this.roomMemberService.updateMany({
            pId: myUser._id
        }, {
            img: res
        });
        await this.groupMember.updateMany({ uId: myUser._id }, {
            "userData.userImages": res
        });
        await this.broadcastMember.updateMany({ uId: myUser._id }, {
            "userData.userImages": res
        });
        return res;
    }
    async deleteFcmFor(user) {
        await this.userDevice.findByIdAndUpdate(user.currentDevice._id, {
            pushKey: null
        });
        return "Fcm deleted";
    }
    async addPushKey(myUser, pushKey, voipKey) {
        const updateObject = {};
        if (pushKey) {
            updateObject.pushKey = pushKey;
        }
        if (voipKey) {
            updateObject.voipKey = voipKey;
        }
        await this.userDevice.findByIdAndUpdate(myUser.currentDevice._id, updateObject);
        return "PushKey added";
    }
    async updateLanguage(myUser, language) {
        await this.userDevice.findByIdAndUpdate(myUser.currentDevice._id, {
            language: language
        });
        return "Language has been updated";
    }
    async updatePassword(user, dto) {
        let foundedUser = await this.userService.findByIdOrThrow(dto.myUser._id, "+password");
        let bcryptRes = await bcrypt_1.default.compare(dto.oldPassword, foundedUser.password);
        if (!bcryptRes) {
            throw new common_1.BadRequestException("Invalid password credentials");
        }
        if (dto.logoutFromAll) {
            await this.userDevice.deleteMany({
                uId: dto.myUser._id,
                _id: { $ne: dto.myUser.currentDevice._id }
            });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        let hashed = bcrypt_1.default.hashSync(dto.newPassword, salt);
        await this.userService.findByIdAndUpdate(dto.myUser._id, {
            "password": hashed
        });
        return "Password changed successfully";
    }
    async updateFcm(user, pushKey) {
        let dId = user.currentDevice._id;
        await this.userDevice.findByIdAndUpdate(dId, {
            pushKey
        });
        return "updated!";
    }
    async getUsersAndSearch(dto, myUser) {
        let bans = await this.banServer.getMyBlockTheyAndMe(myUser._id);
        bans.push(myUser._id);
        return this.userService.searchV2(dto, bans);
    }
    async setVisit(user) {
        await this.userDevice.findByIdAndUpdate(user.currentDevice._id, {
            $inc: {
                visits: 1
            }
        });
        return "Done";
    }
    async getMyDevices(user) {
        return this.userDevice.findAll({
            uId: user._id
        });
    }
    async getAppConfig(user) {
        return this.appConfigService.getConfig();
    }
    async getUserLastSeenAt(dto) {
        let user = await this.userService.findByIdOrThrow(dto.peerId, "lastSeenAt userPrivacy");
        if (user.userPrivacy.lastSeen == false)
            return null;
        return user.lastSeenAt;
    }
    async deleteMyAccount(user, password) {
        await this.checkPassword(user, password);
        await this.userService.findByIdAndUpdate(user._id, {
            deletedAt: new Date()
        });
        try {
            let device = await this.userDevice.findById(user.currentDevice._id);
            if (device.platform == enums_1.Platform.Android) {
                this.notificationEmitterService.unSubscribeFcmTopic(device.pushKey ?? "--", enums_1.PushTopics.AdminAndroid).then(value => {
                });
            }
            if (device.platform == enums_1.Platform.Ios) {
                this.notificationEmitterService.unSubscribeFcmTopic(device.pushKey ?? "--", enums_1.PushTopics.AdminIos).then(value => {
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        return "account deleted !";
    }
    async checkVersion(dto) {
        return this.userVersion.checkVersion(dto);
    }
    async createReport(dto) {
        return this.reportSystemService.create({ ...dto, uId: dto.myUser._id });
    }
    async getAdminNotification(dto) {
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 20,
                page: 1,
                sort: "-_id",
                ...dto,
            },
        }).get();
        if (paginationParameters[1].page <= 0) {
            paginationParameters[1].page = 1;
        }
        if (paginationParameters[1].limit <= 0 || paginationParameters[1].limit >= 50) {
            paginationParameters[1].limit = 20;
        }
        return this.adminNotificationService.paginate(paginationParameters);
    }
    async updateMyBio(dto) {
        await this.userService.findByIdAndUpdate(dto.myUser._id, {
            bio: dto.bio
        });
        return dto.bio;
    }
    async updateMyPassword(dto) {
        let foundedUser = await this.userService.findById(dto.myUser._id, "+password userDevice lastMail banTo email registerStatus");
        await this.authService.comparePassword(dto.oldPassword, foundedUser.password);
        await this.userService.findByIdAndUpdate(dto.myUser._id, {
            password: dto.newPassword
        });
        if (dto.logoutAll) {
            let currentDeviceId = dto.myUser.currentDevice._id;
            await this.userDevice.deleteMany({
                _id: { $ne: currentDeviceId },
                uId: dto.myUser._id
            });
        }
        return "Done";
    }
    async deleteDevice(dto, password) {
        if (dto.myUser.currentDevice._id.toString() == dto.id)
            throw new common_1.BadRequestException("You cant delete your device");
        await this.checkPassword(dto.myUser, password);
        await this.userDevice.findByIdAndDelete(dto.id);
        return "Device deleted";
    }
    async getMyBlocked(user, dto) {
        return await this.banServer.getMyBlockMeOnly(user._id, dto);
    }
    async checkPassword(user, password) {
        if (!password)
            throw new common_1.BadRequestException("password is required");
        let foundedUser = await this.userService.findByIdOrThrow(user._id, "+password userDevice lastMail banTo email registerStatus deletedAt");
        await this.comparePassword(password, foundedUser.password);
        return true;
    }
    async comparePassword(dtoPassword, dbHasPassword) {
        let bcryptRes = await bcrypt_1.default.compare(dtoPassword, dbHasPassword);
        if (!bcryptRes) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.invalidLoginDataString);
        }
        return true;
    }
    async updateMyPrivacy(dto) {
        await this.userService.findByIdAndUpdate(dto.myUser._id, {
            userPrivacy: dto,
        });
        return this.userService.findByIdOrThrow(dto.myUser._id);
    }
    async sendChatRequest(dto) {
        if (dto.id == dto.myUser._id)
            throw new common_1.BadRequestException("You can not send request to your self");
        let oldChatReq = await this.chatRequestService.findOne({
            $or: [
                { receiverId: dto.myUser._id },
                { senderId: dto.myUser._id },
            ],
            roomType: enums_1.RoomType.Single,
        });
        if (oldChatReq && oldChatReq.status != enums_1.ChatRequestStatus.Canceled)
            throw new common_1.BadRequestException("Old request already " + oldChatReq.roomType + " " + oldChatReq.status);
        let room = await this.channelService.getOrCreatePeerRoom({
            myUser: dto.myUser,
            peerId: dto.id
        });
        if (!oldChatReq) {
            await this.chatRequestService.create({
                senderId: dto.myUser._id,
                receiverId: dto.id,
                status: enums_1.ChatRequestStatus.Pending,
                roomType: enums_1.RoomType.Single,
                roomId: room.rId
            });
            await this.profileNotificationEmitter.notify(dto.id, dto.myUser);
        }
        else {
            await this.chatRequestService.findByIdAndUpdate(oldChatReq._id, {
                status: enums_1.ChatRequestStatus.Pending,
            });
        }
        return "Request has been send";
    }
    async updateChatRequest(dto, status) {
        let chatReq = await this.chatRequestService.findByIdOrThrow(dto.id);
        if (chatReq.senderId.toString() != dto.myUser._id && chatReq.receiverId.toString() != dto.myUser._id)
            throw new common_1.BadRequestException("You dont have access");
        if (dto.myUser._id.toString() == chatReq.senderId.toString()) {
            if (status.status == enums_1.ChatRequestStatus.Refused)
                throw new common_1.BadRequestException("As sender you can not Refused");
            if (status.status == enums_1.ChatRequestStatus.Pending)
                throw new common_1.BadRequestException("As sender you can not Pending");
            if (status.status == enums_1.ChatRequestStatus.Accepted)
                throw new common_1.BadRequestException("As sender you can not Accepted");
        }
        if (dto.myUser._id.toString() == chatReq.receiverId.toString()) {
            if (status.status == enums_1.ChatRequestStatus.Canceled)
                throw new common_1.BadRequestException("As receiver you can not Canceled");
            if (status.status == enums_1.ChatRequestStatus.Pending)
                throw new common_1.BadRequestException("As receiver you can not Pending");
        }
        await this.chatRequestService.findByIdAndUpdate(dto.id, {
            status: status.status
        });
        return "Status has been updated";
    }
    async getMyChatRequest(user, dto) {
        let filter = {
            receiverId: user._id,
            status: { $eq: enums_1.ChatRequestStatus.Pending }
        };
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 30,
                sort: "-_id",
                ...dto
            }
        }).get();
        paginationParameters[0] = filter;
        return this.chatRequestService.paginate(paginationParameters);
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_device_service_1.UserDeviceService,
        auth_service_1.AuthService,
        user_ban_service_1.UserBanService,
        socket_io_service_1.SocketIoService,
        file_uploader_service_1.FileUploaderService,
        notification_emitter_service_1.NotificationEmitterService,
        versions_service_1.VersionsService,
        app_config_service_1.AppConfigService,
        report_system_service_1.ReportSystemService,
        room_member_service_1.RoomMemberService,
        group_member_service_1.GroupMemberService,
        user_version_service_1.UserVersionService,
        broadcast_member_service_1.BroadcastMemberService,
        admin_notification_service_1.AdminNotificationService,
        chat_request_service_1.ChatRequestService,
        channel_service_1.ChannelService,
        profile_notification_emitter_1.ProfileNotificationEmitter])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map