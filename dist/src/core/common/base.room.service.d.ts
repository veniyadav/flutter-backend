import { BaseService } from "./base.service";
import { FilterQuery, QueryOptions } from "mongoose";
export declare abstract class BaseRoomService<RM> extends BaseService<RM> {
    abstract findByRoomId(roomId: string, select?: string | null, options?: QueryOptions<RM> | null): Promise<any>;
    abstract findByRoomIdAndUpdate(roomId: string, update: Partial<RM>, session?: any): Promise<any>;
    abstract findByRoomIdAndDelete(roomId: string, filter: FilterQuery<RM>, session?: any): Promise<any>;
}
