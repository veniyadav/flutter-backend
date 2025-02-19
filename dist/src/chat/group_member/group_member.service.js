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
exports.GroupMemberService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const base_room_service_1 = require("../../core/common/base.room.service");
let GroupMemberService = class GroupMemberService extends base_room_service_1.BaseRoomService {
    constructor(model) {
        super();
        this.model = model;
    }
    create(obj, session) {
        return Promise.resolve(this.model.create([obj], { session }));
    }
    deleteMany(filter) {
        return Promise.resolve(this.model.deleteMany(filter));
    }
    findAll(filter, select, options) {
        return Promise.resolve(this.model.find(filter, select, options));
    }
    findById(id, select) {
        return Promise.resolve(this.model.findById(id, select));
    }
    findByIdAndDelete(id) {
        return Promise.resolve(this.model.findByIdAndRemove(id));
    }
    findByIdAndUpdate(id, update) {
        return Promise.resolve(this.model.findByIdAndUpdate(id, update));
    }
    updateMany(filter, update, options) {
        return Promise.resolve(this.model.updateMany(filter, update, options));
    }
    async findByIdOrThrow(id, select) {
        let m = await this.findById(id, select);
        if (!m)
            throw new common_1.NotFoundException("group member with id " + id + " not found in db");
        return m;
    }
    findByRoomId(roomId, select, options) {
        return Promise.resolve(this.findAll({ rId: roomId }, select, options));
    }
    findByRoomIdAndDelete(roomId, filter) {
        return Promise.resolve(this.deleteMany({ rId: roomId }));
    }
    findByRoomIdAndUpdate(roomId, update) {
        return Promise.resolve(this.updateMany({
            rId: roomId
        }, update));
    }
    findOne(filter, select) {
        return Promise.resolve(this.model.findOne(filter, select));
    }
    findByRoomIdAndUserIdAndUpdate(roomId, userId, update, session, options) {
        return Promise.resolve(this.findOneAndUpdate({ rId: roomId, uId: userId }, update, session, options));
    }
    createMany(obj, session) {
        return Promise.resolve(this.model.create(obj, { session }));
    }
    findOneAndUpdate(filter, update, session, options) {
        return Promise.resolve(this.model.findOneAndUpdate(filter, update, options).session(session));
    }
    async getMembersCount(rId) {
        return this.model.countDocuments({
            rId,
        });
    }
    async deleteOne(filter) {
        return this.model.deleteOne(filter);
    }
    async findCount(filter, options) {
        return this.model.countDocuments(filter, options).lean();
    }
    paginate(paginationParameters) {
        return Promise.resolve(this.model.paginate(...paginationParameters));
    }
};
GroupMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('group_member')),
    __metadata("design:paramtypes", [Object])
], GroupMemberService);
exports.GroupMemberService = GroupMemberService;
//# sourceMappingURL=group_member.service.js.map