"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMiddlewareModule = void 0;
const common_1 = require("@nestjs/common");
const room_middleware_service_1 = require("./room_middleware.service");
const room_member_module_1 = require("../room_member/room_member.module");
const single_room_settings_module_1 = require("../single_room_settings/single_room_settings.module");
let RoomMiddlewareModule = class RoomMiddlewareModule {
};
RoomMiddlewareModule = __decorate([
    (0, common_1.Module)({
        providers: [room_middleware_service_1.RoomMiddlewareService],
        exports: [room_middleware_service_1.RoomMiddlewareService],
        imports: [
            room_member_module_1.RoomMemberModule,
            single_room_settings_module_1.SingleRoomSettingsModule,
        ]
    })
], RoomMiddlewareModule);
exports.RoomMiddlewareModule = RoomMiddlewareModule;
//# sourceMappingURL=room_middleware.module.js.map