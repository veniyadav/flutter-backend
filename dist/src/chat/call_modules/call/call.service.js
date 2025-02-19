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
exports.CallService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../../core/utils/enums");
const room_middleware_service_1 = require("../../room_middleware/room_middleware.service");
const schedule_1 = require("@nestjs/schedule");
const call_member_service_1 = require("../call_member/call_member.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const socket_io_service_1 = require("../../socket_io/socket_io.service");
const user_ban_service_1 = require("../../../api/user_modules/user_ban/user_ban.service");
const message_service_1 = require("../../message/message.service");
const utils_1 = require("../../../core/utils/utils");
const chat_helper_1 = require("../../channel/chat.helper");
const app_config_service_1 = require("../../../api/app_config/app_config.service");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const call_emitter_1 = require("./call_emitter");
const agora_service_1 = require("../../agora/agora.service");
const call_history_service_1 = require("../call_history/call_history.service");
const room_member_service_1 = require("../../room_member/room_member.service");
const group_member_service_1 = require("../../group_member/group_member.service");
const user_global_call_status_model_1 = require("../utils/user-global-call-status.model");
let CallService = class CallService {
    constructor(userService, callHistory, socket, userBanService, callMemberService, middlewareService, schedulerRegistry, messageService, groupMemberService, appConfigService, ioService, notificationService, roomMember, agoraService) {
        this.userService = userService;
        this.callHistory = callHistory;
        this.socket = socket;
        this.userBanService = userBanService;
        this.callMemberService = callMemberService;
        this.middlewareService = middlewareService;
        this.schedulerRegistry = schedulerRegistry;
        this.messageService = messageService;
        this.groupMemberService = groupMemberService;
        this.appConfigService = appConfigService;
        this.ioService = ioService;
        this.notificationService = notificationService;
        this.roomMember = roomMember;
        this.agoraService = agoraService;
    }
    async createCall(dto) {
        const [appConfig, roomMember] = await Promise.all([
            this.appConfigService.getConfig(),
            this.isThereRoomMemberAndNotBanedOrThrow(dto.roomId, dto.myUser._id),
        ]);
        if (!appConfig.allowCall) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.callNotAllowedString);
        }
        let activeRing = await this.userService.findById(dto.myUser._id, "userGlobalCallStatus");
        if (activeRing.userGlobalCallStatus) {
            if (activeRing.userGlobalCallStatus.callId) {
                return { callId: activeRing.userGlobalCallStatus.callId };
            }
        }
        if (roomMember.rT == enums_1.RoomType.GroupChat) {
            let callId = await this.createGroupCallNotify(dto, roomMember);
            return { callId };
        }
        if (roomMember.rT !== enums_1.RoomType.Single) {
            throw new common_1.NotFoundException('This is not a Direct room!');
        }
        let peerUser = await this.userService.findByIdOrThrow(roomMember.pId, "userGlobalCallStatus");
        if (peerUser.userGlobalCallStatus && peerUser.userGlobalCallStatus.roomId) {
            if (dto.roomId != peerUser.userGlobalCallStatus.roomId.toString()) {
                throw new common_1.BadRequestException(res_helpers_1.i18nApi.peerUserInCallNowString);
            }
        }
        let callId = await this.ringForSingle(dto, peerUser._id);
        let caller = new user_global_call_status_model_1.UserGlobalCallStatus(true, callId, dto.myUser._id, dto.roomId, new Date());
        let callee = new user_global_call_status_model_1.UserGlobalCallStatus(false, callId, dto.myUser._id, dto.roomId, new Date());
        await this.updateCallStatusForUser(dto.myUser._id, caller);
        await this.updateCallStatusForUser(peerUser._id, callee);
        await this.registerMissedCall(dto, callId, peerUser._id, appConfig.callTimeout);
        return { callId };
    }
    async registerMissedCall(dto, callId, peerId, callTimeout) {
        const missedCallMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            rId: dto.roomId,
            mT: enums_1.MessageType.Call,
            att: {
                callStatus: enums_1.CallStatus.Timeout,
                startAt: new Date(),
                withVideo: dto.withVideo,
                endAt: null,
            },
            content: `📞 Missed Call from ${dto.myUser.fullName}`,
            user: dto.myUser,
        });
        this.schedulerRegistry.addTimeout(`${callId}_call`, setTimeout(() => this._timeoutRing(peerId, callId, missedCallMsgDto), callTimeout));
    }
    async ringForSingle(dto, peerId) {
        let call = await this.callHistory.create({
            caller: dto.myUser._id,
            callee: peerId,
            withVideo: dto.withVideo,
            meetPlatform: dto.meetPlatform,
            roomId: dto.roomId,
            callStatus: enums_1.CallStatus.Ring,
            participants: [
                dto.myUser._id,
                peerId
            ],
            roomType: enums_1.RoomType.Single,
        });
        await this.callMemberService.create({
            callId: call._id,
            userId: dto.myUser._id,
            roomId: dto.roomId,
            userDeviceId: dto.myUser.currentDevice._id,
        });
        await this.notificationService.singleRingNotify(peerId, {
            roomType: enums_1.RoomType.Single,
            callId: call._id,
            roomId: dto.roomId,
            callerId: call.caller,
            withVideo: dto.withVideo,
            groupName: null,
            userName: dto.myUser.fullName,
            userImage: dto.myUser.userImage,
            callStatus: enums_1.CallStatus.Ring,
        });
        return call._id;
    }
    async getRingCall(userId) {
        const call = await this.callHistory.findOne({
            participants: userId,
            caller: { $ne: userId },
            callStatus: { $eq: enums_1.CallStatus.Ring },
        });
        if (!call)
            return null;
        let peerRoomMember = await this.roomMember.findOne({
            rId: call.roomId,
            uId: call.caller,
        });
        if (call.roomType == enums_1.RoomType.GroupChat) {
            return {
                call,
                roomMember: peerRoomMember,
            };
        }
        return {
            call,
            roomMember: peerRoomMember,
        };
    }
    async cancelCall(dto, call) {
        await this.callHistory.findByIdAndUpdate(call._id, {
            callStatus: enums_1.CallStatus.Canceled,
        });
        let isGroup = call.roomType == enums_1.RoomType.GroupChat;
        if (isGroup) {
            await this.notificationService.groupRingNotify({
                roomType: call.roomType,
                roomId: call.roomId,
                callId: call._id,
                callerId: call.caller,
                withVideo: call.withVideo,
                groupName: "CANCEL CALL",
                userName: dto.myUser.fullName,
                userImage: dto.myUser.userImage,
                callStatus: enums_1.CallStatus.Canceled,
            });
        }
        else {
            await this.notificationService.singleRingNotify(call.callee, {
                roomType: call.roomType,
                roomId: call.roomId,
                callId: call._id,
                callerId: call.caller,
                withVideo: call.withVideo,
                groupName: null,
                userName: dto.myUser.fullName,
                userImage: dto.myUser.userImage,
                callStatus: enums_1.CallStatus.Canceled,
            });
        }
        return 'Call canceled';
    }
    async endCallForSingle(dto, call) {
        const current = new Date();
        await Promise.all([
            this.callHistory.findByIdAndUpdate(dto.callId, {
                callStatus: enums_1.CallStatus.Finished,
                endAt: current,
            }),
            this.socket.io.to(call.roomId.toString()).emit(enums_1.SocketEventsType.v1OnCallEnded, JSON.stringify({
                callId: dto.callId,
                roomId: call.roomId,
            })),
        ]);
        const finishedMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            rId: call.roomId,
            mT: enums_1.MessageType.Call,
            att: {
                callStatus: enums_1.CallStatus.Finished,
                withVideo: call.withVideo,
                endAt: current,
                startAt: call.createdAt,
            },
            content: `📞`,
            user: dto.myUser,
        });
        const newMessage = await this.messageService.create(finishedMsgDto);
        this.socket.io
            .to(call.roomId.toString())
            .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMessage));
        return 'Call ended';
    }
    async acceptCall(dto) {
        const call = await this.callHistory.findOne({ _id: dto.callId, participants: dto.myUser._id });
        if (!call)
            throw new common_1.BadRequestException('You dont have any call to acceptCall you are not participating in ' + call);
        let ifCanAccept = call.callStatus !== enums_1.CallStatus.Ring || call.callStatus !== enums_1.CallStatus.InCall;
        if (ifCanAccept) {
            throw new common_1.BadRequestException('Call status not ring! to be acceptCall ' + call.callStatus);
        }
        if (call.caller.toString() == dto.myUser._id.toString()) {
            throw new common_1.BadRequestException('Only the callee can accept this call!');
        }
        let rM = await this.isThereRoomMemberAndNotBanedOrThrow(call.roomId, dto.myUser._id);
        let isGroup = rM.rT == enums_1.RoomType.GroupChat;
        const callMemberCreation = this.callMemberService.create({
            callId: call._id,
            userId: dto.myUser._id,
            roomId: call.roomId,
            userDeviceId: dto.myUser.currentDevice._id,
        });
        const callUpdated = this.callHistory.findByIdAndUpdate(dto.callId, {
            callStatus: enums_1.CallStatus.InCall,
        });
        await Promise.all([callMemberCreation, callUpdated]);
        if (isGroup) {
            return { callId: dto.callId };
        }
        const peerUserCallMember = await this.callMemberService.findOne({
            callId: dto.callId,
            userId: call.caller,
        });
        const peerSocket = await this.ioService.getSocketByDeviceId(peerUserCallMember.userDeviceId);
        if (!peerSocket) {
            await this.callHistory.findByIdAndUpdate(dto.callId, {
                callStatus: enums_1.CallStatus.Offline,
            });
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.peerUserDeviceOfflineString);
        }
        peerSocket.emit(enums_1.SocketEventsType.v1OnCallAccepted, JSON.stringify({
            callId: dto.callId,
            roomId: call.roomId,
            peerAnswer: dto.payload,
        }));
        return { callId: dto.callId };
    }
    async rejectCallForSingle(dto, call) {
        await this.callHistory.findByIdAndUpdate(call._id, {
            callStatus: enums_1.CallStatus.Rejected,
        });
        this.socket.io.to(call.caller.toString()).emit(enums_1.SocketEventsType.v1OnCallRejected, JSON.stringify({
            callId: dto.callId,
            roomId: call.roomId,
        }));
        const rejectMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            rId: call.roomId,
            mT: enums_1.MessageType.Call,
            att: {
                callStatus: enums_1.CallStatus.Rejected,
                withVideo: call.withVideo,
            },
            content: `📞`,
            user: dto.myUser,
        });
        const newMessage = await this.messageService.create(rejectMsgDto);
        this.socket.io
            .to(call.roomId.toString())
            .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMessage));
        return 'Call rejected';
    }
    async _timeoutRing(peerId, callId, missedDto) {
        const call = await this.callHistory.findByIdOrThrow(callId);
        if (call.callStatus == enums_1.CallStatus.Ring) {
            await this.callHistory.findOneAndUpdate({ _id: callId }, {
                callStatus: enums_1.CallStatus.Timeout,
            });
            const newMessage = await this.messageService.create(missedDto);
            await this.updateCallStatusForUser(peerId, user_global_call_status_model_1.UserGlobalCallStatus.createEmpty());
            await this.updateCallStatusForUser(missedDto.myUser._id, user_global_call_status_model_1.UserGlobalCallStatus.createEmpty());
            this.socket.io
                .to(missedDto._roomId.toString())
                .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMessage));
            await this.notificationService.singleChatNotification(peerId, newMessage);
        }
    }
    async getAgoraAccess(dto) {
        await this.isThereRoomMemberAndNotBanedOrThrow(dto.roomId, dto.myUser._id);
        return this.agoraService.getAgoraAccessNew(dto.roomId, true);
    }
    async endCallV2(dto) {
        const call = await this.callHistory.findOne({ _id: dto.callId, participants: dto.myUser._id });
        if (!call)
            throw new common_1.BadRequestException('You dont have any call to endCallV2 you are not participating in ' + call);
        let rM = await this.isThereRoomMemberAndNotBanedOrThrow(call.roomId, dto.myUser._id);
        const myId = dto.myUser._id.toString();
        await this.updateCallStatusForUser(call.callee, user_global_call_status_model_1.UserGlobalCallStatus.createEmpty());
        await this.updateCallStatusForUser(myId, user_global_call_status_model_1.UserGlobalCallStatus.createEmpty());
        if (rM.rT == enums_1.RoomType.GroupChat) {
            if (call.caller.toString() == myId && call.callStatus == enums_1.CallStatus.Ring) {
                return this.cancelCall(dto, call);
            }
            return;
        }
        if (call.caller.toString() == myId) {
            if (call.callStatus == enums_1.CallStatus.Ring) {
                return this.cancelCall(dto, call);
            }
        }
        else {
            if (call.callStatus == enums_1.CallStatus.Ring) {
                return this.rejectCallForSingle(dto, call);
            }
        }
        if (call.callStatus == enums_1.CallStatus.InCall) {
            return this.endCallForSingle(dto, call);
        }
        return "No action done";
    }
    async getCallsHistory(user) {
        return await this.callHistory.findAll({
            $and: [
                {
                    participants: user._id.toString(),
                },
                {
                    deleteFrom: { $ne: (0, utils_1.newMongoObjId)(user._id) },
                },
            ],
            callStatus: { $in: [enums_1.CallStatus.Canceled, enums_1.CallStatus.Finished, enums_1.CallStatus.Rejected] },
        }, "-participants -deleteFrom", {
            limit: 30,
            sort: '-_id',
            populate: [
                {
                    path: 'callee',
                    select: 'fullName userImage',
                },
                {
                    path: 'caller',
                    select: 'fullName userImage',
                },
                {
                    path: 'roomId',
                    select: '_id gName gImg',
                },
            ],
        });
    }
    async deleteAllHistory(user) {
        await this.callHistory.updateMany({
            participants: user._id
        }, {
            $addToSet: {
                deleteFrom: (0, utils_1.newMongoObjId)(user._id),
            },
        });
        return 'Done';
    }
    async deleteOneHistory(dto) {
        await this.callHistory.findByIdAndUpdate(dto.id, {
            $addToSet: {
                deleteFrom: (0, utils_1.newMongoObjId)(dto.myUser._id),
            },
        });
        return 'Done';
    }
    async isThereRoomMemberAndNotBanedOrThrow(roomId, userId) {
        const roomMember = await this.middlewareService.isThereRoomMemberOrThrow(roomId, userId);
        const ban = await this.userBanService.getBan(roomMember.pId, roomMember.uId);
        if (ban) {
            throw new common_1.BadRequestException('You do not have access (banned).');
        }
        return roomMember;
    }
    async createGroupCallNotify(dto, rM) {
        let users = await this.groupMemberService.findAll({
            rId: dto.roomId,
        }, "uId");
        let call = await this.callHistory.create({
            caller: dto.myUser._id,
            callee: null,
            withVideo: dto.withVideo,
            meetPlatform: dto.meetPlatform,
            roomId: dto.roomId,
            callStatus: enums_1.CallStatus.Ring,
            participants: users.map((value) => value['uId']),
            roomType: enums_1.RoomType.GroupChat,
        });
        await this.callMemberService.create({
            callId: call._id,
            userId: dto.myUser._id,
            roomId: dto.roomId,
            userDeviceId: dto.myUser.currentDevice._id,
        });
        this.notificationService.groupRingNotify({
            roomType: enums_1.RoomType.GroupChat,
            callerId: call.caller,
            callId: call._id,
            roomId: dto.roomId,
            withVideo: dto.withVideo,
            groupName: rM.t,
            userName: dto.myUser.fullName,
            userImage: rM.img,
            callStatus: enums_1.CallStatus.Ring,
        }).then(value => {
        });
        const ringMsgDto = (0, chat_helper_1.getMsgDtoObj)({
            rId: dto.roomId,
            mT: enums_1.MessageType.Call,
            att: {
                callStatus: enums_1.CallStatus.Ring,
                startAt: new Date(),
                withVideo: dto.withVideo,
                endAt: null,
            },
            content: `📞 New call from ${rM.t} 👥`,
            user: dto.myUser,
        });
        const newMessage = await this.messageService.create(ringMsgDto);
        this.socket.io
            .to(newMessage.rId.toString())
            .emit(enums_1.SocketEventsType.v1OnNewMessage, JSON.stringify(newMessage));
        return call._id;
    }
    async updateCallStatusForUser(userId, dto) {
        if (!userId)
            return;
        await this.userService.findByIdAndUpdate(userId, {
            userGlobalCallStatus: dto
        });
    }
};
CallService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        call_history_service_1.CallHistoryService,
        socket_io_service_1.SocketIoService,
        user_ban_service_1.UserBanService,
        call_member_service_1.CallMemberService,
        room_middleware_service_1.RoomMiddlewareService,
        schedule_1.SchedulerRegistry,
        message_service_1.MessageService,
        group_member_service_1.GroupMemberService,
        app_config_service_1.AppConfigService,
        socket_io_service_1.SocketIoService,
        call_emitter_1.CallEmitter,
        room_member_service_1.RoomMemberService,
        agora_service_1.AgoraService])
], CallService);
exports.CallService = CallService;
//# sourceMappingURL=call.service.js.map