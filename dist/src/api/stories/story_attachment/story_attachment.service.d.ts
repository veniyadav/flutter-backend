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
import { IStoryAttachment } from "./entities/story_attachment.entity";
import { FilterQuery, PaginateModel, PaginateOptions, QueryOptions, UpdateQuery } from "mongoose";
import { BaseService } from "../../../core/common/base.service";
export declare class StoryAttachmentService extends BaseService<IStoryAttachment> {
    private readonly model;
    constructor(model: PaginateModel<IStoryAttachment>);
    findById(id: string, select?: string | undefined): Promise<IStoryAttachment | null>;
    findByStoryId(id: string, select?: string | undefined): Promise<IStoryAttachment | null>;
    findByIdAndDelete(id: string): Promise<import("mongoose").FlattenMaps<IStoryAttachment> & Required<{
        _id: string;
    }>>;
    findByIdOrThrow(id: string, select?: string, options?: QueryOptions<IStoryAttachment>): Promise<IStoryAttachment>;
    findByIdAndUpdate(_id: string, update: UpdateQuery<IStoryAttachment>, session?: any): Promise<import("mongoose").Document<unknown, {}, IStoryAttachment> & IStoryAttachment & Required<{
        _id: string;
    }>>;
    create(dto: Partial<IStoryAttachment>): Promise<IStoryAttachment>;
    deleteMany(filter: FilterQuery<IStoryAttachment>): Promise<any>;
    updateMany(filter: FilterQuery<IStoryAttachment>, update: UpdateQuery<IStoryAttachment>, options?: QueryOptions<IStoryAttachment> | null | undefined): Promise<any>;
    findAll(filter?: FilterQuery<IStoryAttachment>, select?: string, options?: QueryOptions<IStoryAttachment> | null | undefined): Promise<any>;
    findOne(filter: FilterQuery<IStoryAttachment>, select?: string, options?: {}): Promise<IStoryAttachment | null>;
    findOneAndUpdate(filter: FilterQuery<IStoryAttachment>, update: UpdateQuery<IStoryAttachment>, session?: any, options?: QueryOptions<IStoryAttachment> | null | undefined): Promise<IStoryAttachment | null>;
    findCount(filter?: FilterQuery<IStoryAttachment>): Promise<number>;
    createMany(obj: Array<Partial<IStoryAttachment>>, session: any): Promise<any>;
    paginateModel(p: any[], options?: PaginateOptions): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, PaginateOptions, IStoryAttachment> & IStoryAttachment & Required<{
        _id: string;
    }>>>;
}
