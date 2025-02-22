"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleRoomSettingsModule = void 0;
const common_1 = require("@nestjs/common");
const single_room_settings_service_1 = require("./single_room_settings.service");
const mongoose_1 = require("@nestjs/mongoose");
const single_room_setting_entity_1 = require("./entities/single_room_setting.entity");
let SingleRoomSettingsModule = class SingleRoomSettingsModule {
};
SingleRoomSettingsModule = __decorate([
    (0, common_1.Module)({
        providers: [single_room_settings_service_1.SingleRoomSettingsService],
        exports: [single_room_settings_service_1.SingleRoomSettingsService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "single_room_settings",
                    schema: single_room_setting_entity_1.SingleRoomSettings
                }]),
        ]
    })
], SingleRoomSettingsModule);
exports.SingleRoomSettingsModule = SingleRoomSettingsModule;
//# sourceMappingURL=single_room_settings.module.js.map