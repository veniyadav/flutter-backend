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
import { ISingleRoomSettings } from "./entities/single_room_setting.entity";
import { BaseRoomService } from "../../core/common/base.room.service";
export declare class SingleRoomSettingsService extends BaseRoomService<ISingleRoomSettings> {
    private readonly model;
    constructor(model: Model<ISingleRoomSettings>);
    createMany(obj: Partial<ISingleRoomSettings>[], session?: any): Promise<any>;
    create(obj: Partial<ISingleRoomSettings>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<ISingleRoomSettings>): Promise<any>;
    findAll(filter?: FilterQuery<ISingleRoomSettings> | undefined, select?: string | null | undefined, options?: QueryOptions<ISingleRoomSettings> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, ISingleRoomSettings> & ISingleRoomSettings & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<ISingleRoomSettings | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<ISingleRoomSettings> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<ISingleRoomSettings>, update: Partial<ISingleRoomSettings>, options?: QueryOptions<ISingleRoomSettings> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<ISingleRoomSettings>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<ISingleRoomSettings> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, ISingleRoomSettings> & ISingleRoomSettings & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<ISingleRoomSettings>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<ISingleRoomSettings>): Promise<any>;
    findOne(filter: FilterQuery<ISingleRoomSettings>, select?: string): Promise<ISingleRoomSettings | null>;
    findOneAndUpdate(filter: FilterQuery<ISingleRoomSettings>, update: Partial<ISingleRoomSettings>, session?: any, options?: QueryOptions<ISingleRoomSettings> | null | undefined): Promise<ISingleRoomSettings | null>;
    findCount(filter?: FilterQuery<ISingleRoomSettings>): Promise<number>;
}
