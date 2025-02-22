import mongoose, { FilterQuery, PaginateModel, QueryOptions } from "mongoose";
import { IMessage } from "./entities/message.entity";
import { GroupMessageStatusService } from "../group_message_status/group_message_status.service";
import { FileUploaderService } from "../../common/file_uploader/file_uploader.service";
import { SendMessageDto } from "../channel/dto/send.message.dto";
import { MessagesSearchDto } from "./dto/messages_search_dto";
export declare class MessageService {
    private readonly messageModel;
    private readonly groupMessageStatusService;
    private readonly s3;
    constructor(messageModel: PaginateModel<IMessage>, groupMessageStatusService: GroupMessageStatusService, s3: FileUploaderService);
    getByIdOrFail(messageId: any, select?: string): Promise<mongoose.FlattenMaps<IMessage> & {
        _id: mongoose.Types.ObjectId;
    }>;
    findOne(filter: FilterQuery<IMessage>): Promise<IMessage>;
    create(dto: SendMessageDto, session?: any): Promise<IMessage>;
    createOneFromJson(dto: {}): Promise<mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    }>;
    createMany(data: SendMessageDto[], session?: any): Promise<(mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findAllMessagesAggregation(myId: any, roomId: any, dto: MessagesSearchDto): Promise<any[]>;
    paginated(dto: any[]): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    }>>;
    findAll(filter: FilterQuery<IMessage>, options?: QueryOptions<IMessage>): Promise<(mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    private prepareTheMessageModel;
    getUnReadCount(lastMessageSeenId: string, roomId: string, myId: any): Promise<number>;
    setMessageSeenForSingleChat(userId: string, roomId: string): Promise<any>;
    setMessageSeenForGroupChat(userId: string, roomId: string): Promise<any>;
    setMessageDeliverForSingleChat(userId: string, roomId: any): Promise<any>;
    setMessageDeliverForGroupChat(myId: string, roomId: string): Promise<boolean>;
    deleteMessageFromMe(myId: any, id: string): Promise<mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    }>;
    isMeMessageSenderOrThrow(myId: any, id: string): Promise<mongoose.FlattenMaps<IMessage> & {
        _id: mongoose.Types.ObjectId;
    }>;
    deleteAllRoomMessagesFromMe(userId: any, roomId: string): Promise<void>;
    deleteAll(): Promise<void>;
    deleteOne(filter: FilterQuery<IMessage>): Promise<void>;
    deleteWhere(filter: FilterQuery<IMessage>): Promise<void>;
    isMessageExist(localId: string): Promise<mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    }>;
    findByRoomIdAndUpdate(rId: string, param2: {}): Promise<any>;
    findByIdAndUpdate(mId: string, update: {}): Promise<mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    }>;
    findById(mId: string): Promise<mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    }>;
    findWhere(filter: {}, select?: string, options?: QueryOptions<IMessage>): Promise<(mongoose.Document<unknown, {}, IMessage> & IMessage & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    getById(id: string, select?: string): Promise<mongoose.FlattenMaps<IMessage> & {
        _id: mongoose.Types.ObjectId;
    }>;
    updateMany(filter: FilterQuery<IMessage>, update: any, options?: QueryOptions<IMessage> | null | undefined): Promise<any>;
    findCount(filter?: FilterQuery<IMessage>, options?: QueryOptions<IMessage>): Promise<number>;
    getByLocalId(lId: string, select?: string): Promise<IMessage | null>;
}
