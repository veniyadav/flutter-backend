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
import { FilterQuery, Model, QueryOptions } from "mongoose";
import { BaseRoomService } from 'src/core/common/base.room.service';
import { IGroupSettings } from "./entities/group_setting.entity";
export declare class GroupSettingsService extends BaseRoomService<IGroupSettings> {
    private readonly model;
    constructor(model: Model<IGroupSettings>);
    create(obj: Partial<IGroupSettings>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IGroupSettings>): Promise<any>;
    findAll(filter?: FilterQuery<IGroupSettings> | undefined, select?: string | null | undefined, options?: QueryOptions<IGroupSettings> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IGroupSettings> & IGroupSettings & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<IGroupSettings | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IGroupSettings> | any): Promise<any>;
    updateMany(filter: FilterQuery<IGroupSettings>, update: Partial<IGroupSettings>, options?: QueryOptions<IGroupSettings> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IGroupSettings>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IGroupSettings> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IGroupSettings> & IGroupSettings & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IGroupSettings>): Promise<any>;
    findOne(filter: FilterQuery<IGroupSettings>, select: string | null | undefined): Promise<IGroupSettings | null>;
    createMany(obj: Array<Partial<IGroupSettings>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IGroupSettings>, update: Partial<IGroupSettings>, session?: any, options?: QueryOptions<IGroupSettings> | null | undefined): Promise<IGroupSettings | null>;
    findCount(filter?: FilterQuery<IGroupSettings>): Promise<number>;
}
