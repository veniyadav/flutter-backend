import { AuthService } from './auth.service';
import RegisterDto from "./dto/register.dto";
import LoginDto from "./dto/login.dto";
import LogoutDto from "./dto/logout.dto";
import ResetPasswordDto from "./dto/reset.password.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto, ipAddress: any, isDev: boolean): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    registerUser(req: any, dto: RegisterDto, ipAddress: any, file?: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    sendOtpResetPassword(email: string, isDv: boolean): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    logOut(dto: LogoutDto, req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    verifyOtpResetPassword(dto: ResetPasswordDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
