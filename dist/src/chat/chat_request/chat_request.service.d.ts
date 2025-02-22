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
import { IChatRequest } from "./entities/chat.request.entity";
import { BaseService } from "../../core/common/base.service";
export declare class ChatRequestService extends BaseService<IChatRequest> {
    private readonly model;
    constructor(model: PaginateModel<IChatRequest>);
    create(obj: Partial<IChatRequest>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IChatRequest>): Promise<any>;
    deleteOne(filter: FilterQuery<IChatRequest>): Promise<any>;
    findAll(filter?: FilterQuery<IChatRequest> | undefined, select?: string | null | undefined, options?: QueryOptions<IChatRequest> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IChatRequest> & IChatRequest & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string): Promise<IChatRequest | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IChatRequest>): Promise<any>;
    updateMany(filter: FilterQuery<IChatRequest>, update: UpdateQuery<IChatRequest>, options?: QueryOptions<IChatRequest> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IChatRequest>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IChatRequest> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IChatRequest> & IChatRequest & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IChatRequest>): Promise<any>;
    findOne(filter: FilterQuery<IChatRequest>, select?: string, options?: QueryOptions<IChatRequest>): Promise<IChatRequest | null>;
    createMany(obj: Array<Partial<IChatRequest>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IChatRequest>, update: UpdateQuery<IChatRequest>, session?: any, options?: QueryOptions<IChatRequest>): Promise<IChatRequest | null>;
    findCount(filter: FilterQuery<IChatRequest>, session?: any): Promise<any>;
    aggregate(stages: any[]): Promise<any>;
    paginate(paginationParameters: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IChatRequest> & IChatRequest & Required<{
        _id: string;
    }>>>;
    aggregateV2(stages: any[], page: number, limit: number): Promise<any>;
}
