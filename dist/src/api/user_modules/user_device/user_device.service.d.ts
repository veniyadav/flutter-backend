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
import { IUserDevice } from "./entities/user_device.entity";
import { FilterQuery, Model, PipelineStage, QueryOptions, UpdateQuery } from "mongoose";
import { PushKeyAndProvider } from "../../../core/utils/interfaceces";
import { Platform } from "../../../core/utils/enums";
import { BaseService } from "../../../core/common/base.service";
export declare class UserDeviceService extends BaseService<IUserDevice> {
    private readonly model;
    constructor(model: Model<IUserDevice>);
    create(obj: Partial<IUserDevice>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IUserDevice>): Promise<any>;
    deleteOne(filter: FilterQuery<IUserDevice>): Promise<any>;
    findAll(filter?: FilterQuery<IUserDevice> | undefined, select?: string | null | undefined, options?: QueryOptions<IUserDevice> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IUserDevice> & IUserDevice & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string): Promise<IUserDevice | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IUserDevice>): Promise<any>;
    updateMany(filter: FilterQuery<IUserDevice>, update: UpdateQuery<IUserDevice>, options?: QueryOptions<IUserDevice> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IUserDevice>;
    findOne(filter: FilterQuery<IUserDevice>, select?: string, options?: object): Promise<IUserDevice | null>;
    createMany(obj: Array<Partial<IUserDevice>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IUserDevice>, update: UpdateQuery<IUserDevice>, session?: any, options?: QueryOptions<IUserDevice>): Promise<IUserDevice | null>;
    getUserPushTokens(peerId: string, platform?: Platform): Promise<PushKeyAndProvider>;
    getUsersPlatformAndPushKey(peerId: string): Promise<(import("mongoose").Document<unknown, {}, IUserDevice> & IUserDevice & Required<{
        _id: string;
    }>)[]>;
    findCount(filter?: FilterQuery<IUserDevice>): Promise<number>;
    deleteFcmTokens(tokensToDelete: any[]): Promise<void>;
    aggregate(pipeline?: PipelineStage[]): Promise<any[]>;
    setLastSeenAt(_id: string): Promise<void>;
}
