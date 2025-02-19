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
exports.UserAdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const remove_accents_1 = require("remove-accents");
const user_service_1 = require("../../user_modules/user/user.service");
const enums_1 = require("../../../core/utils/enums");
const socket_io_service_1 = require("../../../chat/socket_io/socket_io.service");
const user_device_service_1 = require("../../user_modules/user_device/user_device.service");
let UserAdminService = class UserAdminService {
    constructor(userService, socket, userDeviceService) {
        this.userService = userService;
        this.socket = socket;
        this.userDeviceService = userDeviceService;
    }
    async getUsers(dto) {
        let filter = {};
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 30,
                page: 1,
                ...dto,
                select: "-password -userDevice", populate: "countryId",
            }
        }).get();
        if (paginationParameters[1].page <= 0) {
            paginationParameters[1].page = 1;
        }
        if (paginationParameters[1].limit <= 0 || paginationParameters[1].limit >= 100) {
            paginationParameters[1].limit = 100;
        }
        let fullName = dto["fullName"];
        if (fullName) {
            filter = {
                ...filter,
                fullName: {
                    "$regex": ".*" + (0, remove_accents_1.remove)(fullName) + ".*",
                    "$options": "i",
                }
            };
        }
        paginationParameters[0] = filter;
        return await this.userService.fullPaginateModel(paginationParameters);
    }
    async getUsersData() {
        return {
            "totalUsersCount": await this.userService.findCount(),
            "deleted": await this.userService.findCount({
                deletedAt: { $ne: null }
            }),
            "banned": await this.userService.findCount({
                banTo: { $ne: null }
            }),
            "allVerifiedUsersCount": await this.userService.findCount({
                verifiedAt: { $ne: null }
            }),
            "userStatusCounter": {
                "accepted": await this.userService.findCount({
                    registerStatus: { $eq: enums_1.RegisterStatus.accepted }
                }),
                "pending": await this.userService.findCount({
                    registerStatus: { $eq: enums_1.RegisterStatus.pending }
                }),
                "notAccepted": await this.userService.findCount({
                    registerStatus: { $eq: enums_1.RegisterStatus.notAccepted }
                })
            },
            "online": await this.socket.getOnlineSocketsNumber()
        };
    }
    async updateUserData(id, body) {
        await this.userService.findByIdAndUpdate(id, body);
    }
    async getUsersLog() {
        let res = [];
        let users = await this.userService.findAll({}, "fullName userImage bio createdAt lastSeenAt", {
            sort: "-_id",
            limit: 70,
            lean: true
        });
        for (let u of users) {
            let device = await this.userDeviceService.findOne({
                uId: u._id
            }, "platform", {
                sort: "_id"
            });
            res.push({ ...u, "platform": device.platform });
        }
        return res;
    }
};
UserAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        socket_io_service_1.SocketIoService,
        user_device_service_1.UserDeviceService])
], UserAdminService);
exports.UserAdminService = UserAdminService;
//# sourceMappingURL=user_admin.service.js.map