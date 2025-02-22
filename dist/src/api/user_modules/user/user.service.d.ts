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
import { FilterQuery, PaginateModel, PaginateOptions, QueryOptions, UpdateQuery } from "mongoose";
import { IUser } from "./entities/user.entity";
import { UserDeviceService } from "../user_device/user_device.service";
import { BaseService } from "../../../core/common/base.service";
export declare class UserService extends BaseService<IUser> {
    private readonly model;
    private readonly userDevice;
    constructor(model: PaginateModel<IUser>, userDevice: UserDeviceService);
    createMany(obj: Partial<IUser>[], session?: any): Promise<any>;
    aggregate(obj: any[], session?: any): Promise<any>;
    findOneByEmail(email: string, select?: string): Promise<import("mongoose").FlattenMaps<IUser> & Required<{
        _id: string;
    }>>;
    findOneByEmailOrThrow(email: string, select: string): Promise<import("mongoose").FlattenMaps<IUser> & Required<{
        _id: string;
    }>>;
    setLastSeenAt(_id: string): Promise<void>;
    findByIds(usersIds: string[], select?: string): Promise<(import("mongoose").FlattenMaps<IUser> & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string, options?: {}): Promise<IUser | null>;
    findByIdAndDelete(id: string): Promise<import("mongoose").FlattenMaps<IUser> & Required<{
        _id: string;
    }>>;
    findByIdOrThrow(id: string, select?: string, options?: {}): Promise<IUser>;
    findByIdAndUpdate(_id: string, update: {}, session?: any): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: string;
    }>>;
    create(obj: Partial<IUser>, session?: any): Promise<import("mongoose").Document<unknown, {}, IUser> & IUser & Required<{
        _id: string;
    }>>;
    searchV2(dto: Object, notContains: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, PaginateOptions, IUser> & IUser & Required<{
        _id: string;
    }>>>;
    deleteMany(filter: FilterQuery<IUser>): Promise<any>;
    updateMany(filter: FilterQuery<IUser>, update: UpdateQuery<IUser>, options?: QueryOptions<IUser> | null | undefined): Promise<any>;
    findAll(filter?: FilterQuery<IUser>, select?: string, options?: QueryOptions<IUser> | null | undefined): Promise<any>;
    findOne(filter: FilterQuery<IUser>, select: string): Promise<IUser | null>;
    findOneAndUpdate(filter: FilterQuery<IUser>, update: UpdateQuery<IUser>, session?: any, options?: QueryOptions<IUser> | null | undefined): Promise<IUser | null>;
    paginateModel(filter: FilterQuery<IUser>, options?: PaginateOptions): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, PaginateOptions, IUser> & IUser & Required<{
        _id: string;
    }>>>;
    fullPaginateModel(p: any): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, PaginateOptions, IUser> & IUser & Required<{
        _id: string;
    }>>>;
    findCount(filter?: FilterQuery<IUser>): Promise<number>;
    _addIsPrime(): Promise<void>;
}
