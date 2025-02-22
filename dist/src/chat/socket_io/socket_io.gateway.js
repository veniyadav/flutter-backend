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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_service_1 = require("./socket_io.service");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const ws_catch_all_filter_1 = require("../../core/exception_filter/ws-catch-all-filter");
const enums_1 = require("../../core/utils/enums");
const app_validator_1 = require("../../core/utils/app.validator");
let SocketIoGateway = class SocketIoGateway {
    constructor(socketIoService) {
        this.socketIoService = socketIoService;
    }
    afterInit(server) {
        this.socketIoService.io = this.io;
    }
    async handleConnection(client, ...args) {
        await this.socketIoService.handleConnection(client);
    }
    async handleDisconnect(client) {
        await this.socketIoService.handleDisconnect(client);
    }
    async myOnline(data, client) {
        let decodedData = data;
        try {
            decodedData = (0, app_validator_1.jsonDecoder)(data);
        }
        catch (e) {
        }
        let isArray = Array.isArray(decodedData);
        if (!isArray) {
            throw new common_1.BadRequestException(decodedData + " must be array of mongo ids");
        }
        let res = await this.socketIoService.myOnline(decodedData);
        client.emit(enums_1.SocketEventsType.v1OnMyOnline, JSON.stringify(res));
    }
    async updateRoomMessagesToDeliver(data, client) {
        let myUser = client.user;
        let roomId = null;
        try {
            let dataMap = (0, app_validator_1.jsonDecoder)(data);
            roomId = dataMap['roomId'];
        }
        catch (err) {
        }
        if (roomId == null) {
            roomId = data['roomId'];
        }
        if (!roomId) {
            throw new common_1.BadRequestException("while updateRoomMessagesToDeliver roomId is required " + data);
        }
        let needToNotify = await this.socketIoService.updateRoomMessagesToDeliver(roomId, myUser);
        if (needToNotify.isUpdated) {
            this.io.to(needToNotify.pId.toString()).emit(enums_1.SocketEventsType.v1OnDeliverChatRoom, JSON.stringify({
                roomId: roomId.toString(),
                userId: needToNotify.pId.toString(),
                date: new Date(),
            }));
        }
    }
    async updateRoomMessagesToSeen(data, client) {
        let myUser = client.user;
        let roomId = null;
        try {
            let dataMap = (0, app_validator_1.jsonDecoder)(data);
            roomId = dataMap['roomId'];
        }
        catch (err) {
        }
        if (roomId == null) {
            roomId = data['roomId'];
        }
        if (!roomId) {
            throw new common_1.BadRequestException("while updateRoomMessagesToDeliver roomId is required " + data);
        }
        let needToNotify = await this.socketIoService.updateRoomMessagesToSeen(roomId, myUser);
        if (needToNotify.isUpdated) {
            this.io.to(needToNotify.pId.toString()).emit(enums_1.SocketEventsType.v1OnEnterChatRoom, JSON.stringify({
                roomId: roomId.toString(),
                userId: needToNotify.pId.toString(),
                date: new Date(),
            }));
        }
    }
    async iceRtc(data, client) {
    }
    async roomStatusChanged(data, client) {
        let myUser = client.user;
        let roomId = null;
        let status = null;
        try {
            let decodedData = (0, app_validator_1.jsonDecoder)(data);
            roomId = decodedData['roomId'];
            status = decodedData['status'];
        }
        catch (e) {
        }
        if (roomId == null) {
            roomId = data['roomId'];
            status = data['status'];
        }
        let res = {
            "roomId": roomId,
            "status": status,
            "name": myUser.fullName,
            "userId": myUser._id
        };
        if (status != "stop") {
            client['typingTo'] = roomId;
        }
        this.io
            .to(roomId.toString())
            .emit(enums_1.SocketEventsType.v1OnRoomStatusChange, JSON.stringify(res));
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketIoGateway.prototype, "io", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(enums_1.SocketEventsType.v1MyOnline),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketIoGateway.prototype, "myOnline", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enums_1.SocketEventsType.v1DeliverChatRoom),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketIoGateway.prototype, "updateRoomMessagesToDeliver", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enums_1.SocketEventsType.v1EnterChatRoom),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketIoGateway.prototype, "updateRoomMessagesToSeen", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enums_1.SocketEventsType.v1IceCandidate),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketIoGateway.prototype, "iceRtc", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(enums_1.SocketEventsType.v1RoomStatusChange),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SocketIoGateway.prototype, "roomStatusChanged", null);
SocketIoGateway = __decorate([
    (0, common_1.UseFilters)(new ws_catch_all_filter_1.WsCatchAllFilter()),
    (0, websockets_1.WebSocketGateway)({
        transports: ["websocket"],
        connectTimeout: 5000,
        pingInterval: 15000,
        pingTimeout: 5000,
        allowEIO3: true,
        cors: {
            origin: "*",
        },
    }),
    __metadata("design:paramtypes", [socket_io_service_1.SocketIoService])
], SocketIoGateway);
exports.SocketIoGateway = SocketIoGateway;
//# sourceMappingURL=socket_io.gateway.js.map