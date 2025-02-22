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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_dto_1 = __importDefault(require("./dto/register.dto"));
const login_dto_1 = __importDefault(require("./dto/login.dto"));
const request_ip_1 = require("../../core/custom.decorator/request.ip");
const decorators_1 = require("../../core/custom.decorator/decorators");
const app_validator_1 = require("../../core/utils/app.validator");
const upload_interceptors_1 = require("../../core/utils/upload_interceptors");
const res_helpers_1 = require("../../core/utils/res.helpers");
const logout_dto_1 = __importDefault(require("./dto/logout.dto"));
const verified_auth_guard_1 = require("../../core/guards/verified.auth.guard");
const reset_password_dto_1 = __importDefault(require("./dto/reset.password.dto"));
const v1_controller_decorator_1 = require("../../core/common/v1-controller.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(dto, ipAddress, isDev) {
        console.log("Received Login Request:", dto);
        dto.ip = ipAddress;
        try {
            dto.deviceInfo = (0, app_validator_1.jsonDecoder)(dto.deviceInfo);
        }
        catch (err) {
        }
        return this.authService.login(dto, isDev);
    }
    async registerUser(req, dto, ipAddress, file) {
        if (file) {
            dto.imageBuffer = file.buffer;
        }
        try {
            dto.deviceInfo = (0, app_validator_1.jsonDecoder)(dto.deviceInfo);
        }
        catch (err) {
        }
        dto.ip = ipAddress;
        return (0, res_helpers_1.resOK)(await this.authService.register(dto));
    }
    async sendOtpResetPassword(email, isDv) {
        if (!email) {
            throw new common_1.BadRequestException("Email is required");
        }
        return (0, res_helpers_1.resOK)(await this.authService.sendOtpResetPassword(email, isDv));
    }
    async logOut(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.authService.logOut(dto));
    }
    async verifyOtpResetPassword(dto) {
        return (0, res_helpers_1.resOK)(await this.authService.verifyOtpResetPassword(dto));
    }
};
__decorate([
    (0, common_1.Post)("/login"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, request_ip_1.IpAddress)()),
    __param(2, (0, decorators_1.IsDevelopment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.default, Object, Boolean]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("/register"),
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, request_ip_1.IpAddress)()),
    __param(3, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_dto_1.default, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, common_1.Post)("/send-otp-reset-password"),
    __param(0, (0, common_1.Body)("email")),
    __param(1, (0, decorators_1.IsDevelopment)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtpResetPassword", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Post)("/logout"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)("/verify-and-reset-password"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtpResetPassword", null);
AuthController = __decorate([
    (0, v1_controller_decorator_1.V1Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map