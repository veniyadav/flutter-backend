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
import { BaseService } from "../../core/common/base.service";
import { IBan } from "./entities/ban.entity";
export declare class BanService extends BaseService<IBan> {
    private readonly model;
    constructor(model: PaginateModel<IBan>);
    createMany(obj: Partial<IBan>[], session?: any): Promise<any>;
    create(obj: Partial<IBan>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IBan>): Promise<any>;
    deleteOne(filter: FilterQuery<IBan>): Promise<any>;
    findAll(filter?: FilterQuery<IBan> | undefined, select?: string | null | undefined, options?: QueryOptions<IBan> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IBan> & IBan & Required<{
        _id: string;
    }>)[]>;
    findById(id: string, select?: string | null | undefined): Promise<IBan | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IBan> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IBan>, update: UpdateQuery<IBan>, options?: QueryOptions<IBan> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IBan>;
    findOne(filter: FilterQuery<IBan>, select?: string): Promise<IBan | null>;
    findOneAndUpdate(filter: FilterQuery<IBan>, update: UpdateQuery<IBan>, session?: any, options?: QueryOptions<IBan> | null | undefined): Promise<IBan | null>;
    getBan(myId: string, peerId: string): Promise<import("mongoose").Document<unknown, {}, IBan> & IBan & Required<{
        _id: string;
    }>>;
    findCount(filter: FilterQuery<IBan>, session: any): any;
    paginate(paginationParameters: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IBan> & IBan & Required<{
        _id: string;
    }>>>;
}
