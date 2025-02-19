import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
export declare abstract class BaseService<IM> {
    abstract create(obj: Partial<IM>, session?: any): Promise<any>;
    abstract createMany(obj: Array<Partial<IM>>, session?: any): Promise<any>;
    abstract findById(id: string, select?: string | null): Promise<IM | null>;
    abstract findOne(filter: FilterQuery<IM>, select?: string | null): Promise<IM | null>;
    abstract findOneAndUpdate(filter: FilterQuery<IM>, update: UpdateQuery<IM>, session?: any, options?: QueryOptions<IM> | null): Promise<IM | null>;
    abstract findByIdOrThrow(id: string, select?: string | null): Promise<IM>;
    abstract findByIdAndUpdate(id: string, update: UpdateQuery<IM> | null, session?: any): Promise<any>;
    abstract updateMany(filter: FilterQuery<IM>, update: UpdateQuery<IM>, session?: any, options?: QueryOptions<IM> | null): Promise<any>;
    abstract findAll(filter?: FilterQuery<IM>, select?: string | null, options?: QueryOptions<IM> | null): Promise<any>;
    abstract findByIdAndDelete(id: string, session?: any): Promise<any>;
    abstract deleteMany(filter: FilterQuery<IM>, session?: any): Promise<any>;
    abstract findCount(filter: FilterQuery<IM>, session?: any): Promise<any>;
}
