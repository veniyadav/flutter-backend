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
import { IMeetMember } from "./entities/call_member.entity";
import { BaseService } from "../../../core/common/base.service";
export declare class CallMemberService extends BaseService<IMeetMember> {
    private readonly model;
    constructor(model: PaginateModel<IMeetMember>);
    create(obj: Partial<IMeetMember>, session?: any): Promise<any>;
    deleteMany(filter?: FilterQuery<IMeetMember>): Promise<any>;
    findAll(filter?: FilterQuery<IMeetMember> | undefined, select?: string | null | undefined, options?: QueryOptions<IMeetMember> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IMeetMember> & IMeetMember & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<IMeetMember | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IMeetMember> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IMeetMember>, update: Partial<IMeetMember>, options?: QueryOptions<IMeetMember> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IMeetMember>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IMeetMember> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IMeetMember> & IMeetMember & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IMeetMember>): Promise<any>;
    findOne(filter: FilterQuery<IMeetMember>, select?: string | null | undefined): Promise<IMeetMember | null>;
    createMany(obj: Array<Partial<IMeetMember>>, session?: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IMeetMember>, update: Partial<IMeetMember>, session?: any, options?: QueryOptions<IMeetMember> | null | undefined): Promise<IMeetMember | null>;
    findCount(filter?: FilterQuery<IMeetMember>): Promise<number>;
}
