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
import { IBroadcastSetting } from "./entities/broadcast_setting.entity";
import { BaseRoomService } from "../../core/common/base.room.service";
export declare class BroadcastSettingsService extends BaseRoomService<IBroadcastSetting> {
    private readonly model;
    constructor(model: Model<IBroadcastSetting>);
    create(obj: Partial<IBroadcastSetting>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IBroadcastSetting>): Promise<any>;
    findAll(filter?: FilterQuery<IBroadcastSetting> | undefined, select?: string | null | undefined, options?: QueryOptions<IBroadcastSetting> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IBroadcastSetting> & IBroadcastSetting & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<IBroadcastSetting | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IBroadcastSetting> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IBroadcastSetting>, update: Partial<IBroadcastSetting>, options?: QueryOptions<IBroadcastSetting> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IBroadcastSetting>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IBroadcastSetting> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IBroadcastSetting> & IBroadcastSetting & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IBroadcastSetting>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IBroadcastSetting>): Promise<any>;
    findOne(filter: FilterQuery<IBroadcastSetting>, select: string | null | undefined): Promise<IBroadcastSetting | null>;
    createMany(obj: Array<Partial<IBroadcastSetting>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IBroadcastSetting>, update: Partial<IBroadcastSetting>, session?: any, options?: QueryOptions<IBroadcastSetting> | null | undefined): Promise<IBroadcastSetting | null>;
    findCount(filter?: FilterQuery<IBroadcastSetting>): Promise<number>;
}
