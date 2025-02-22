import { StoryService } from "../story/story.service";
import { CreateStoryDto } from "./dto/story.dto";
import { MongoIdDto } from "../../../core/common/dto/mongo.id.dto";
import { FileUploaderService } from "../../../common/file_uploader/file_uploader.service";
import { UserBanService } from "../../user_modules/user_ban/user_ban.service";
import { UserService } from "../../user_modules/user/user.service";
import { StoryAttachmentService } from "../story_attachment/story_attachment.service";
export declare class UserStoryService {
    private readonly storyService;
    private readonly s3;
    private readonly userBanService;
    private readonly userService;
    private readonly storyAttachmentService;
    constructor(storyService: StoryService, s3: FileUploaderService, userBanService: UserBanService, userService: UserService, storyAttachmentService: StoryAttachmentService);
    create(dto: CreateStoryDto): Promise<any>;
    getMyStories(myId: string): Promise<void>;
    findAll(myId: string, dto: object): Promise<any>;
    private storyStages;
    remove(dto: MongoIdDto): Promise<string>;
    addView(dto: MongoIdDto): Promise<string>;
    getView(dto: MongoIdDto, query: object): Promise<any>;
    myStories(myId: string): Promise<any>;
    private _uploadFile;
}
