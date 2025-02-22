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
import { BaseService } from "../../core/common/base.service";
import { ICountry } from "./countries.entity";
import { FilterQuery, PaginateModel, QueryOptions, UpdateQuery } from "mongoose";
export declare class CountriesService extends BaseService<ICountry> {
    private readonly model;
    constructor(model: PaginateModel<ICountry>);
    create(obj: Partial<ICountry>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<ICountry>): Promise<any>;
    deleteOne(filter: FilterQuery<ICountry>): Promise<any>;
    findAll(filter?: FilterQuery<ICountry> | undefined, select?: string | null | undefined, options?: QueryOptions<ICountry> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, ICountry> & ICountry & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string): Promise<ICountry | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<ICountry>): Promise<any>;
    estimatedDocumentCount(): Promise<any>;
    updateMany(filter: FilterQuery<ICountry>, update: UpdateQuery<ICountry>, options?: QueryOptions<ICountry> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<ICountry>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<ICountry> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, ICountry> & ICountry & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<ICountry>): Promise<any>;
    findOne(filter: FilterQuery<ICountry>, select?: string): Promise<ICountry | null>;
    createMany(obj: Array<Partial<ICountry>>, session?: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<ICountry>, update: UpdateQuery<ICountry>, session?: any, options?: QueryOptions<ICountry>): Promise<ICountry | null>;
    findCount(filter: FilterQuery<ICountry>, session?: any): Promise<any>;
}
