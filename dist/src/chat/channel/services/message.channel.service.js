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
exports.MessageChannelService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const room_member_service_1 = require("../../room_member/room_member.service");
const message_service_1 = require("../../message/message.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const user_ban_service_1 = require("../../../api/user_modules/user_ban/user_ban.service");
const group_settings_service_1 = require("../../group_settings/group_settings.service");
const broadcast_settings_service_1 = require("../../broadcast_settings/broadcast_settings.service");
const group_member_service_1 = require("../../group_member/group_member.service");
const broadcast_member_service_1 = require("../../broadcast_member/broadcast_member.service");
const socket_io_service_1 = require("../../socket_io/socket_io.service");
const room_middleware_service_1 = require("../../room_middleware/room_middleware.service");
const file_uploader_service_1 = require("../../../common/file_uploader/file_uploader.service");
const utils_1 = require("../../../core/utils/utils");
const enums_1 = require("../../../core/utils/enums");
const group_message_status_service_1 = require("../../group_message_status/group_message_status.service");
const app_config_service_1 = require("../../../api/app_config/app_config.service");
const app_validator_1 = require("../../../core/utils/app.validator");
const create_s3_uploader_dto_1 = require("../../../common/file_uploader/create-s3_uploader.dto");
const chat_helper_1 = require("../chat.helper");
const image_size_1 = __importDefault(require("image-size"));
const notification_emitter_channel_service_1 = require("./notification_emitter_channel.service");
const crypto_1 = __importDefault(require("crypto"));
const objectIdRegExp = /[a-f\d]{24}/gi;
let MessageChannelService = class MessageChannelService {
    constructor(roomMemberService, messageService, userService, s3, config, socket, middlewareService, notificationService, appConfig, groupMember, broadcastMember, groupSetting, broadcastSetting, groupMessageStatusService, userBan) {
        this.roomMemberService = roomMemberService;
        this.messageService = messageService;
        this.userService = userService;
        this.s3 = s3;
        this.config = config;
        this.socket = socket;
        this.middlewareService = middlewareService;
        this.notificationService = notificationService;
        this.appConfig = appConfig;
        this.groupMember = groupMember;
        this.broadcastMember = broadcastMember;
        this.groupSetting = groupSetting;
        this.broadcastSetting = broadcastSetting;
        this.groupMessageStatusService = groupMessageStatusService;
        this.userBan = userBan;
    }
    async createMessage(dto, isSilent = false) {
        let rM = await this.middlewareService.isThereRoomMember(dto._roomId, dto.myUser._id, "rT t bId isOneSeen");
        dto.isOneSeen = rM.isOneSeen ?? false;
        if (!rM)
            throw new common_1.ForbiddenException('No room found ' + dto._roomId);
        let ban = await this.userBan.getBan(rM.uId, rM.pId);
        if (ban)
            throw new common_1.ForbiddenException('You dont have access ' + rM.rT);
        let isSingle = rM.rT == enums_1.RoomType.Single;
        let isOrder = rM.rT == enums_1.RoomType.Order;
        let isGroup = rM.rT == enums_1.RoomType.GroupChat;
        let isBroadcast = rM.rT == enums_1.RoomType.Broadcast;
        let isExits = await this.messageService.isMessageExist(dto.localId);
        if (isExits)
            throw new common_1.ForbiddenException('Message already in database ForbiddenException');
        if (dto.replyToLocalId) {
            let rToMsg = await this.messageService.getByLocalId(dto.replyToLocalId);
            if (!rToMsg)
                throw new common_1.ForbiddenException('dto.replyToId msg not exist in db ' + dto.replyToLocalId);
            dto._replyTo = JSON.stringify(rToMsg);
        }
        dto._messageAttachment = await this.getMessageAttachment(dto);
        if (dto.isText()) {
            dto.mentions = dto.content.match(objectIdRegExp) ?? [];
        }
        if (dto.forwardLocalId)
            dto = await this.getForwardMessageNewDto(dto);
        await this.middlewareService.unDeleteAllRoomMembers(dto._roomId);
        if (isSingle || isOrder) {
            let peer = await this.roomMemberService.findOne({
                rId: dto._roomId,
                rT: rM.rT,
                uId: { $ne: dto.myUser._id },
            });
            if (!peer)
                throw new common_1.BadRequestException('Cant find the peer user in the chat data is');
            let isThereBan = await this.userBan.getBan(dto.myUser._id, peer.uId);
            if (isThereBan)
                throw new common_1.ForbiddenException("You dont have access");
            let newMessage = await this.messageService.create(dto);
            this.socket.io
                .to(dto._roomId.toString())
                .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMessage));
            if (!isSilent)
                await this.notificationService.singleChatNotification(peer.uId, newMessage);
            return newMessage;
        }
        else if (isGroup) {
            let createdMessage = await this.messageService.create(dto);
            await this._createStatusForGroupChat(dto._roomId, createdMessage._id);
            this.socket.io
                .to(dto._roomId.toString())
                .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(createdMessage));
            if (!isSilent) {
                this.notificationService
                    .groupChatNotification(createdMessage, rM.t)
                    .then();
            }
            return createdMessage;
        }
        else if (isBroadcast) {
            let myMsg;
            let messages = await this.saveBroadcastMessages(dto);
            for (let msg of messages) {
                if (msg.rId == dto._roomId) {
                    myMsg = msg;
                }
                this.socket.io.to(msg.rId.toString()).emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(msg));
            }
            if (!isSilent) {
                this.notificationService.broadcastNotification(myMsg).then();
            }
            return myMsg;
        }
        throw new common_1.BadRequestException('Message type ' + dto.messageType + ' not supported ');
    }
    async deleteRoomMessage(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (dto.type == enums_1.DeleteMessageType.me) {
            await this.messageService.deleteMessageFromMe(dto.myUser._id, dto.messageId);
            let msg = await this.messageService.findOne({
                rId: dto.roomId,
                dF: { $ne: dto.myUser._id },
            });
            if (!msg) {
                await this.roomMemberService.findOneAndUpdate({
                    rId: dto.roomId,
                    uId: dto.myUser._id,
                }, { isD: true, });
            }
            return "Message has been deleted from you";
        }
        else {
            await this.messageService.isMeMessageSenderOrThrow(dto.myUser._id, dto.messageId);
            let [m] = await Promise.all([this.messageService.getByIdOrFail(dto.messageId)]);
            if (m.sId != dto.myUser._id) {
                throw new common_1.ForbiddenException('You dont have access to delete this message');
            }
            let x = await this.messageService.findByIdAndUpdate(dto.messageId, {
                dltAt: new Date(),
            });
            this.socket.io
                .to(x.rId.toString())
                .emit(enums_1.SocketEventsType.v1OnDeleteMessageFromAll, JSON.stringify(x));
            return "Message has been deleted from all";
        }
    }
    async getRoomMessages(myId, roomId, dto) {
        let isThere = await this.middlewareService.isThereRoomMember(roomId, myId);
        if (!isThere) {
            return {
                docs: []
            };
        }
        let res = await this.messageService.findAllMessagesAggregation((0, utils_1.newMongoObjId)(myId), (0, utils_1.newMongoObjId)(roomId), dto);
        return {
            docs: res
        };
    }
    sha256FromBuffer(buffer) {
        return crypto_1.default.createHash('sha256').update(buffer).digest('hex');
    }
    async getMessageAttachment(dto) {
        if (dto.isInfo()) {
            if (!dto._messageAttachment)
                throw new common_1.BadRequestException("for isInfo message we must include _messageAttachment");
            return dto._messageAttachment;
        }
        if (dto.isText() || dto.forwardLocalId) {
            return null;
        }
        if (dto.isCustom()) {
            return (0, app_validator_1.jsonDecoder)(dto.attachment);
        }
        let uploaderDto = new create_s3_uploader_dto_1.CreateS3UploaderDto();
        uploaderDto.myUser = dto.myUser;
        if (!dto.isLocation()) {
            uploaderDto.mediaBuffer = dto._mediaFile.buffer;
            uploaderDto.fileName = dto._mediaFile.originalname;
        }
        if (dto.isImage()) {
            let imgData = await this._getImageData(dto._mediaFile.buffer);
            let key = await this.s3.uploadChatMedia(uploaderDto);
            let blurHash = null;
            if (dto.attachment) {
                blurHash = (0, app_validator_1.jsonDecoder)(dto.attachment)['blurHash'];
            }
            return {
                url: key,
                fileSize: dto._mediaFile.size,
                width: imgData.width,
                height: imgData.height,
                blurHash: blurHash,
                orientation: imgData.orientation,
                mimeType: dto._mediaFile.mimetype,
                name: dto._mediaFile.originalname,
                fileHash: this.sha256FromBuffer(dto._mediaFile.buffer),
            };
        }
        if (dto.isFile()) {
            let key = await this.s3.uploadChatMedia(uploaderDto);
            return {
                url: key,
                fileSize: dto._mediaFile.size,
                mimeType: dto._mediaFile.mimetype,
                name: dto._mediaFile.originalname,
                fileHash: this.sha256FromBuffer(dto._mediaFile.buffer),
            };
        }
        if (dto.isVoice()) {
            let dCodedAtt = (0, app_validator_1.jsonDecoder)(dto.attachment);
            if (!dCodedAtt['duration'])
                throw new common_1.BadRequestException("Voice duration in milli second is required in attachment json");
            let duration = dCodedAtt['duration'];
            let key = await this.s3.uploadChatMedia(uploaderDto);
            return {
                url: key,
                duration: duration,
                fileSize: dto._mediaFile.size,
                mimeType: dto._mediaFile.mimetype,
                name: dto._mediaFile.originalname,
                fileHash: this.sha256FromBuffer(dto._mediaFile.buffer),
            };
        }
        if (dto.isVideo()) {
            let mediaKey = await this.s3.uploadChatMedia(uploaderDto);
            let thumbImageData = null;
            let dCodedAtt = (0, app_validator_1.jsonDecoder)(dto.attachment);
            if (dto._secondMediaFile) {
                let imgData = await this._getImageData(dto._secondMediaFile.buffer);
                uploaderDto.mediaBuffer = dto._secondMediaFile.buffer;
                thumbImageData = {};
                thumbImageData['mimeType'] = dto._secondMediaFile.mimetype;
                thumbImageData['url'] = await this.s3.uploadChatMedia(uploaderDto);
                thumbImageData['fileSize'] = dto._secondMediaFile.size;
                thumbImageData['orientation'] = imgData.orientation;
                thumbImageData['width'] = imgData.width;
                thumbImageData['blurHash'] = dCodedAtt['thumbImage']['blurHash'] ?? null;
                thumbImageData['height'] = imgData.height;
                thumbImageData['name'] = dto._secondMediaFile.originalname;
                thumbImageData['fileHash'] = this.sha256FromBuffer(dto._secondMediaFile.buffer);
            }
            return {
                url: mediaKey,
                duration: dCodedAtt['duration'] ?? null,
                thumbImage: thumbImageData,
                fileSize: dto._mediaFile.size,
                mimeType: dto._mediaFile.mimetype,
                name: dto._mediaFile.originalname,
                fileHash: this.sha256FromBuffer(dto._mediaFile.buffer),
            };
        }
        if (dto.isLocation()) {
            let att = (0, app_validator_1.jsonDecoder)(dto.attachment);
            if (!att['lat'])
                throw new common_1.BadRequestException("lat is required as String");
            if (!att['long'])
                throw new common_1.BadRequestException("long is required as String");
            if (!att['linkPreviewData'])
                throw new common_1.BadRequestException("linkPreviewData is required as {}");
            if (!att['linkPreviewData']['title'])
                throw new common_1.BadRequestException("linkPreviewData title is required as string");
            if (!att['linkPreviewData']['description'])
                throw new common_1.BadRequestException("linkPreviewData description is required as string");
            return att;
        }
        throw new common_1.BadRequestException(+dto.messageType + ' not supported');
    }
    async getForwardMessageNewDto(dto) {
        let fToMsg = await this.messageService.getByLocalId(dto.forwardLocalId);
        if (!fToMsg)
            throw new common_1.ForbiddenException("cant find the forwarded message id " + dto.forwardLocalId);
        dto._messageAttachment = fToMsg.msgAtt;
        dto.content = fToMsg.c;
        dto.messageType = fToMsg.mT;
        dto._replyTo = undefined;
        dto.replyToLocalId = undefined;
        return dto;
    }
    async saveBroadcastMessages(dto) {
        let broadcastId = dto._roomId;
        let broadcastUsers = await this.broadcastMember.findAll({
            bId: broadcastId
        }, 'rId uId userData');
        let messagesToCreate = [];
        for (let bUser of broadcastUsers) {
            let msgDto = (0, chat_helper_1.getMsgDtoObj)({
                _id: (0, utils_1.newMongoObjId)().toString(),
                mT: dto.messageType,
                att: dto._messageAttachment,
                rId: bUser.rId,
                peerData: bUser.userData,
                user: dto.myUser,
                content: dto.content
            });
            messagesToCreate.push(msgDto);
        }
        let parentBroadcastMsgId = (0, utils_1.newMongoObjId)();
        for (let m of messagesToCreate) {
            m._pBId = parentBroadcastMsgId.toString();
        }
        let myMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            _id: parentBroadcastMsgId.toString(),
            mT: dto.messageType,
            att: dto._messageAttachment,
            rId: broadcastId,
            user: dto.myUser,
            localId: dto.localId,
            content: dto.content,
        });
        messagesToCreate.push(myMsgDto);
        return await this.messageService.createMany(messagesToCreate);
    }
    async _getImageData(buffer) {
        let imgWidth = 1;
        let imgHeight = 1;
        let imgOrientation = 1;
        try {
            let imgData = (0, image_size_1.default)(buffer);
            imgWidth = imgData.width ?? 1;
            imgHeight = imgData.height ?? 1;
            imgOrientation = imgData.orientation ?? 1;
        }
        catch (err) {
        }
        return {
            width: imgWidth,
            height: imgHeight,
            orientation: imgOrientation
        };
    }
    async _createStatusForGroupChat(_roomId, mId) {
        let members = await this.groupMember.findAll({
            rId: _roomId,
        }, "uId");
        await this.groupMessageStatusService.createMany(members.map(value => {
            return {
                mId: mId,
                rId: _roomId,
                uId: value.uId
            };
        }));
    }
    async starRoomMessage(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        let msg = await this.messageService.findById(dto.messageId);
        if (!msg)
            throw new common_1.BadRequestException("message not exists!");
        if (msg.rId.toString() != dto.roomId)
            throw new common_1.BadRequestException("message not exists in this room!");
        await this.messageService.findByIdAndUpdate(dto.messageId, {
            $addToSet: { stars: (0, utils_1.newMongoObjId)(dto.myUser._id) }
        });
        return "Done";
    }
    async unStarRoomMessage(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        let msg = await this.messageService.findById(dto.messageId);
        if (!msg)
            throw new common_1.BadRequestException("message not exists!");
        if (msg.rId.toString() != dto.roomId)
            throw new common_1.BadRequestException("message not exists in this room!");
        await this.messageService.findByIdAndUpdate(dto.messageId, {
            $pull: { stars: (0, utils_1.newMongoObjId)(dto.myUser._id) }
        });
        return "Done";
    }
    async getMyAllStarMessages(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        let res = await this.messageService.findAll({
            rId: dto.roomId,
            dF: { $ne: (0, utils_1.newMongoObjId)(dto.myUser._id) },
            stars: (0, utils_1.newMongoObjId)(dto.myUser._id),
        }, { lean: true, limit: 150, sort: "-_id" });
        for (let i of res) {
            i['isStared'] = true;
        }
        return { docs: res };
    }
    async oneSeeThisMessage(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        let msg = await this.messageService.getByIdOrFail(dto.messageId);
        if (!msg.isOneSeen)
            throw new common_1.BadRequestException("Msg cant update is should be one seen true");
        if (msg.sId.toString() == dto.myUser._id.toString())
            return "You the sender";
        await this.messageService.findByIdAndUpdate(dto.messageId, {
            $addToSet: {
                oneSeenBy: dto.myUser._id
            }
        });
        return "Msg updated";
    }
};
MessageChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_member_service_1.RoomMemberService,
        message_service_1.MessageService,
        user_service_1.UserService,
        file_uploader_service_1.FileUploaderService,
        config_1.ConfigService,
        socket_io_service_1.SocketIoService,
        room_middleware_service_1.RoomMiddlewareService,
        notification_emitter_channel_service_1.NotificationEmitterChannelService,
        app_config_service_1.AppConfigService,
        group_member_service_1.GroupMemberService,
        broadcast_member_service_1.BroadcastMemberService,
        group_settings_service_1.GroupSettingsService,
        broadcast_settings_service_1.BroadcastSettingsService,
        group_message_status_service_1.GroupMessageStatusService,
        user_ban_service_1.UserBanService])
], MessageChannelService);
exports.MessageChannelService = MessageChannelService;
//# sourceMappingURL=message.channel.service.js.map