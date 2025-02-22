"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const broadcast_settings_service_1 = require("./broadcast_settings.service");
const mongoose_1 = require("@nestjs/mongoose");
const broadcast_setting_entity_1 = require("./entities/broadcast_setting.entity");
let BroadcastSettingsModule = class BroadcastSettingsModule {
};
BroadcastSettingsModule = __decorate([
    (0, common_1.Module)({
        providers: [broadcast_settings_service_1.BroadcastSettingsService],
        exports: [broadcast_settings_service_1.BroadcastSettingsService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "broadcast_settings",
                    schema: broadcast_setting_entity_1.BroadcastSettingSchema
                }]),
        ]
    })
], BroadcastSettingsModule);
exports.BroadcastSettingsModule = BroadcastSettingsModule;
//# sourceMappingURL=broadcast_settings.module.js.map