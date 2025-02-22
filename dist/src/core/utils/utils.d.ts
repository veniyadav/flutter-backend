import mongoose from "mongoose";
export declare const isValidMongoId: (id: any) => boolean;
export declare const newMongoObjId: (string?: string) => mongoose.Types.ObjectId;
export declare const humanFileSize: (size: number) => string;
export declare const humanAudioTime: (time: number) => string;
