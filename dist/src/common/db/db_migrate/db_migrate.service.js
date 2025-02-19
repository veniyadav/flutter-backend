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
exports.DbMigrateService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const app_config_service_1 = require("../../../api/app_config/app_config.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const app_root_path_1 = __importDefault(require("app-root-path"));
const utils_1 = require("../../../core/utils/utils");
const enums_1 = require("../../../core/utils/enums");
let DbMigrateService = class DbMigrateService {
    constructor(userService, appConfigService) {
        this.userService = userService;
        this.appConfigService = appConfigService;
        this._addUserPrivacy = async () => {
            await this.userService.updateMany({
                userPrivacy: { $eq: null }
            }, {
                userPrivacy: {
                    startChat: enums_1.UserPrivacyTypes.ForReq,
                    publicSearch: true,
                    showStory: enums_1.UserPrivacyTypes.ForReq,
                    lastSeen: true,
                }
            });
            console.log("_addUserPrivacy has been added");
        };
    }
    async _startMigrate() {
        let rawData = fs_1.default.readFileSync((0, path_1.join)(app_root_path_1.default.path, "package.json"), "utf8");
        let packageOfJson = JSON.parse(rawData);
        let newVersion = packageOfJson.version;
        let config = await this.appConfigService.getConfig();
        if (newVersion.toString() != config.backendVersion.toString()) {
            await this._migrateFromVersion1To2(newVersion);
        }
    }
    async _migrateFromVersion1To2(newVersion) {
        await this._addUniqueIdForUsers();
        await this._addUserPrivacy();
        let config = await this.appConfigService.getConfig();
        await this.appConfigService.insert({
            ...config,
            backendVersion: newVersion,
            _id: (0, utils_1.newMongoObjId)().toString()
        });
        console.log("Done the _migrateFromVersion1To2");
    }
    async _addUniqueIdForUsers() {
        let count = 0;
        let users = await this.userService.findAll({
            uniqueCode: { $eq: null }
        }, "_id");
        for (let user of users) {
            let code = await this.generateUniqueCode();
            await this.userService.findByIdAndUpdate(user._id, {
                uniqueCode: code
            });
            count++;
        }
        console.log("uniqueCode Added for " + count);
    }
    async generateUniqueCode() {
        let uniqueCode;
        let isUnique = false;
        while (!isUnique) {
            uniqueCode = Math.floor(100000 + Math.random() * 900000);
            let existingUser = await this.userService.findOne({
                uniqueCode: uniqueCode
            }, "uniqueCode");
            if (!existingUser) {
                isUnique = true;
            }
        }
        return uniqueCode;
    }
    async _mergeBadge() {
        let count = 0;
        let users = await this.userService.findAll({
            hasBadge: true
        }, "_id roles");
        for (let user of users) {
            await this.userService.findByIdAndUpdate(user._id, {
                roles: [...user.roles, enums_1.UserRole.HasBadge]
            });
            count++;
        }
        console.log("_mergeBadge Added for " + count);
    }
};
DbMigrateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        app_config_service_1.AppConfigService])
], DbMigrateService);
exports.DbMigrateService = DbMigrateService;
//# sourceMappingURL=db_migrate.service.js.map