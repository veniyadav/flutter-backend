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
exports.IsSuperAdminGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let IsSuperAdminGuard = class IsSuperAdminGuard {
    constructor(config) {
        this.config = config;
    }
    async canActivate(context) {
        let password = this.config.getOrThrow("ControlPanelAdminPassword").toString();
        let passwordViewer = this.config.getOrThrow("ControlPanelAdminPasswordViewer");
        const request = context.switchToHttp().getRequest();
        const userPassword = request.headers["admin-key"].toString();
        console.log("userPassword", userPassword);
        console.log("password", password);
        if (userPassword != password && userPassword != passwordViewer) {
            throw new common_1.BadRequestException("admin-key header should be valid as on the .env");
        }
        request['isViewer'] = userPassword == passwordViewer;
        return true;
    }
};
IsSuperAdminGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], IsSuperAdminGuard);
exports.IsSuperAdminGuard = IsSuperAdminGuard;
//# sourceMappingURL=is.admin.or.super.guard.js.map