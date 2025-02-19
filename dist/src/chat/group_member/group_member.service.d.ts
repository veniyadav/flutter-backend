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
import { IGroupMember } from "./entities/group_member.entity";
import { BaseRoomService } from "../../core/common/base.room.service";
export declare class GroupMemberService extends BaseRoomService<IGroupMember> {
    private readonly model;
    constructor(model: PaginateModel<IGroupMember>);
    create(obj: Partial<IGroupMember>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IGroupMember>): Promise<any>;
    findAll(filter?: FilterQuery<IGroupMember> | undefined, select?: string | null | undefined, options?: QueryOptions<IGroupMember> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IGroupMember> & IGroupMember & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(id: string, select?: string | null | undefined): Promise<IGroupMember | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IGroupMember> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IGroupMember>, update: Partial<IGroupMember> | any, options?: QueryOptions<IGroupMember> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IGroupMember>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IGroupMember> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IGroupMember> & IGroupMember & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IGroupMember>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IGroupMember>): Promise<any>;
    findOne(filter: FilterQuery<IGroupMember>, select?: string | null | undefined): Promise<IGroupMember | null>;
    findByRoomIdAndUserIdAndUpdate(roomId: string, userId: string, update: Partial<IGroupMember>, session?: any, options?: QueryOptions<IGroupMember> | null | undefined): Promise<IGroupMember>;
    createMany(obj: Array<Partial<IGroupMember>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IGroupMember>, update: Partial<IGroupMember>, session?: any, options?: QueryOptions<IGroupMember> | null | undefined): Promise<IGroupMember | null>;
    getMembersCount(rId: string): Promise<number>;
    deleteOne(filter: FilterQuery<IGroupMember>): Promise<any>;
    findCount(filter: FilterQuery<IGroupMember>, options?: QueryOptions<IGroupMember>): Promise<number>;
    paginate(paginationParameters: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IGroupMember> & IGroupMember & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
