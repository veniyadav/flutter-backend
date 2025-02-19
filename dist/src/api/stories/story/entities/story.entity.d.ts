import { Schema } from "mongoose";
import { StoryFontType, StoryPrivacy, StoryType } from "../../../../core/utils/enums";
export interface IStory extends Document {
    userId: string;
    storyType: StoryType;
    storyPrivacy?: StoryPrivacy;
    fontType: StoryFontType;
    content?: string;
    att?: object;
    backgroundColor?: string;
    textAlign?: string;
    textColor?: string;
    caption?: string;
    somePeople?: any[];
    views: any[];
    createdAt: Date;
    expireAt: Date;
}
export declare const StorySchema: Schema;
