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
import { IBroadcastMember } from "./entities/broadcast_member.entity";
import { BaseRoomService } from "../../core/common/base.room.service";
export declare class BroadcastMemberService extends BaseRoomService<IBroadcastMember> {
    private readonly model;
    constructor(model: PaginateModel<IBroadcastMember>);
    create(obj: Partial<IBroadcastMember>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IBroadcastMember>): Promise<any>;
    findAll(filter: FilterQuery<IBroadcastMember>, select?: string, options?: QueryOptions<IBroadcastMember>): Promise<(import("mongoose").Document<unknown, {}, IBroadcastMember> & IBroadcastMember & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<IBroadcastMember | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IBroadcastMember> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IBroadcastMember>, update: Partial<IBroadcastMember> | any, options?: QueryOptions<IBroadcastMember> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IBroadcastMember>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IBroadcastMember> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IBroadcastMember> & IBroadcastMember & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IBroadcastMember>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IBroadcastMember>): Promise<any>;
    findOne(filter: FilterQuery<IBroadcastMember>, select?: string | null | undefined): Promise<IBroadcastMember | null>;
    createMany(obj: Array<Partial<IBroadcastMember>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IBroadcastMember>, update: Partial<IBroadcastMember>, session?: any, options?: QueryOptions<IBroadcastMember> | null | undefined): Promise<IBroadcastMember | null>;
    getBroadcastMembersCount(bId: string): Promise<number>;
    deleteOne(filter: FilterQuery<IBroadcastMember>): Promise<any>;
    findCount(filter: FilterQuery<IBroadcastMember>, session?: any): Promise<any>;
    paginate(paginationParameters: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IBroadcastMember> & IBroadcastMember & Required<{
        _id: string;
    }>>>;
}
