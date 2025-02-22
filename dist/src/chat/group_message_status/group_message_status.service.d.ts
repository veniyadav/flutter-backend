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
import { FilterQuery, PaginateModel, QueryOptions } from "mongoose";
import { IGroupMessageStatus } from "./entities/group_message_status.entity";
export declare class GroupMessageStatusService {
    private readonly model;
    constructor(model: PaginateModel<IGroupMessageStatus>);
    create(obj: Partial<IGroupMessageStatus>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IGroupMessageStatus>): Promise<any>;
    findAll(filter?: FilterQuery<IGroupMessageStatus> | undefined, select?: string | null | undefined, options?: QueryOptions<IGroupMessageStatus> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IGroupMessageStatus> & IGroupMessageStatus & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(id: string, select?: string | null | undefined): Promise<IGroupMessageStatus | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IGroupMessageStatus> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IGroupMessageStatus>, update: Partial<IGroupMessageStatus>, options?: QueryOptions<IGroupMessageStatus> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IGroupMessageStatus>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IGroupMessageStatus>): Promise<any>;
    findOne(filter: FilterQuery<IGroupMessageStatus>, select?: string | null | undefined, options?: QueryOptions<IGroupMessageStatus>): Promise<IGroupMessageStatus | null>;
    createMany(obj: Array<Partial<IGroupMessageStatus>>, session?: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IGroupMessageStatus>, update: Partial<IGroupMessageStatus>, session?: any, options?: QueryOptions<IGroupMessageStatus> | null | undefined): Promise<IGroupMessageStatus | null>;
    findCount(filter: FilterQuery<IGroupMessageStatus>, options?: QueryOptions<IGroupMessageStatus>): Promise<number>;
    paginate(params: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IGroupMessageStatus> & IGroupMessageStatus & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
