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
exports.SocketIoService = void 0;
const common_1 = require("@nestjs/common");
const call_member_service_1 = require("../call_modules/call_member/call_member.service");
const room_member_service_1 = require("../room_member/room_member.service");
const message_service_1 = require("../message/message.service");
const user_service_1 = require("../../api/user_modules/user/user.service");
const room_middleware_service_1 = require("../room_middleware/room_middleware.service");
const enums_1 = require("../../core/utils/enums");
const utils_1 = require("../../core/utils/utils");
const user_device_service_1 = require("../../api/user_modules/user_device/user_device.service");
const user_global_call_status_model_1 = require("../call_modules/utils/user-global-call-status.model");
let SocketIoService = class SocketIoService {
    constructor(roomMemberService, messageService, userService, deviceService, callMemberService, middlewareService, userDeviceService) {
        this.roomMemberService = roomMemberService;
        this.messageService = messageService;
        this.userService = userService;
        this.deviceService = deviceService;
        this.callMemberService = callMemberService;
        this.middlewareService = middlewareService;
        this.userDeviceService = userDeviceService;
    }
    async handleConnection(client, ...args) {
        let roomsIds = await this.roomMemberService.findAll({
            uId: client.user._id,
            bId: { $eq: null }
        }, "rT rId pId", { limit: 700 });
        client.join(roomsIds.map(value => value.rId.toString()));
        client.join(client.user._id.toString());
        for (let r of roomsIds) {
            if (r.rT == enums_1.RoomType.Single || r.rT == enums_1.RoomType.Order) {
                let res = await this.messageService.setMessageDeliverForSingleChat(client.user._id, r.rId);
                let isUpdated = res["modifiedCount"] != 0;
                if (isUpdated) {
                    this.io.to(r.rId.toString()).emit(enums_1.SocketEventsType.v1OnDeliverChatRoom, JSON.stringify({
                        roomId: r.rId.toString(),
                        userId: r.pId.toString(),
                        date: new Date()
                    }));
                }
            }
            else if (r.rT == enums_1.RoomType.GroupChat) {
                await this.messageService.setMessageDeliverForGroupChat(client.user._id, r.rId);
            }
        }
    }
    async joinRoom(args) {
        let sockets = await this.getSockets(args.usersIds);
        for (let socket of sockets) {
            socket.join(args.roomId.toString());
        }
        return sockets.length;
    }
    async leaveRooms(args) {
        let sockets = await this.getSockets(args.usersIds);
        for (let socket of sockets) {
            await socket.leave(args.roomId.toString());
        }
        return sockets.length;
    }
    async getOnlineSocketsNumber() {
        let allSockets = await this.io.fetchSockets();
        return allSockets.length;
    }
    async getSockets(usersIds) {
        let allSockets = await this.io.fetchSockets();
        let sockets = [];
        allSockets.forEach((value) => {
            if (usersIds.includes(value["user"]["_id"].toString())) {
                sockets.push(value);
            }
        });
        return sockets;
    }
    async getSocketByDeviceId(deviceId) {
        let allSockets = await this.io.fetchSockets();
        let socket = null;
        allSockets.forEach((value) => {
            let id = value["user"]['currentDevice']._id.toString();
            if (id == deviceId) {
                socket = value;
            }
        });
        return socket;
    }
    async getOnlineRoomId(roomId) {
        let allSockets = await this.io.in(roomId).fetchSockets();
        return allSockets.length;
    }
    async getOnlineFromList(usersIds) {
        let allSockets = await this.io.fetchSockets();
        let onlineIds = [];
        for (let s of allSockets) {
            for (let id of usersIds) {
                if (id.toString() == s["user"]["_id"].toString()) {
                    onlineIds.push(s["user"]["_id"].toString());
                }
            }
        }
        return onlineIds;
    }
    async checkIfUserOnline(userId) {
        let allSockets = await this.io.fetchSockets();
        for (let s of allSockets) {
            if (userId.toString() == s["user"]["_id"].toString()) {
                return true;
            }
        }
        return false;
    }
    async leaveRoom(roomId, uId) {
        let sockets = await this.getSockets([uId]);
        for (let s of sockets) {
            await s.leave(roomId.toString());
        }
    }
    async myOnline(decodedList) {
        let onlineSockets = await this.getOnlineFromList(decodedList.map(data => data['peerId']));
        let res = [];
        for (let item of decodedList) {
            if (onlineSockets.includes(item['peerId'])) {
                res.push({
                    peerId: item['peerId'],
                    isOnline: true,
                    extra: item['extra']
                });
            }
            else {
                res.push({
                    peerId: item['peerId'],
                    isOnline: false,
                    extra: item['extra']
                });
            }
        }
        return res;
    }
    async updateRoomMessagesToDeliver(roomId, myUser) {
        let rMember = await this.middlewareService.isThereRoomMember(roomId, myUser._id);
        if (!rMember)
            return;
        if (rMember.rT == enums_1.RoomType.Single || rMember.rT == enums_1.RoomType.Order) {
            let res = await this.messageService.setMessageDeliverForSingleChat(myUser._id, roomId);
            let isUpdated = res['modifiedCount'] != 0;
            return { isUpdated: isUpdated, pId: rMember.pId, };
        }
        if (rMember.rT == enums_1.RoomType.GroupChat) {
            await this.messageService.setMessageDeliverForGroupChat(myUser._id, roomId);
        }
        return { isUpdated: false, pId: null };
    }
    async updateRoomMessagesToSeen(roomId, myUser) {
        let rMember = await this.middlewareService.isThereRoomMember(roomId, myUser._id);
        if (!rMember)
            return { isUpdated: false, pId: null };
        await this.roomMemberService.findOneAndUpdate({
            uId: myUser._id,
            rId: roomId.toString(),
        }, { lSMId: (0, utils_1.newMongoObjId)().toString() });
        if (rMember.rT == enums_1.RoomType.Single || rMember.rT == enums_1.RoomType.Order) {
            let res = await this.messageService.setMessageSeenForSingleChat(myUser._id, roomId.toString());
            let isUpdated = res['modifiedCount'] != 0;
            return { isUpdated: isUpdated, pId: rMember.pId.toString() };
        }
        else if (rMember.rT == enums_1.RoomType.GroupChat) {
            await this.messageService.setMessageSeenForGroupChat(myUser._id, roomId);
        }
        return { isUpdated: false, pId: null };
    }
    async handleDisconnect(client) {
        await this._setLastSeenAt(client.user);
        let rId = client['typingTo'];
        if (rId) {
            this.io
                .to(rId.toString())
                .emit(enums_1.SocketEventsType.v1OnRoomStatusChange, JSON.stringify({
                "roomId": rId,
                "status": "stop",
                "name": "",
                "userId": client.user._id
            }));
        }
        await this._checkIfThisDeviceInCall(client.user._id, client.user.currentDevice._id);
    }
    async kickGroupMember(gId, peerId) {
        this.io
            .to(gId.toString())
            .emit(enums_1.SocketEventsType.v1OnKickGroupMember, JSON.stringify({
            "roomId": gId,
            "userId": peerId
        }));
    }
    async _checkIfThisDeviceInCall(userId, deviceId) {
        let device = await this.userDeviceService.findById(deviceId);
        if (device.platform == enums_1.Platform.Android || device.platform == enums_1.Platform.Ios) {
            let theUser = await this.userService.findById(userId, "userGlobalCallStatus");
            if (theUser.userGlobalCallStatus && theUser.userGlobalCallStatus.callId) {
                await this.userService.findByIdAndUpdate(theUser._id, {
                    userGlobalCallStatus: user_global_call_status_model_1.UserGlobalCallStatus.createEmpty()
                });
            }
        }
    }
    async iceRtc(meetId, client) {
    }
    async _setLastSeenAt(user) {
        await this.userService.setLastSeenAt(user._id);
        await this.deviceService.setLastSeenAt(user.currentDevice._id);
    }
};
SocketIoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_member_service_1.RoomMemberService,
        message_service_1.MessageService,
        user_service_1.UserService,
        user_device_service_1.UserDeviceService,
        call_member_service_1.CallMemberService,
        room_middleware_service_1.RoomMiddlewareService,
        user_device_service_1.UserDeviceService])
], SocketIoService);
exports.SocketIoService = SocketIoService;
//# sourceMappingURL=socket_io.service.js.map