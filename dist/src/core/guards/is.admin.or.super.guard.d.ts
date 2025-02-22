import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class IsSuperAdminGuard implements CanActivate {
    readonly config: ConfigService;
    constructor(config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
