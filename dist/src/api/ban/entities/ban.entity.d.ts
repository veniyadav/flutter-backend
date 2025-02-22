import mongoose from "mongoose";
export interface IBan {
    _id: string;
    bannerId: string;
    targetId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const BanSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    bannerId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    bannerId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    bannerId: mongoose.Types.ObjectId;
    targetId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
