"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("./app_config.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("../user_modules/user/user.module");
const app_config_entity_1 = require("./entities/app_config.entity");
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = __decorate([
    (0, common_1.Module)({
        providers: [app_config_service_1.AppConfigService],
        exports: [app_config_service_1.AppConfigService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "app_config",
                    schema: app_config_entity_1.AppConfigSchema
                }]),
            user_module_1.UserModule
        ]
    })
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=app_config.module.js.map