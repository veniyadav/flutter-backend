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
import { FilterQuery, PaginateModel, QueryOptions } from "mongoose";
import { IReport } from "./entities/report_system.entity";
import { BaseService } from "../../core/common/base.service";
export declare class ReportSystemService extends BaseService<IReport> {
    private readonly model;
    constructor(model: PaginateModel<IReport>);
    create(obj: Partial<IReport>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IReport>): Promise<any>;
    findAll(filter?: FilterQuery<IReport> | undefined, select?: string | null | undefined, options?: QueryOptions<IReport> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IReport> & IReport & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(id: string, select?: string | null | undefined): Promise<IReport | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IReport> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IReport>, update: Partial<IReport> | any, options?: QueryOptions<IReport> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IReport>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IReport> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IReport> & IReport & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IReport>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IReport>): Promise<any>;
    findOne(filter: FilterQuery<IReport>, select?: string | null | undefined): Promise<IReport | null>;
    findByRoomIdAndUserIdAndUpdate(roomId: string, userId: string, update: Partial<IReport>, session?: any, options?: QueryOptions<IReport> | null | undefined): Promise<IReport>;
    createMany(obj: Array<Partial<IReport>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IReport>, update: Partial<IReport>, session?: any, options?: QueryOptions<IReport> | null | undefined): Promise<IReport | null>;
    getMembersCount(rId: string): Promise<number>;
    deleteOne(filter: FilterQuery<IReport>): Promise<any>;
    findCount(filter: FilterQuery<IReport>, options?: QueryOptions<IReport>): Promise<number>;
    paginate(paginationParameters: any[]): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IReport> & IReport & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
