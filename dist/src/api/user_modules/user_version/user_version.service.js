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
exports.UserVersionService = void 0;
const common_1 = require("@nestjs/common");
const user_device_service_1 = require("../user_device/user_device.service");
const versions_service_1 = require("../../versions/versions.service");
const preload_1 = __importDefault(require("semver/preload"));
let UserVersionService = class UserVersionService {
    constructor(versionsService, userDevice) {
        this.versionsService = versionsService;
        this.userDevice = userDevice;
    }
    async checkVersion(dto) {
        let clientSemVer = dto.semVer.split("+")[0];
        let latestVersion = await this.versionsService.findOne({
            platform: dto.myUser.currentDevice.platform
        }, null, { sort: "-_id" });
        if (!latestVersion) {
            throw new common_1.BadRequestException("latestVersion not found");
        }
        let serverSemVer = latestVersion.semVer;
        let isBigger = preload_1.default.gt(clientSemVer, serverSemVer);
        let isEqu = serverSemVer === clientSemVer;
        let res = {
            isNeedUpdates: false,
            isCritical: latestVersion.critical,
            clientVersion: dto.semVer,
            notes: latestVersion.notes,
            serverVersion: latestVersion.semVer,
            platform: latestVersion.platform
        };
        if (isBigger || isEqu) {
            return res;
        }
        await this.userDevice.findByIdAndUpdate(dto.myUser.currentDevice._id, {
            clintVersion: clientSemVer
        });
        return {
            ...res,
            isNeedUpdates: true
        };
    }
};
UserVersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [versions_service_1.VersionsService,
        user_device_service_1.UserDeviceService])
], UserVersionService);
exports.UserVersionService = UserVersionService;
//# sourceMappingURL=user_version.service.js.map