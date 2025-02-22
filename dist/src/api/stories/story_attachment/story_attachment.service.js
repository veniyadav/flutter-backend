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
exports.StoryAttachmentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const base_service_1 = require("../../../core/common/base.service");
const utils_1 = require("../../../core/utils/utils");
let StoryAttachmentService = class StoryAttachmentService extends base_service_1.BaseService {
    constructor(model) {
        super();
        this.model = model;
    }
    findById(id, select) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException("NOT VALID MONGO DB OBJECT " + id);
        }
        return Promise.resolve(this.model.findById(id, select).lean());
    }
    findByStoryId(id, select) {
        return Promise.resolve(this.model.findOne({ storyId: id }, select).lean());
    }
    findByIdAndDelete(id) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException("NOT VALID MONGO DB OBJECT " + id);
        }
        return Promise.resolve(this.model.findByIdAndRemove(id).lean());
    }
    async findByIdOrThrow(id, select, options) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException(" NOT VALID MONGO DB OBJECT " + id);
        }
        let q = await this.model.findById(id, select, options).lean();
        if (!q)
            throw new common_1.NotFoundException("IStoryAttachment text with id " + id + " Not exist in db");
        return q;
    }
    async findByIdAndUpdate(_id, update, session) {
        return this.model.findByIdAndUpdate(_id, update, { session });
    }
    async create(dto) {
        let cat = await this.model.create(dto);
        return this.findById(cat.id);
    }
    deleteMany(filter) {
        return Promise.resolve(undefined);
    }
    updateMany(filter, update, options) {
        return Promise.resolve(this.model.updateMany(filter, update, options));
    }
    findAll(filter, select, options) {
        return Promise.resolve(this.model.find(filter, select, options));
    }
    findOne(filter, select, options) {
        return Promise.resolve(this.model.findOne(filter, select, options));
    }
    findOneAndUpdate(filter, update, session, options) {
        return Promise.resolve(this.model.findOneAndUpdate(filter, update, options).session(session));
    }
    async findCount(filter) {
        return this.model.countDocuments(filter);
    }
    createMany(obj, session) {
        return Promise.resolve(undefined);
    }
    async paginateModel(p, options) {
        return this.model.paginate(...p);
    }
};
StoryAttachmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("story_attachment")),
    __metadata("design:paramtypes", [Object])
], StoryAttachmentService);
exports.StoryAttachmentService = StoryAttachmentService;
//# sourceMappingURL=story_attachment.service.js.map