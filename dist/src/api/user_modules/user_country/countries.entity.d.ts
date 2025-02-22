import mongoose from "mongoose";
export interface IUserCountry {
    _id: string;
    uId: string;
    countryId: string;
}
export declare const UserCountrySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    uId: mongoose.Types.ObjectId;
    countryId: mongoose.Types.ObjectId;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    uId: mongoose.Types.ObjectId;
    countryId: mongoose.Types.ObjectId;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    uId: mongoose.Types.ObjectId;
    countryId: mongoose.Types.ObjectId;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
