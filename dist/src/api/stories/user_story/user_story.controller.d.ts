/// <reference types="multer" />
import { UserStoryService } from './user_story.service';
import { CreateStoryDto } from "./dto/story.dto";
import { MongoIdDto } from "../../../core/common/dto/mongo.id.dto";
export declare class UserStoryController {
    private readonly userStoryService;
    constructor(userStoryService: UserStoryService);
    create(dto: CreateStoryDto, req: any, file?: Express.Multer.File[]): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    findAll(req: any, dto: object): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    myStories(req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    delete(dto: MongoIdDto, req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    addView(dto: MongoIdDto, req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getView(dto: MongoIdDto, req: any, queryData: object): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
