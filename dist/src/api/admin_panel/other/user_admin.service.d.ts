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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { UserService } from "../../user_modules/user/user.service";
import { SocketIoService } from "../../../chat/socket_io/socket_io.service";
import { UserDeviceService } from "../../user_modules/user_device/user_device.service";
export declare class UserAdminService {
    private readonly userService;
    private readonly socket;
    private readonly userDeviceService;
    constructor(userService: UserService, socket: SocketIoService, userDeviceService: UserDeviceService);
    getUsers(dto: Object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../../user_modules/user/entities/user.entity").IUser> & import("../../user_modules/user/entities/user.entity").IUser & Required<{
        _id: string;
    }>>>;
    getUsersData(): Promise<{
        totalUsersCount: number;
        deleted: number;
        banned: number;
        allVerifiedUsersCount: number;
        userStatusCounter: {
            accepted: number;
            pending: number;
            notAccepted: number;
        };
        online: number;
    }>;
    updateUserData(id: string, body: object): Promise<void>;
    getUsersLog(): Promise<any[]>;
}
