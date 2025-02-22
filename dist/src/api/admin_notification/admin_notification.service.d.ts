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
import { FilterQuery, PaginateModel, QueryOptions, UpdateQuery } from "mongoose";
import { IAdminNotification } from "./entities/admin_notification.entity";
import { BaseService } from "../../core/common/base.service";
export declare class AdminNotificationService extends BaseService<IAdminNotification> {
    private readonly model;
    constructor(model: PaginateModel<IAdminNotification>);
    create(obj: Partial<IAdminNotification>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IAdminNotification>): Promise<any>;
    deleteOne(filter: FilterQuery<IAdminNotification>): Promise<any>;
    findAll(filter?: FilterQuery<IAdminNotification> | undefined, select?: string | null | undefined, options?: QueryOptions<IAdminNotification> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IAdminNotification> & IAdminNotification & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(id: string, select?: string): Promise<IAdminNotification | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IAdminNotification>): Promise<any>;
    updateMany(filter: FilterQuery<IAdminNotification>, update: UpdateQuery<IAdminNotification>, options?: QueryOptions<IAdminNotification> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IAdminNotification>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IAdminNotification> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IAdminNotification> & IAdminNotification & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IAdminNotification>): Promise<any>;
    findOne(filter: FilterQuery<IAdminNotification>, select?: string, options?: QueryOptions<IAdminNotification>): Promise<IAdminNotification | null>;
    createMany(obj: Array<Partial<IAdminNotification>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IAdminNotification>, update: UpdateQuery<IAdminNotification>, session?: any, options?: QueryOptions<IAdminNotification>): Promise<IAdminNotification | null>;
    findCount(filter: FilterQuery<IAdminNotification>, session?: any): Promise<any>;
    aggregate(stages: any[]): Promise<any>;
    paginate(paginationParameters: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IAdminNotification> & IAdminNotification & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
