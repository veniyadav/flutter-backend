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
import { IVersion } from "./versions.entity";
import { BaseService } from "../../core/common/base.service";
export declare class VersionsService extends BaseService<IVersion> {
    private readonly model;
    constructor(model: PaginateModel<IVersion>);
    create(obj: Partial<IVersion>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IVersion>): Promise<any>;
    deleteOne(filter: FilterQuery<IVersion>): Promise<any>;
    findAll(filter?: FilterQuery<IVersion> | undefined, select?: string | null | undefined, options?: QueryOptions<IVersion> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IVersion> & IVersion & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string): Promise<IVersion | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IVersion>): Promise<any>;
    updateMany(filter: FilterQuery<IVersion>, update: UpdateQuery<IVersion>, options?: QueryOptions<IVersion> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IVersion>;
    findOne(filter: FilterQuery<IVersion>, select?: string, options?: QueryOptions<IVersion>): Promise<IVersion | null>;
    createMany(obj: Array<Partial<IVersion>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IVersion>, update: UpdateQuery<IVersion>, session?: any, options?: QueryOptions<IVersion>): Promise<IVersion | null>;
    findCount(filter: FilterQuery<IVersion>, session?: any): Promise<any>;
}
