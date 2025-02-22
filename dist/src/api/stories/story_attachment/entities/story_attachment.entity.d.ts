import mongoose from "mongoose";
export interface IStoryAttachment {
    _id: string;
    shares: any[];
    reply: any[];
    likes: any[];
}
export declare const StoryAttachment: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shares: mongoose.Types.ObjectId[];
    reply: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shares: mongoose.Types.ObjectId[];
    reply: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    shares: mongoose.Types.ObjectId[];
    reply: mongoose.Types.ObjectId[];
    likes: mongoose.Types.ObjectId[];
}> & {
    _id: mongoose.Types.ObjectId;
}>;
