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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionsAdminService = void 0;
const common_1 = require("@nestjs/common");
const versions_service_1 = require("../../versions/versions.service");
const preload_1 = __importDefault(require("semver/preload"));
let VersionsAdminService = class VersionsAdminService {
    constructor(versionsService) {
        this.versionsService = versionsService;
    }
    async setNewVersion(dto) {
        let v = await this.versionsService.findOne({
            semVer: dto.semVer,
            platform: dto.platform
        });
        if (v)
            throw new common_1.BadRequestException("Version already exists!");
        let last = await this.versionsService.findOne({
            platform: dto.platform
        }, null, { sort: "-_id" });
        let isSmall = preload_1.default.lt(dto.semVer, last.semVer);
        if (isSmall) {
            throw new common_1.BadRequestException("the new version must bigger than the last version " + last.semVer);
        }
        if (dto.notify) {
        }
        await this.versionsService.create({
            semVer: dto.semVer,
            notes: dto.notes,
            platform: dto.platform,
            critical: dto.critical,
            notify: dto.notify
        });
        return "Updated";
    }
    async getVersions(platform) {
        return this.versionsService.findAll({
            platform: platform.platform
        }, null, {
            sort: "-_id"
        });
    }
    async deleteVersion(id) {
        await this.versionsService.findByIdAndDelete(id.id);
        return "deleted";
    }
};
VersionsAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [versions_service_1.VersionsService])
], VersionsAdminService);
exports.VersionsAdminService = VersionsAdminService;
//# sourceMappingURL=versions_admin.service.js.map