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
import { IOrderRoomSettings } from "./entities/order_room_setting.entity";
import { BaseRoomService } from "../../core/common/base.room.service";
export declare class OrderRoomSettingsService extends BaseRoomService<IOrderRoomSettings> {
    private readonly model;
    constructor(model: Model<IOrderRoomSettings>);
    createMany(obj: Partial<IOrderRoomSettings>[], session?: any): Promise<any>;
    create(obj: Partial<IOrderRoomSettings>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IOrderRoomSettings>): Promise<any>;
    findAll(filter?: FilterQuery<IOrderRoomSettings> | undefined, select?: string | null | undefined, options?: QueryOptions<IOrderRoomSettings> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IOrderRoomSettings> & IOrderRoomSettings & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<IOrderRoomSettings | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IOrderRoomSettings> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IOrderRoomSettings>, update: Partial<IOrderRoomSettings>, options?: QueryOptions<IOrderRoomSettings> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IOrderRoomSettings>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IOrderRoomSettings> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IOrderRoomSettings> & IOrderRoomSettings & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IOrderRoomSettings>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IOrderRoomSettings>): Promise<any>;
    findOne(filter: FilterQuery<IOrderRoomSettings>, select?: string): Promise<IOrderRoomSettings | null>;
    findOneAndUpdate(filter: FilterQuery<IOrderRoomSettings>, update: Partial<IOrderRoomSettings>, session?: any, options?: QueryOptions<IOrderRoomSettings> | null | undefined): Promise<IOrderRoomSettings | null>;
    findCount(filter?: FilterQuery<IOrderRoomSettings>): Promise<number>;
}
