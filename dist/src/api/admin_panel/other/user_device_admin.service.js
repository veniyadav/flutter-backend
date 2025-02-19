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
exports.UserDeviceAdminService = void 0;
const common_1 = require("@nestjs/common");
const user_device_service_1 = require("../../user_modules/user_device/user_device.service");
const enums_1 = require("../../../core/utils/enums");
const utils_1 = require("../../../core/utils/utils");
let UserDeviceAdminService = class UserDeviceAdminService {
    constructor(userDeviceService) {
        this.userDeviceService = userDeviceService;
    }
    async getUsersDevicesInfo() {
        return {
            "all": await this.userDeviceService.findCount(),
            "web": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Web
            }),
            "ios": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Ios
            }),
            "mac": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Mac
            }),
            "windows": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Windows
            }),
            "linux": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Linux
            }),
            "android": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Android
            }),
            "other": await this.userDeviceService.findCount({
                platform: enums_1.Platform.Other
            })
        };
    }
    async getTotalVisits() {
        let data = await this.userDeviceService.aggregate([
            { $group: { _id: null, visits: { $sum: "$visits" } } }
        ]);
        if (data.length == 0) {
            return 0;
        }
        return data[0]['visits'];
    }
    async getUserVisits(id) {
        let data = await this.userDeviceService.aggregate([
            {
                $match: {
                    uId: (0, utils_1.newMongoObjId)(id.toString())
                }
            },
            { $group: { _id: null, visits: { $sum: "$visits" } } }
        ]);
        if (data.length == 0) {
            return 0;
        }
        return data[0]['visits'];
    }
    async getPlatformVisits(plt) {
        let data = await this.userDeviceService.aggregate([
            {
                $match: {
                    platform: plt
                }
            },
            {
                $group: { _id: null, visits: { $sum: "$visits" } }
            }
        ]);
        if (data.length == 0) {
            return 0;
        }
        return data[0]['visits'];
    }
};
UserDeviceAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_device_service_1.UserDeviceService])
], UserDeviceAdminService);
exports.UserDeviceAdminService = UserDeviceAdminService;
//# sourceMappingURL=user_device_admin.service.js.map