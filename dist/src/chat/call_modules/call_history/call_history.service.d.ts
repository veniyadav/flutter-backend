import { PaginateModel, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { BaseService } from '../../../core/common/base.service';
import { ICallHistory } from "./call.history.entity";
export declare class CallHistoryService extends BaseService<ICallHistory> {
    private readonly model;
    constructor(model: PaginateModel<ICallHistory>);
    findById(id: string, select?: string): Promise<ICallHistory | null>;
    findByIdAndDelete(id: string): Promise<ICallHistory | null>;
    findByIdOrThrow(id: string, select?: string, options?: QueryOptions): Promise<ICallHistory>;
    findByIdAndUpdate(_id: string, update: UpdateQuery<ICallHistory>, session?: any): Promise<ICallHistory | null>;
    create(dto: Partial<ICallHistory>): Promise<ICallHistory>;
    deleteMany(filter: FilterQuery<ICallHistory>): Promise<any>;
    delete(filter: FilterQuery<ICallHistory>): Promise<any>;
    updateMany(filter: FilterQuery<ICallHistory>, update: UpdateQuery<ICallHistory>, options?: QueryOptions): Promise<any>;
    findAll(filter?: FilterQuery<ICallHistory>, select?: string, options?: QueryOptions): Promise<ICallHistory[]>;
    findOne(filter: FilterQuery<ICallHistory>, select?: string, options?: QueryOptions): Promise<ICallHistory | null>;
    findOneAndUpdate(filter: FilterQuery<ICallHistory>, update: UpdateQuery<ICallHistory>, session?: any, options?: QueryOptions): Promise<ICallHistory | null>;
    findCount(filter?: FilterQuery<ICallHistory>): Promise<number>;
    createMany(records: Array<Partial<ICallHistory>>, session?: any): Promise<ICallHistory[]>;
    paginateModel(filter: any, options?: any): Promise<any>;
}
