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
import { BaseService } from "../../../core/common/base.service";
import { IUserCountry } from "./countries.entity";
import { CountriesService } from "../../countries/countries.service";
export declare class UserCountryService extends BaseService<IUserCountry> {
    private readonly model;
    private readonly countryService;
    constructor(model: PaginateModel<IUserCountry>, countryService: CountriesService);
    create(obj: Partial<IUserCountry>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IUserCountry>): Promise<any>;
    deleteOne(filter: FilterQuery<IUserCountry>): Promise<any>;
    findAll(filter?: FilterQuery<IUserCountry> | undefined, select?: string | null | undefined, options?: QueryOptions<IUserCountry> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IUserCountry> & IUserCountry & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string): Promise<IUserCountry | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IUserCountry>): Promise<any>;
    updateMany(filter: FilterQuery<IUserCountry>, update: UpdateQuery<IUserCountry>, options?: QueryOptions<IUserCountry> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IUserCountry>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IUserCountry> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IUserCountry> & IUserCountry & Required<{
        _id: string;
    }>)[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IUserCountry>): Promise<any>;
    findOne(filter: FilterQuery<IUserCountry>, select?: string): Promise<IUserCountry | null>;
    createMany(obj: Array<Partial<IUserCountry>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IUserCountry>, update: UpdateQuery<IUserCountry>, session?: any, options?: QueryOptions<IUserCountry>): Promise<IUserCountry | null>;
    findCount(filter: FilterQuery<IUserCountry>, session?: any): Promise<any>;
    aggregate(data: any): Promise<any[]>;
    setUserCountry(uId: string, country: string): Promise<string>;
}
