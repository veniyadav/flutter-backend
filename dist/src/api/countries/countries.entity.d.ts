import mongoose from "mongoose";
export interface ICountry {
    _id: string;
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
}
export declare const CountrySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
