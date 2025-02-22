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
exports.FirstRunService = void 0;
const common_1 = require("@nestjs/common");
const countries_service_1 = require("../../../api/countries/countries.service");
const user_service_1 = require("../../../api/user_modules/user/user.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const app_root_path_1 = __importDefault(require("app-root-path"));
const app_config_service_1 = require("../../../api/app_config/app_config.service");
const enums_1 = require("../../../core/utils/enums");
const versions_service_1 = require("../../../api/versions/versions.service");
const user_global_call_status_model_1 = require("../../../chat/call_modules/utils/user-global-call-status.model");
const call_history_service_1 = require("../../../chat/call_modules/call_history/call_history.service");
let FirstRunService = class FirstRunService {
    constructor(countriesService, userService, callHistoryService, appConfigService, versionsService) {
        this.countriesService = countriesService;
        this.userService = userService;
        this.callHistoryService = callHistoryService;
        this.appConfigService = appConfigService;
        this.versionsService = versionsService;
        this._start().then(r => {
        });
    }
    async _start() {
        let config = await this._setConfig();
        let country = await this._addCountries();
        let lastSeen = await this._setLastVersion();
        let admin = await this._insertAdmin();
        await this._closeAllCalls();
        if (country)
            console.log(country);
        if (config)
            console.log(config);
        if (lastSeen)
            console.log(lastSeen);
        if (admin)
            console.log(admin);
    }
    async _addCountries() {
        let count = await this.countriesService.estimatedDocumentCount();
        if (count == 0) {
            let rawData = fs_1.default.readFileSync((0, path_1.join)(app_root_path_1.default.path, "countries.json"), "utf8");
            let countries = JSON.parse(rawData);
            await this.countriesService.createMany(countries);
            return "All countries has been inserted";
        }
    }
    async _setConfig() {
        let oldConfig = await this.appConfigService.getConfig();
        if (!oldConfig) {
            let rawData = fs_1.default.readFileSync((0, path_1.join)(app_root_path_1.default.path, "package.json"), "utf8");
            let packageOfJson = JSON.parse(rawData);
            await this.appConfigService.insert({
                backendVersion: packageOfJson.version
            });
            return "new config has been set version is => 1";
        }
    }
    async _setLastVersion() {
        let oldVersion = await this.versionsService.findOne({}, null, { sort: "-_id" });
        if (!oldVersion) {
            for (const platform of Object.values(enums_1.Platform)) {
                await this.versionsService.create({
                    semVer: "1.0.0",
                    critical: false,
                    notes: "first version",
                    notify: false,
                    platform: platform
                });
            }
            return "Version 1.0.0 has been insert for all platforms";
        }
    }
    async _closeAllCalls() {
        await this.userService.updateMany({
            'userGlobalCallStatus.callerId': { $ne: null }
        }, { userGlobalCallStatus: user_global_call_status_model_1.UserGlobalCallStatus.createEmpty() });
        await this.callHistoryService.updateMany({
            callStatus: enums_1.CallStatus.Ring,
        }, {
            callStatus: enums_1.CallStatus.ServerRestart,
        });
    }
    async _insertAdmin() {
        let model = this.userService;
        let admin = await model.findOne({
            email: "admin@admin.com"
        }, null);
        if (!admin) {
            await model.create({
                email: "admin@admin.com",
                password: "admin",
                fullName: "Admin",
                registerMethod: enums_1.RegisterMethod.email,
                fullNameEn: "Admin",
                roles: [enums_1.UserRole.Admin, enums_1.UserRole.Prime],
                registerStatus: enums_1.RegisterStatus.accepted,
                verifiedAt: new Date(),
                uniqueCode: 100000,
                userPrivacy: {
                    startChat: enums_1.UserPrivacyTypes.ForReq,
                    publicSearch: false,
                    showStory: enums_1.UserPrivacyTypes.ForReq,
                    lastSeen: false,
                }
            });
            return "Super Admin admin@admin.com with password admin has been created !";
        }
    }
};
FirstRunService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [countries_service_1.CountriesService,
        user_service_1.UserService,
        call_history_service_1.CallHistoryService,
        app_config_service_1.AppConfigService,
        versions_service_1.VersionsService])
], FirstRunService);
exports.FirstRunService = FirstRunService;
//# sourceMappingURL=first_run.service.js.map