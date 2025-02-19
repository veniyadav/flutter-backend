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
exports.UserStoryController = void 0;
const common_1 = require("@nestjs/common");
const user_story_service_1 = require("./user_story.service");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const story_dto_1 = require("./dto/story.dto");
const platform_express_1 = require("@nestjs/platform-express");
const mongo_id_dto_1 = require("../../../core/common/dto/mongo.id.dto");
const utils_1 = require("../../../core/utils/utils");
const app_validator_1 = require("../../../core/utils/app.validator");
let UserStoryController = class UserStoryController {
    constructor(userStoryService) {
        this.userStoryService = userStoryService;
    }
    async create(dto, req, file) {
        dto.myUser = req.user;
        if (!dto.isText()) {
            dto._mediaFile = file[0];
            dto._secondMediaFile = file[1] ?? undefined;
        }
        if (dto.somePeople) {
            try {
                dto.somePeople = (0, app_validator_1.jsonDecoder)(dto.somePeople);
            }
            catch (e) {
            }
            for (let id of dto.somePeople) {
                let isValid = (0, utils_1.isValidMongoId)(id);
                if (!isValid) {
                    throw new common_1.BadRequestException("id " + id + " not valid mongodb id");
                }
            }
        }
        else {
            dto.somePeople = [];
        }
        if (dto.exceptPeople) {
            try {
                dto.exceptPeople = (0, app_validator_1.jsonDecoder)(dto.exceptPeople);
            }
            catch (e) {
            }
            for (let id of dto.exceptPeople) {
                let isValid = (0, utils_1.isValidMongoId)(id);
                if (!isValid) {
                    throw new common_1.BadRequestException("id " + id + " not valid mongodb id");
                }
            }
        }
        else {
            dto.somePeople = [];
        }
        return (0, res_helpers_1.resOK)(await this.userStoryService.create(dto));
    }
    async findAll(req, dto) {
        return (0, res_helpers_1.resOK)(await this.userStoryService.findAll(req.user._id, dto));
    }
    async myStories(req) {
        return (0, res_helpers_1.resOK)(await this.userStoryService.myStories(req.user._id));
    }
    async delete(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userStoryService.remove(dto));
    }
    async addView(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userStoryService.addView(dto));
    }
    async getView(dto, req, queryData) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userStoryService.getView(dto, queryData));
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 4, {
        limits: {
            files: 4,
            fields: 10,
            fieldSize: 1 * 1024 * 1024,
            fieldNameSize: 255,
        },
    })),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [story_dto_1.CreateStoryDto, Object, Array]),
    __metadata("design:returntype", Promise)
], UserStoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserStoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("/me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserStoryController.prototype, "myStories", null);
__decorate([
    (0, common_1.Delete)("/:id"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_id_dto_1.MongoIdDto, Object]),
    __metadata("design:returntype", Promise)
], UserStoryController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("/views/:id"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_id_dto_1.MongoIdDto, Object]),
    __metadata("design:returntype", Promise)
], UserStoryController.prototype, "addView", null);
__decorate([
    (0, common_1.Get)("/views/:id"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_id_dto_1.MongoIdDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserStoryController.prototype, "getView", null);
UserStoryController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)('user-story'),
    __metadata("design:paramtypes", [user_story_service_1.UserStoryService])
], UserStoryController);
exports.UserStoryController = UserStoryController;
//# sourceMappingURL=user_story.controller.js.map