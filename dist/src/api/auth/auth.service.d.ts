import LoginDto from "./dto/login.dto";
import RegisterDto from "./dto/register.dto";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user_modules/user/user.service";
import { UserDeviceService } from "../user_modules/user_device/user_device.service";
import { IUser } from "../user_modules/user/entities/user.entity";
import { AppConfigService } from "../app_config/app_config.service";
import { ConfigService } from "@nestjs/config";
import { UserCountryService } from "../user_modules/user_country/user_country.service";
import ResetPasswordDto from "./dto/reset.password.dto";
import LogoutDto from "./dto/logout.dto";
import { FileUploaderService } from "../../common/file_uploader/file_uploader.service";
import { NotificationEmitterService } from "../../common/notification_emitter/notification_emitter.service";
import { MailEmitterService } from "../mail/mail.emitter.service";
export declare class AuthService {
    private readonly uploaderService;
    private readonly jwtService;
    private readonly userService;
    private readonly appConfigService;
    private readonly configService;
    private readonly userDevice;
    private readonly mailEmitterService;
    private readonly userCountryService;
    private readonly notificationEmitterService;
    constructor(uploaderService: FileUploaderService, jwtService: JwtService, userService: UserService, appConfigService: AppConfigService, configService: ConfigService, userDevice: UserDeviceService, mailEmitterService: MailEmitterService, userCountryService: UserCountryService, notificationEmitterService: NotificationEmitterService);
    comparePassword(dtoPassword: any, dbHasPassword: any): Promise<boolean>;
    login(dto: LoginDto, isDev: boolean): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        status: string;
    }>;
    sendOtpResetPassword(email: string, isDev: boolean): Promise<string>;
    verifyOtpResetPassword(dto: ResetPasswordDto): Promise<string>;
    getVerifiedUser(accessToken: string): Promise<IUser>;
    logOut(dto: LogoutDto): Promise<string>;
    private sendMailToUser;
    generateUniqueCode(): Promise<number>;
    private userLoginValidate;
    private _signJwt;
    private deleteDevicesAndCreateNew;
    private _jwtVerify;
    private _getVPushProvider;
    private _pushNotificationSubscribe;
}
