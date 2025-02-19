import mongoose, { FilterQuery, Model, QueryOptions } from 'mongoose';
import { BaseRoomService } from 'src/core/common/base.room.service';
import { IRoomMember } from "./entities/room_member.entity";
export declare class RoomMemberService extends BaseRoomService<IRoomMember> {
    private readonly model;
    constructor(model: Model<IRoomMember>);
    create(obj: Partial<IRoomMember>, session?: any): Promise<any>;
    deleteMany(filter: FilterQuery<IRoomMember>): Promise<any>;
    findOneAndDelete(filter: FilterQuery<IRoomMember>): Promise<any>;
    findAll(filter?: FilterQuery<IRoomMember>, select?: string, options?: QueryOptions<IRoomMember>, distinct?: boolean): Promise<any[]>;
    findById(id: string, select?: string | null | undefined): Promise<IRoomMember | null>;
    findByIdAndDelete(id: string): Promise<any>;
    findByIdAndUpdate(id: string, update: Partial<IRoomMember> | null | undefined): Promise<any>;
    updateMany(filter: FilterQuery<IRoomMember>, update: Partial<IRoomMember>, options?: QueryOptions<IRoomMember> | null | undefined): Promise<any>;
    findByIdOrThrow(id: string, select?: string | null | undefined): Promise<IRoomMember>;
    findByRoomId(roomId: string, select?: string | null | undefined, options?: QueryOptions<IRoomMember> | null | undefined): Promise<any[]>;
    findByRoomIdAndUserIdAndUpdate(roomId: string, userId: string, update: Partial<IRoomMember>, session?: any, options?: QueryOptions<IRoomMember> | null | undefined): Promise<IRoomMember>;
    findByRoomIdAndUserId(roomId: string, userId: string, select?: string, session?: any, options?: QueryOptions<IRoomMember> | null | undefined): Promise<IRoomMember>;
    findByRoomIdAndDelete(roomId: string, filter: FilterQuery<IRoomMember>): Promise<any>;
    findByRoomIdAndUpdate(roomId: string, update: Partial<IRoomMember>): Promise<any>;
    findOne(filter: FilterQuery<IRoomMember>, select?: string): Promise<IRoomMember | null>;
    createMany(obj: Array<Partial<IRoomMember>>, session?: any): Promise<any>;
    aggregate(agg: any[], options?: mongoose.AggregateOptions): Promise<any>;
    findOneAndUpdate(filter: FilterQuery<IRoomMember>, update: Partial<IRoomMember>, session?: any, options?: QueryOptions<IRoomMember> | null | undefined): Promise<IRoomMember | null>;
    findCount(filter?: FilterQuery<IRoomMember>): Promise<number>;
    aggregateV2(stages: any, page: any, limit: any): Promise<any>;
}
