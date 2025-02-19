/// <reference types="multer" />
import { StoryFontType, StoryPrivacy, StoryTextAlign, StoryType } from "../../../../core/utils/enums";
import CommonDto from "../../../../core/common/dto/common.dto";
import { IStory } from "../../story/entities/story.entity";
export declare class CreateStoryDto extends CommonDto {
    storyType: StoryType;
    storyPrivacy?: StoryPrivacy;
    somePeople?: any;
    content: string;
    attachment?: string;
    att?: object;
    backgroundColor?: string;
    textColor?: string;
    textAlign?: StoryTextAlign;
    caption?: string;
    fontType?: StoryFontType;
    _mediaFile?: Express.Multer.File;
    _secondMediaFile?: Express.Multer.File;
    exceptPeople?: any;
    toJson(): Partial<IStory>;
    private getExpireAt;
    isImage(): boolean;
    isVideo(): boolean;
    isText(): boolean;
    isVoice(): boolean;
}
