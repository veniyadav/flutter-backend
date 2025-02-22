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
import { FilterQuery, Model, QueryOptions, UpdateQuery } from "mongoose";
import { IStory } from "./entities/story.entity";
import { BaseService } from "../../../core/common/base.service";
export declare class StoryService extends BaseService<IStory> {
    private readonly model;
    constructor(model: Model<IStory>);
    create(obj: Partial<IStory>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IStory>): Promise<any>;
    deleteOne(filter: FilterQuery<IStory>): Promise<any>;
    findAll(filter?: FilterQuery<IStory> | undefined, select?: string | null | undefined, options?: QueryOptions<IStory> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IStory> & IStory & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findById(id: string, select?: string): Promise<IStory | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: UpdateQuery<IStory>): Promise<any>;
    updateMany(filter: FilterQuery<IStory>, update: UpdateQuery<IStory>, options?: QueryOptions<IStory> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IStory>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IStory> | null | undefined): Promise<(import("mongoose").Document<unknown, {}, IStory> & IStory & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IStory>): Promise<any>;
    findOne(filter: FilterQuery<IStory>, select?: string, options?: QueryOptions<IStory>): Promise<IStory | null>;
    createMany(obj: Array<Partial<IStory>>, session: any): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IStory>, update: UpdateQuery<IStory>, session?: any, options?: QueryOptions<IStory>): Promise<IStory | null>;
    findCount(filter: FilterQuery<IStory>, session?: any): Promise<any>;
    aggregate(stages: any[]): Promise<any>;
    aggregateV2(stages: any[], page: number, limit: number): Promise<any>;
    private _deleteAll;
}
