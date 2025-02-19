/// <reference types="node" />
import { CreateS3UploaderDto } from "./create-s3_uploader.dto";
export declare class FileUploaderService {
    putImageCropped(imageBuffer: Buffer, myId: string): Promise<string>;
    uploadChatMedia(dto: CreateS3UploaderDto): Promise<string>;
    _putFile(fileData: Buffer, key: string, userId: string, isPublic?: boolean): Promise<unknown>;
}
