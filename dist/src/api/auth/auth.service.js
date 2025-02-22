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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const date_and_time_1 = __importDefault(require("date-and-time"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user_modules/user/user.service");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const remove_accents_1 = require("remove-accents");
const user_device_service_1 = require("../user_modules/user_device/user_device.service");
const app_config_service_1 = require("../app_config/app_config.service");
const class_validator_1 = require("class-validator");
const config_1 = require("@nestjs/config");
const user_country_service_1 = require("../user_modules/user_country/user_country.service");
const enums_1 = require("../../core/utils/enums");
const res_helpers_1 = require("../../core/utils/res.helpers");
const utils_1 = require("../../core/utils/utils");
const file_uploader_service_1 = require("../../common/file_uploader/file_uploader.service");
const notification_emitter_service_1 = require("../../common/notification_emitter/notification_emitter.service");
const mail_emitter_service_1 = require("../mail/mail.emitter.service");
let AuthService = class AuthService {
    constructor(uploaderService, jwtService, userService, appConfigService, configService, userDevice, mailEmitterService, userCountryService, notificationEmitterService) {
        this.uploaderService = uploaderService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.appConfigService = appConfigService;
        this.configService = configService;
        this.userDevice = userDevice;
        this.mailEmitterService = mailEmitterService;
        this.userCountryService = userCountryService;
        this.notificationEmitterService = notificationEmitterService;
    }
    async comparePassword(dtoPassword, dbHasPassword) {
        let bcryptRes = await bcrypt_1.default.compare(dtoPassword, dbHasPassword);
        if (!bcryptRes) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.invalidLoginDataString);
        }
        return true;
    }
    async login(dto, isDev) {
        let foundedUser = await this.userService.findOneByEmailOrThrow(dto.email, "+password userDevice lastMail banTo email registerStatus deletedAt");
        let isactive = await this.userService.findOne({ isactive: dto.isactive === false }, "isActive");
        if (isactive) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.userNotActivated);
        }
        await this.comparePassword(dto.password, foundedUser.password);
        if (foundedUser.banTo) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.yourAccountBlockedString);
        }
        let countryData = await geoip_lite_1.default.lookup(dto.ip);
        let countryId;
        if (countryData) {
            countryId = await this.userCountryService.setUserCountry(foundedUser._id, countryData.country);
        }
        await this.userService.findByIdAndUpdate(foundedUser._id, {
            address: countryData,
            countryId: countryId
        });
        let oldDevice = await this.userDevice.findOne({
            uId: foundedUser._id,
            userDeviceId: dto.deviceId
        });
        if (oldDevice) {
            await this.userDevice.findByIdAndUpdate(oldDevice._id, {
                pushProvider: this._getVPushProvider(dto.pushKey),
                pushKey: dto.pushKey
            });
            let access = this._signJwt(foundedUser._id.toString(), oldDevice._id.toString());
            return (0, res_helpers_1.resOK)({
                "accessToken": access,
                "status": foundedUser.registerStatus
            });
        }
        let mongoDeviceId = (0, utils_1.newMongoObjId)().toString();
        let access = this._signJwt(foundedUser._id.toString(), mongoDeviceId);
        await this.userDevice.create({
            _id: mongoDeviceId,
            userDeviceId: dto.deviceId,
            uId: foundedUser._id,
            language: dto.language,
            platform: dto.platform,
            pushProvider: this._getVPushProvider(dto.pushKey),
            dIp: dto.ip,
            deviceInfo: dto.deviceInfo,
            pushKey: dto.pushKey
        });
        await this._pushNotificationSubscribe(dto.pushKey, dto.platform);
        return (0, res_helpers_1.resOK)({
            "accessToken": access,
            "status": foundedUser.registerStatus
        });
    }
    async register(dto) {
        let countryData = await geoip_lite_1.default.lookup(dto.ip);
        let foundedUser = await this.userService.findOneByEmail(dto.email, "email");
        if (foundedUser) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.userAlreadyRegisterString);
        }
        const uniqueCode = await this.generateUniqueCode();
        let appConfig = await this.appConfigService.getConfig();
        let createdUser = await this.userService.create({
            email: dto.email,
            fullName: dto.fullName,
            registerStatus: appConfig.userRegisterStatus,
            bio: null,
            uniqueCode: uniqueCode,
            fullNameEn: (0, remove_accents_1.remove)(dto.fullName),
            registerMethod: dto.method,
            address: countryData,
            password: dto.password,
            lastSeenAt: new Date(),
            lastMail: {},
            userImage: appConfig.userIcon
        });
        if (countryData) {
            let countryId = await this.userCountryService.setUserCountry(createdUser._id, countryData.country);
            await this.userService.findByIdAndUpdate(createdUser._id, {
                countryId
            });
        }
        let accessToken = await this.deleteDevicesAndCreateNew({
            userId: createdUser._id,
            session: null,
            language: dto.language,
            platform: dto.platform,
            ip: dto.ip,
            deviceInfo: dto.deviceInfo,
            pushKey: dto.pushKey,
            userDeviceId: dto.deviceId
        });
        if (dto.imageBuffer) {
            let res = await this.uploaderService.putImageCropped(dto.imageBuffer, createdUser._id);
            await this.userService.findByIdAndUpdate(createdUser._id, {
                userImage: res
            });
        }
        let config = await this.appConfigService.getConfig();
        await this._pushNotificationSubscribe(dto.pushKey, dto.platform);
        console.log(config);
        return {
            accessToken: accessToken,
            "status": "accepted"
        };
    }
    async sendOtpResetPassword(email, isDev) {
        let usr = await this.userService.findOneByEmailOrThrow(email.toLowerCase(), "email fullName userImages verifiedAt lastMail");
        let code = await this.mailEmitterService.sendConfirmEmail(usr, enums_1.MailType.ResetPassword, isDev);
        await this.userService.findByIdAndUpdate(usr._id, {
            lastMail: {
                type: enums_1.MailType.ResetPassword,
                sendAt: new Date(),
                code: code,
                expired: false
            }
        });
        if (isDev) {
            return "Password reset code has been send to your email " + code;
        }
        return "Password reset code has been send to your email";
    }
    async verifyOtpResetPassword(dto) {
        let user = await this.userService.findOneByEmailOrThrow(dto.email, "lastMail");
        if (!user.lastMail || !user.lastMail.code) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.noCodeHasBeenSendToYouToVerifyYourEmailString);
        }
        let appConfig = await this.appConfigService.getConfig();
        let min = parseInt(date_and_time_1.default.subtract(new Date(), user.lastMail.sendAt).toMinutes().toString(), 10);
        if (user.lastMail.expired || min > appConfig.maxExpireEmailTime) {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.codeHasBeenExpiredString);
        }
        if (user.lastMail.type != enums_1.MailType.ResetPassword) {
            throw new common_1.BadRequestException("Cant process with the mail type");
        }
        if (user.lastMail.code == dto.code) {
            await this.userService.findByIdAndUpdate(user._id, {
                "lastMail.expired": true,
                "password": dto.newPassword
            });
            return "Password has been reset successfully";
        }
        else {
            throw new common_1.BadRequestException(res_helpers_1.i18nApi.invalidCodeString);
        }
    }
    async getVerifiedUser(accessToken) {
        let jwtDecodeRes = this._jwtVerify(accessToken);
        let user = await this.userService.findById(jwtDecodeRes.userId, "fullName fullNameEn verifiedAt userImage userType banTo deletedAt registerStatus");
        if (!user)
            throw new common_1.ForbiddenException(res_helpers_1.i18nApi.whileAuthCanFindYouString);
        user._id = user._id.toString();
        this.userLoginValidate(user);
        let device = await this.userDevice.findById(jwtDecodeRes.deviceId, "_id platform");
        if (!device)
            throw new common_1.HttpException(res_helpers_1.i18nApi.userDeviceSessionEndDeviceDeletedString, 450);
        user.currentDevice = device;
        return user;
    }
    async logOut(dto) {
        if (dto.logoutFromAll == true) {
            let foundedUser = await this.userService.findById(dto.myUser._id, "+password userDevice verifiedAt lastMail banTo email registerStatus");
            let bcryptRes = await bcrypt_1.default.compare(dto.password, foundedUser.password);
            if (!bcryptRes) {
                throw new common_1.BadRequestException(res_helpers_1.i18nApi.invalidLoginDataString);
            }
            await this.userDevice.deleteMany({
                uId: dto.myUser._id
            });
            return res_helpers_1.i18nApi.deviceHasBeenLogoutFromAllDevicesString;
        }
        await this.userDevice.findByIdAndDelete(dto.myUser.currentDevice._id);
        return "Device has been logout";
    }
    async sendMailToUser(user, mailType, isDev, session) {
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
    userLoginValidate(user) {
        if (user.banTo)
            throw new common_1.HttpException(res_helpers_1.i18nApi.yourAccountBlockedString, 450);
        if (user.deletedAt)
            throw new common_1.HttpException(res_helpers_1.i18nApi.yourAccountDeletedString, 450);
    }
    _signJwt(userId, deviceId) {
        return this.jwtService.sign({
            id: userId.toString(), deviceId: deviceId.toString(), accessType: enums_1.AccessTokenType.Access
        });
    }
    async deleteDevicesAndCreateNew(dto) {
        await this.userDevice.deleteMany({
            uId: dto.userId
        });
        let mongoDeviceId = (0, utils_1.newMongoObjId)().toString();
        let access = this._signJwt(dto.userId, mongoDeviceId);
        await this.userDevice.create({
            _id: mongoDeviceId,
            uId: dto.userId,
            dIp: dto.ip,
            pushProvider: this._getVPushProvider(dto.pushKey),
            pushKey: dto.pushKey,
            userDeviceId: dto.userDeviceId,
            lastSeenAt: new Date(),
            deviceInfo: dto.deviceInfo,
            language: dto.language,
            platform: dto.platform
        }, dto.session);
        return access;
    }
    _jwtVerify(token) {
        try {
            let payload = this.jwtService.verify(token);
            return {
                deviceId: payload["deviceId"],
                userId: payload["id"]
            };
        }
        catch (err) {
            throw new common_1.BadRequestException("Jwt access token not valid " + token);
        }
    }
    _getVPushProvider(pushKey) {
        if (!pushKey)
            return null;
        let isOneSignal = (0, class_validator_1.isUUID)(pushKey.toString());
        return isOneSignal ? enums_1.VPushProvider.onesignal : enums_1.VPushProvider.fcm;
    }
    async _pushNotificationSubscribe(pushKey, platform) {
        if (!pushKey) {
            return;
        }
        if (this._getVPushProvider(pushKey) == enums_1.VPushProvider.fcm) {
            if (platform == enums_1.Platform.Android) {
                await this.notificationEmitterService.subscribeFcmTopic(pushKey, enums_1.PushTopics.AdminAndroid);
            }
            if (platform == enums_1.Platform.Ios) {
                await this.notificationEmitterService.subscribeFcmTopic(pushKey, enums_1.PushTopics.AdminIos);
            }
        }
        else {
            if (platform == enums_1.Platform.Android) {
                await this.notificationEmitterService.subscribeOnesignalTopic(pushKey, enums_1.PushTopics.AdminAndroid);
            }
            if (platform == enums_1.Platform.Ios) {
                await this.notificationEmitterService.subscribeOnesignalTopic(pushKey, enums_1.PushTopics.AdminIos);
            }
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_uploader_service_1.FileUploaderService,
        jwt_1.JwtService,
        user_service_1.UserService,
        app_config_service_1.AppConfigService,
        config_1.ConfigService,
        user_device_service_1.UserDeviceService,
        mail_emitter_service_1.MailEmitterService,
        user_country_service_1.UserCountryService,
        notification_emitter_service_1.NotificationEmitterService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map