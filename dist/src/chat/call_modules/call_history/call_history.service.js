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
exports.CallHistoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const base_service_1 = require("../../../core/common/base.service");
const utils_1 = require("../../../core/utils/utils");
let CallHistoryService = class CallHistoryService extends base_service_1.BaseService {
    constructor(model) {
        super();
        this.model = model;
    }
    findById(id, select) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException('NOT VALID MONGO DB OBJECT ' + id);
        }
        return this.model.findById(id, select).lean().exec();
    }
    findByIdAndDelete(id) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException('NOT VALID MONGO DB OBJECT ' + id);
        }
        return this.model.findByIdAndDelete(id).lean().exec();
    }
    async findByIdOrThrow(id, select, options) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException('NOT VALID MONGO DB OBJECT ' + id);
        }
        const record = await this.model.findById(id, select, options).lean().exec();
        if (!record) {
            throw new common_1.NotFoundException('CallHistory with id ' + id + ' does not exist in the database.');
        }
        return record;
    }
    async findByIdAndUpdate(_id, update, session) {
        return this.model.findByIdAndUpdate(_id, update, { session, new: true }).lean().exec();
    }
    async create(dto) {
        const created = await this.model.create(dto);
        return this.findById(created._id);
    }
    deleteMany(filter) {
        return this.model.deleteMany(filter).exec();
    }
    delete(filter) {
        return this.model.deleteOne(filter).exec();
    }
    updateMany(filter, update, options) {
        return this.model.updateMany(filter, update, options).exec();
    }
    findAll(filter, select, options) {
        return this.model.find(filter, select, options).lean().exec();
    }
    findOne(filter, select, options) {
        return this.model.findOne(filter, select, options).lean().exec();
    }
    findOneAndUpdate(filter, update, session, options) {
        return this.model
            .findOneAndUpdate(filter, update, { ...options, session, new: true })
            .lean()
            .exec();
    }
    async findCount(filter) {
        return this.model.countDocuments(filter).exec();
    }
    async createMany(records, session) {
        const createdRecords = await this.model.insertMany(records, { session });
        return createdRecords.map(record => record.toObject());
    }
    async paginateModel(filter, options) {
        if (this.model.paginate) {
            return this.model.paginate(filter, options);
        }
        else {
            throw new Error('Paginate is not implemented for this model');
        }
    }
};
CallHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('call_history')),
    __metadata("design:paramtypes", [Object])
], CallHistoryService);
exports.CallHistoryService = CallHistoryService;
//# sourceMappingURL=call_history.service.js.map