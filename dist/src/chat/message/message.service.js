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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const group_message_status_service_1 = require("../group_message_status/group_message_status.service");
const file_uploader_service_1 = require("../../common/file_uploader/file_uploader.service");
let MessageService = class MessageService {
    constructor(messageModel, groupMessageStatusService, s3) {
        this.messageModel = messageModel;
        this.groupMessageStatusService = groupMessageStatusService;
        this.s3 = s3;
    }
    async getByIdOrFail(messageId, select) {
        let msg = await this.messageModel.findById(messageId, select).lean();
        if (!msg) {
            throw new common_1.NotFoundException("message not found " + messageId);
        }
        return msg;
    }
    async findOne(filter) {
        let m = await this.messageModel.findOne(filter);
        return this.prepareTheMessageModel(m);
    }
    async create(dto, session) {
        let x = await this.messageModel.create([dto.toJson()], { session });
        return this.prepareTheMessageModel(x[0]);
    }
    async createOneFromJson(dto) {
        return this.messageModel.create(dto);
    }
    async createMany(data, session) {
        return this.messageModel.create(data.map(value => value.toJson()), { session });
    }
    async findAllMessagesAggregation(myId, roomId, dto) {
        let sortDirection = dto.isAsc === "true" ? 1 : -1;
        let limit = parseInt(dto.getLimit().toString(), 10);
        let pipeline = [
            {
                $match: {
                    rId: roomId,
                    dF: { $ne: myId },
                    ...dto.getFilter()
                }
            },
            {
                $sort: {
                    _id: sortDirection
                }
            },
            {
                $limit: limit
            },
            {
                $addFields: {
                    isStared: {
                        $in: [myId, { $ifNull: ['$stars', []] }]
                    },
                    isOneSeenByMe: {
                        $in: [myId, { $ifNull: ['$oneSeenBy', []] }]
                    },
                    isDeletedFromMe: {
                        $in: [myId, { $ifNull: ['$dF', []] }]
                    }
                }
            },
            {
                $unset: ['oneSeenBy', 'dF', 'stars', 'mentions']
            }
        ];
        return this.messageModel.aggregate(pipeline).exec();
    }
    async paginated(dto) {
        return this.messageModel.paginate(...dto);
    }
    async findAll(filter, options) {
        return this.messageModel.find(filter, null, options);
    }
    prepareTheMessageModel(msg) {
        if (!msg) {
            return null;
        }
        msg['isStared'] = false;
        return msg;
    }
    async getUnReadCount(lastMessageSeenId, roomId, myId) {
        return this.messageModel.countDocuments({
            $and: [
                { _id: { $gt: lastMessageSeenId } },
                { rId: roomId },
                { sId: { $ne: myId } }
            ]
        }).lean();
    }
    async setMessageSeenForSingleChat(userId, roomId) {
        const roomObjectId = new mongoose_2.default.Types.ObjectId(roomId);
        const userObjectId = new mongoose_2.default.Types.ObjectId(userId);
        return this.messageModel.updateMany({
            rId: roomObjectId,
            sId: { $ne: userObjectId },
            sAt: null
        }, {
            $set: { sAt: new Date() }
        });
    }
    async setMessageSeenForGroupChat(userId, roomId) {
        await this.setMessageDeliverForGroupChat(userId, roomId);
        return this.groupMessageStatusService.updateMany({
            rId: roomId,
            uId: userId,
            sAt: null
        }, {
            sAt: new Date()
        });
    }
    async setMessageDeliverForSingleChat(userId, roomId) {
        const roomObjectId = new mongoose_2.default.Types.ObjectId(roomId);
        const userObjectId = new mongoose_2.default.Types.ObjectId(userId);
        return this.messageModel.updateMany({
            rId: roomObjectId,
            sId: { $ne: userObjectId },
            dAt: null
        }, {
            dAt: new Date()
        });
    }
    async setMessageDeliverForGroupChat(myId, roomId) {
        return await this.groupMessageStatusService.updateMany({
            rId: roomId,
            uId: myId,
            dAt: null
        }, {
            dAt: new Date()
        });
    }
    async deleteMessageFromMe(myId, id) {
        await this.getByIdOrFail(id);
        return this.messageModel.findByIdAndUpdate(id, {
            $addToSet: {
                dF: myId
            }
        }, { new: true });
    }
    async isMeMessageSenderOrThrow(myId, id) {
        let msg = await this.getByIdOrFail(id);
        if (msg.sId != myId)
            throw new common_1.ForbiddenException("you dont have access");
        return msg;
    }
    async deleteAllRoomMessagesFromMe(userId, roomId) {
        await this.messageModel.updateMany({
            rId: roomId
        }, {
            $addToSet: {
                dF: userId
            }
        });
    }
    async deleteAll() {
        await this.messageModel.deleteMany();
    }
    async deleteOne(filter) {
        await this.messageModel.deleteOne(filter);
    }
    async deleteWhere(filter) {
        await this.messageModel.deleteMany(filter);
    }
    async isMessageExist(localId) {
        return this.messageModel.findOne({ lId: localId });
    }
    async findByRoomIdAndUpdate(rId, param2) {
        return this.messageModel.updateMany({
            rId: rId
        }, param2);
    }
    async findByIdAndUpdate(mId, update) {
        return this.messageModel.findByIdAndUpdate(mId, update, { new: true });
    }
    async findById(mId) {
        return this.messageModel.findById(mId);
    }
    async findWhere(filter, select, options) {
        return this.messageModel.find(filter, select, options);
    }
    async getById(id, select) {
        return this.messageModel.findById(id, select).lean();
    }
    updateMany(filter, update, options) {
        return Promise.resolve(this.messageModel.updateMany(filter, update, options));
    }
    async findCount(filter, options) {
        return this.messageModel.countDocuments(filter, options).lean();
    }
    async getByLocalId(lId, select) {
        return this.messageModel.findOne({ lId: lId }, select).lean();
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("message")),
    __metadata("design:paramtypes", [Object, group_message_status_service_1.GroupMessageStatusService,
        file_uploader_service_1.FileUploaderService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map