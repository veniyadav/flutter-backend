/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { Model } from "mongoose";
import { IAppConfig } from "./entities/app_config.entity";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user_modules/user/user.service";
export declare class AppConfigService {
    private readonly appConfig;
    private readonly config;
    private readonly userService;
    constructor(appConfig: Model<IAppConfig>, config: ConfigService, userService: UserService);
    getConfig(): Promise<IAppConfig>;
    insert(data: Partial<IAppConfig>): Promise<import("mongoose").Document<unknown, {}, IAppConfig> & IAppConfig & Required<{
        _id: string;
    }>>;
}
