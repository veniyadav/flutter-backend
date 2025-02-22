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
exports.ChannelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const remove_accents_1 = require("remove-accents");
const room_member_service_1 = require("../../room_member/room_member.service");
const message_service_1 = require("../../message/message.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const user_ban_service_1 = require("../../../api/user_modules/user_ban/user_ban.service");
const single_room_settings_service_1 = require("../../single_room_settings/single_room_settings.service");
const single_room_settings_service_2 = require("../../order_room_settings/single_room_settings.service");
const socket_io_service_1 = require("../../socket_io/socket_io.service");
const room_middleware_service_1 = require("../../room_middleware/room_middleware.service");
const utils_1 = require("../../../core/utils/utils");
const enums_1 = require("../../../core/utils/enums");
const link_preview_js_1 = require("link-preview-js");
let ChannelService = class ChannelService {
    constructor(roomMemberService, messageService, userService, singleRoomSetting, orderRoomSetting, socket, middlewareService, userBan) {
        this.roomMemberService = roomMemberService;
        this.messageService = messageService;
        this.userService = userService;
        this.singleRoomSetting = singleRoomSetting;
        this.orderRoomSetting = orderRoomSetting;
        this.socket = socket;
        this.middlewareService = middlewareService;
        this.userBan = userBan;
    }
    async _getOneFullRoomModel(dto) {
        let f = {
            rId: (0, utils_1.newMongoObjId)(dto.roomId),
            uId: (0, utils_1.newMongoObjId)(dto.userId),
            isD: false,
            ...dto.filter
        };
        if (dto.deleteIsDKey) {
            delete f.isD;
        }
        let x = await this.roomMemberService
            .aggregate(this.getChannelStagesV3({
            page: 0,
            limit: 1,
            myIdObj: (0, utils_1.newMongoObjId)(dto.userId),
            filter: f
        }));
        let room = x[0];
        if (!room)
            throw new common_1.BadRequestException("getOneFullRoomModel while aggregate cant find room" + dto.roomId + " to user" + dto.userId);
        return room;
    }
    async getOrCreatePeerRoom(dto, session) {
        let peerUser = await this.userService.findByIdOrThrow(dto.peerId, "userImage fullName fullNameEn");
        dto.peerId = peerUser._id;
        let sRS = await this.middlewareService.getSingleRoomSetting(dto.peerId, dto.myUser._id);
        if (sRS) {
            return await this._getOneFullRoomModel({
                roomId: sRS._id,
                userId: dto.myUser._id,
                deleteIsDKey: true
            });
        }
        if (dto.peerId == dto.myUser._id) {
            throw new common_1.BadRequestException('Cant start chat with your self!');
        }
        let roomSettingId = (0, utils_1.newMongoObjId)().toString();
        await this.singleRoomSetting.create({
            _id: roomSettingId.toString(),
            cId: dto.myUser._id,
            pId: dto.peerId,
        }, session);
        await this.roomMemberService.createMany([
            {
                uId: dto.myUser._id,
                rId: roomSettingId,
                lSMId: roomSettingId,
                rT: enums_1.RoomType.Single,
                t: peerUser.fullName,
                tEn: peerUser.fullNameEn,
                img: peerUser.userImage,
                pId: dto.peerId,
                isD: true,
            },
            {
                uId: peerUser._id,
                rId: roomSettingId,
                lSMId: roomSettingId,
                rT: enums_1.RoomType.Single,
                t: dto.myUser.fullName,
                tEn: dto.myUser.fullNameEn,
                img: dto.myUser.userImage,
                pId: dto.myUser._id,
                isD: true,
            },
        ], session);
        await this.socket.joinRoom({
            usersIds: [dto.peerId.toString(), dto.myUser._id.toString()],
            roomId: roomSettingId,
        });
        return this._getOneFullRoomModel({
            roomId: roomSettingId,
            userId: dto.myUser._id,
            deleteIsDKey: true
        });
    }
    async createOrderRoom(dto) {
        let peerUser = await this.userService.findByIdOrThrow(dto.peerId, "userImage fullName fullNameEn");
        if (dto.peerId == dto.myUser._id) {
            throw new common_1.BadRequestException('Cant start chat with your self!');
        }
        let oldRoomSettings = await this.orderRoomSetting.findOne({
            orderId: dto.orderId
        });
        if (oldRoomSettings) {
            let res = await this.middlewareService.isThereRoomMember(oldRoomSettings._id, dto.myUser._id);
            if (!res)
                throw new common_1.BadRequestException("You are try to create a room for order id that already has room between another users orderId must be unique for your order!");
            let data = await this._getOneFullRoomModel({
                roomId: oldRoomSettings._id,
                userId: dto.myUser._id,
                deleteIsDKey: true
            });
            if (dto.orderData) {
                await this.orderRoomSetting.findOneAndUpdate({
                    orderId: dto.orderId
                }, {
                    pinData: dto.orderData
                });
            }
            return data;
        }
        let roomSettingId = (0, utils_1.newMongoObjId)().toString();
        await this.orderRoomSetting.create({
            _id: roomSettingId.toString(),
            cId: dto.myUser._id,
            pId: dto.peerId,
            orderTitle: dto.orderTitle,
            orderImage: dto.orderImage,
            orderId: dto.orderId,
            pinData: dto.orderData
        });
        await this.roomMemberService.createMany([
            {
                uId: dto.myUser._id,
                rId: roomSettingId,
                lSMId: roomSettingId,
                rT: enums_1.RoomType.Order,
                t: dto.orderTitle ?? peerUser.fullName,
                tEn: dto.orderTitle ?? (0, remove_accents_1.remove)(peerUser.fullNameEn),
                img: dto.orderImage ?? peerUser.userImage,
                pId: dto.peerId,
                isD: true,
                orderId: dto.orderId,
            },
            {
                uId: peerUser._id,
                rId: roomSettingId,
                lSMId: roomSettingId,
                rT: enums_1.RoomType.Order,
                t: dto.orderTitle ?? dto.myUser.fullName,
                tEn: dto.orderTitle ?? (0, remove_accents_1.remove)(dto.myUser.fullNameEn),
                img: dto.orderImage ?? dto.myUser.userImage,
                pId: dto.myUser._id,
                orderId: dto.orderId,
                isD: true,
            },
        ]);
        await this.socket.joinRoom({
            usersIds: [dto.peerId.toString(), dto.myUser._id.toString()],
            roomId: roomSettingId,
        });
        return this._getOneFullRoomModel({
            roomId: roomSettingId,
            userId: dto.myUser._id,
            deleteIsDKey: true
        });
    }
    async updateRoomTranslate(dto, transTo) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        return this.roomMemberService.findOneAndUpdate({
            uId: dto.myUser._id,
            rId: dto.roomId,
        }, { tTo: transTo, }, null, { new: true });
    }
    async stopRoomTranslate(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        return this.roomMemberService.findOneAndUpdate({
            uId: dto.myUser._id,
            rId: dto.roomId,
        }, { tTo: null, }, null, { new: true });
    }
    async getRoomsLimited(dto, userId) {
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
        let filter = {
            uId: (0, utils_1.newMongoObjId)(userId),
            isD: false,
            isA: false,
        };
        if (dto['roomType']) {
            filter['rT'] = dto['roomType'];
        }
        if (dto['mutedOnly'] == "true") {
            filter['isM'] = true;
        }
        if (dto['archiveOnly'] == "true") {
            filter['isA'] = true;
        }
        if (dto['deletedOnly'] == "true") {
            filter['isD'] = true;
        }
        if (dto['title']) {
            let x = (0, remove_accents_1.remove)(dto['title']);
            filter['$or'] = [
                {
                    tEn: {
                        "$regex": ".*" + x + ".*",
                        "$options": "i"
                    }
                },
                {
                    nTitle: {
                        "$regex": ".*" + x + ".*",
                        "$options": "i"
                    }
                }
            ];
        }
        let stages = this.getChannelStagesV3({
            page: paginationParameters[1].page,
            limit: paginationParameters[1].limit,
            myIdObj: (0, utils_1.newMongoObjId)(userId),
            filter: filter
        });
        return await this.roomMemberService.aggregateV2(stages, paginationParameters[1].page, paginationParameters[1].limit);
    }
    async getRoomById(dto) {
        let rMember = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rMember.rT == enums_1.RoomType.Single) {
            let rS = await this.singleRoomSetting.findByIdOrThrow(dto.roomId);
            let ban = await this.userBan.getBan(rS.pId, rS.cId);
            if (ban)
                throw new common_1.BadRequestException("There are ban you dont have access!");
        }
        let rMessage = await this.messageService.findOne({
            rId: rMember.rId,
            dF: { $ne: dto.myUser._id },
        });
        if (!rMessage) {
            throw new common_1.BadRequestException("WORKING You are try to get room but i dont have messages yet !");
        }
        if (rMember.isD) {
            await this.middlewareService.unDeleteAllRoomMembers(rMember.rId);
            await this.socket.joinRoom({ roomId: rMember.rId.toString(), usersIds: [dto.myUser._id.toString()] });
        }
        return this._getOneFullRoomModel({
            roomId: dto.roomId,
            userId: dto.myUser._id
        });
    }
    async deliverRoomMessages(dto) {
        let rMember = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rMember.rT == enums_1.RoomType.Single || rMember.rT == enums_1.RoomType.Order) {
            let res = await this.messageService.setMessageDeliverForSingleChat(dto.myUser._id, dto.roomId);
            let isUpdated = res['modifiedCount'] != 0;
            if (isUpdated) {
                this.socket.io.to(dto.roomId.toString()).emit(enums_1.SocketEventsType.v1OnDeliverChatRoom, JSON.stringify({
                    roomId: dto.roomId.toString(),
                    userId: rMember.pId.toString(),
                    date: new Date(),
                }));
            }
            return {
                isUpdated: isUpdated,
            };
        }
        if (rMember.rT == enums_1.RoomType.GroupChat) {
            let res = await this.messageService.setMessageDeliverForGroupChat(dto.myUser._id, dto.roomId);
            return {
                isUpdated: res,
            };
        }
        return {
            isUpdated: false,
        };
    }
    async changeNickName(dto, name) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (!name || name == "") {
            await this.roomMemberService.findByIdAndUpdate(rM._id, {
                nTitle: null
            });
            return "success";
        }
        let res = await this.roomMemberService.findByIdAndUpdate(rM._id, {
            nTitle: name
        });
        return "success";
    }
    async muteRoomNotification(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, { isM: true, });
        return "Room muted";
    }
    async unMuteRoomNotification(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, { isM: false, });
        return "Room un muted";
    }
    async deleteRoom(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, {
            isD: true,
        });
        await this.messageService.findByRoomIdAndUpdate(dto.roomId, {
            $addToSet: {
                dF: dto.myUser._id,
            },
        });
        return 'Room has been deleted';
    }
    async getMySingleChatInfo(dto) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Single) {
            throw new common_1.BadRequestException("room must be single chat to continue you send " + rM.rT);
        }
        let res = {
            banned: false,
            bannerId: null
        };
        let ban = await this.userBan.getBan(dto.myUser._id, rM.pId);
        if (ban) {
            res['banned'] = true;
            res['bannerId'] = dto.myUser._id;
        }
        res['lastSeenAt'] = (await this.userService.findById(rM.pId, "lastSeenAt")).lastSeenAt;
        return res;
    }
    async getMyOrderChatInfo(dto) {
        let rM = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        if (rM.rT != enums_1.RoomType.Order) {
            throw new common_1.BadRequestException("room must be order chat to continue you send " + rM.rT);
        }
        let res = {};
        let settings = await this.orderRoomSetting.findOne({ _id: dto.roomId });
        res['lastSeenAt'] = (await this.userService.findById(rM.pId, "lastSeenAt")).lastSeenAt;
        res['orderSettings'] = settings;
        return res;
    }
    async getRoomUnReadCount(dto) {
        let rMember = await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        return this.messageService.getUnReadCount(rMember.lSMId, rMember.rId, dto.myUser._id);
    }
    async archiveRoom(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, { isA: true, });
        return "Room  archived";
    }
    async unArchiveRoom(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, { isA: false, });
        return "Room un archived";
    }
    async getStarMessages(dto, myId) {
        let messages = await this.messageService.findAll({
            stars: (0, utils_1.newMongoObjId)(myId),
            dF: { $ne: (0, utils_1.newMongoObjId)(myId) },
        }, { lean: true, limit: 150, sort: "-_id" });
        for (let i of messages) {
            i['isStared'] = true;
        }
        return { docs: messages };
    }
    async clearRoomMessages(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.messageService.updateMany({
            rId: dto.roomId,
        }, { $addToSet: { dF: dto.myUser._id }, });
        return "All Messages has been deleted!";
    }
    async getUrlPreview(dto, url) {
        if (!url)
            throw new common_1.BadRequestException("url in query param is required");
        return await (0, link_preview_js_1.getLinkPreview)(url, {
            followRedirects: "follow",
        });
    }
    async roomOneSeenOn(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, { isOneSeen: true, });
        return "Room isOneSeen true";
    }
    async roomOneSeenOff(dto) {
        await this.middlewareService.isThereRoomMemberOrThrow(dto.roomId, dto.myUser._id);
        await this.roomMemberService.findOneAndUpdate({
            rId: dto.roomId,
            uId: dto.myUser._id,
        }, { isOneSeen: false, });
        return "Room isOneSeen false";
    }
    getChannelStagesV3(dto) {
        return [
            {
                $match: dto.filter,
            },
            {
                $lookup: {
                    from: 'messages',
                    let: { roomId: '$rId', lastSeenId: '$lSMId', userId: dto.myIdObj },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $gt: ['$_id', '$$lastSeenId'] },
                                        { $eq: ['$rId', '$$roomId'] },
                                        { $ne: ['$sId', '$$userId'] }
                                    ]
                                }
                            }
                        },
                        { $count: 'uC' }
                    ],
                    as: 'unreadMessages'
                }
            },
            {
                $addFields: {
                    uC: { $ifNull: [{ $arrayElemAt: ['$unreadMessages.uC', 0] }, 0] }
                }
            },
            {
                $unset: 'unreadMessages'
            },
            {
                $lookup: {
                    from: 'messages',
                    localField: 'rId',
                    foreignField: 'rId',
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $not: {
                                        $in: [dto.myIdObj, '$dF'],
                                    },
                                },
                            },
                        },
                        {
                            $sort: {
                                _id: -1,
                            },
                        },
                        {
                            $limit: 1,
                        },
                        {
                            $addFields: {
                                isStared: {
                                    $in: [dto.myIdObj, { $ifNull: ['$stars', []] }]
                                },
                                isOneSeenByMe: {
                                    $in: [dto.myIdObj, { $ifNull: ['$oneSeenBy', []] }]
                                }
                            }
                        }
                    ],
                    as: 'lastMessageArray',
                },
            },
            {
                $addFields: {
                    lastMessage: { $arrayElemAt: ['$lastMessageArray', 0] }
                }
            },
            {
                $unset: ['lastMessageArray', 'lastMessage.stars', 'lastMessage.oneSeenBy']
            },
            {
                $sort: {
                    'lastMessage._id': -1,
                },
            },
            {
                $lookup: {
                    from: 'messages',
                    let: { roomId: '$rId', lastSeenId: '$lSMId', userId: dto.myIdObj },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $gt: ['$_id', '$$lastSeenId'] },
                                        { $eq: ['$rId', '$$roomId'] },
                                        { $ne: ['$sId', '$$userId'] },
                                        { $in: ['$$userId', { $ifNull: ['$mentions', []] }] }
                                    ]
                                }
                            }
                        },
                        { $count: 'mentionsCount' }
                    ],
                    as: 'mentionsData'
                }
            },
            {
                $addFields: {
                    mentionsCount: { $ifNull: [{ $arrayElemAt: ['$mentionsData.mentionsCount', 0] }, 0] }
                }
            },
            {
                $unset: 'mentionsData'
            },
        ];
    }
};
ChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [room_member_service_1.RoomMemberService,
        message_service_1.MessageService,
        user_service_1.UserService,
        single_room_settings_service_1.SingleRoomSettingsService,
        single_room_settings_service_2.OrderRoomSettingsService,
        socket_io_service_1.SocketIoService,
        room_middleware_service_1.RoomMiddlewareService,
        user_ban_service_1.UserBanService])
], ChannelService);
exports.ChannelService = ChannelService;
//# sourceMappingURL=channel.service.js.map