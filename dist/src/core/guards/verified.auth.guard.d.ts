import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "../../api/auth/auth.service";
export declare class VerifiedAuthGuard implements CanActivate {
    private readonly authService;
    constructor(authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
