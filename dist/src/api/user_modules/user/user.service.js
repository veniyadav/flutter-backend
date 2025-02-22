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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const user_device_service_1 = require("../user_device/user_device.service");
const utils_1 = require("../../../core/utils/utils");
const base_service_1 = require("../../../core/common/base.service");
const remove_accents_1 = require("remove-accents");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const enums_1 = require("../../../core/utils/enums");
let UserService = class UserService extends base_service_1.BaseService {
    constructor(model, userDevice) {
        super();
        this.model = model;
        this.userDevice = userDevice;
    }
    createMany(obj, session) {
        return Promise.resolve(this.model.create(obj, { session }));
    }
    aggregate(obj, session) {
        return Promise.resolve(this.model.aggregate(obj, { session }));
    }
    async findOneByEmail(email, select) {
        return this.model.findOne({ email: email }).select(select).lean();
    }
    async findOneByEmailOrThrow(email, select) {
        let usr = await this.model.findOne({ email: email }).select(select).lean();
        if (!usr)
            throw new common_1.NotFoundException(res_helpers_1.i18nApi.userEmailNotFound);
        return usr;
    }
    async setLastSeenAt(_id) {
        await this.model.findByIdAndUpdate(_id, {
            lastSeenAt: new Date()
        });
    }
    async findByIds(usersIds, select) {
        return this.model.find({ _id: { $in: usersIds } }, select).lean();
    }
    findById(id, select, options) {
        if (!(0, utils_1.isValidMongoId)(id)) {
            throw new common_1.BadRequestException("NOT VALID MONGO DB OBJECT " + id);
        }
        return Promise.resolve(this.model.findById(id, select, options).lean());
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
        let user = await this.model.findById(id, select).lean();
        if (!user)
            throw new common_1.NotFoundException("User with id " + id + " Not exist in db");
        return user;
    }
    async findByIdAndUpdate(_id, update, session) {
        return this.model.findByIdAndUpdate(_id, update, { session });
    }
    async create(obj, session) {
        let cs = await this.model.create([obj], { session });
        return cs[0];
    }
    async searchV2(dto, notContains) {
        let filter = {
            _id: {
                $nin: notContains
            },
            deletedAt: {
                $eq: null
            },
            registerStatus: {
                $eq: enums_1.RegisterStatus.accepted
            },
            "userPrivacy.publicSearch": {
                $eq: true
            }
        };
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 30,
                sort: "-_id",
                ...filter,
                ...dto
            }
        }).get();
        if (paginationParameters[1].page <= 0) {
            paginationParameters[1].page = 1;
        }
        if (paginationParameters[1].limit <= 0 || paginationParameters[1].limit >= 50) {
            paginationParameters[1].limit = 30;
        }
        paginationParameters[1].select = "fullName fullNameEn userImage bio createdAt isPrime roles hasBadge";
        let fullName = dto["fullName"];
        if (fullName) {
            filter = {
                ...filter,
                fullNameEn: {
                    "$regex": ".*" + (0, remove_accents_1.remove)(fullName) + ".*",
                    "$options": "i"
                }
            };
        }
        paginationParameters[0] = filter;
        return this.model.paginate(...paginationParameters);
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
    findOne(filter, select) {
        return Promise.resolve(this.model.findOne(filter, select));
    }
    findOneAndUpdate(filter, update, session, options) {
        return Promise.resolve(this.model.findOneAndUpdate(filter, update, options).session(session));
    }
    async paginateModel(filter, options) {
        return this.model.paginate(filter, options);
    }
    async fullPaginateModel(p) {
        return this.model.paginate(...p);
    }
    async findCount(filter) {
        return this.model.countDocuments(filter);
    }
    async _addIsPrime() {
        await this.model.updateMany({}, {
            isPrime: false,
            hasBadge: false,
            roles: []
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("user")),
    __metadata("design:paramtypes", [Object, user_device_service_1.UserDeviceService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map