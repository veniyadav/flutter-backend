"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const fs_1 = __importDefault(require("fs"));
const enums_1 = require("../../core/utils/enums");
const sharp_utils_1 = require("../../core/utils/sharp.utils");
const file_type_1 = require("file-type");
const uuid_1 = require("uuid");
let FileUploaderService = class FileUploaderService {
    async putImageCropped(imageBuffer, myId) {
        let key = `${enums_1.S3UploaderTypes.profileImage}-${(0, uuid_1.v4)()}.jpg`;
        let image = await (0, sharp_utils_1.cropProfileImage)(imageBuffer);
        await this._putFile(image, key, myId, true);
        return key;
    }
    async uploadChatMedia(dto) {
        let contentType = await (0, file_type_1.fromBuffer)(dto.mediaBuffer);
        let key = `${dto.myUser._id}/${enums_1.S3UploaderTypes.media}-${(0, uuid_1.v4)()}`;
        if (contentType) {
            key = `${key}.${contentType.ext}`;
        }
        else {
            key = `${key}.${dto.fileName.split('.')[1]}`;
        }
        await this._putFile(dto.mediaBuffer, key, dto.myUser._id);
        return key;
    }
    async _putFile(fileData, key, userId, isPublic) {
        let localPath = path_1.default.join(app_root_path_1.default.path, "public", isPublic ? "v-public" : "media", userId.toString());
        if (!fs_1.default.existsSync(localPath)) {
            fs_1.default.mkdirSync(localPath);
        }
        return await new Promise((resolve, reject) => {
            let localPath = path_1.default.join(app_root_path_1.default.path, "public", isPublic ? "v-public" : "media", key);
            fs_1.default.writeFile(localPath, fileData, err => {
                if (err) {
                    reject(err);
                    console.log(err);
                }
                resolve(key);
            });
        });
    }
};
FileUploaderService = __decorate([
    (0, common_1.Injectable)()
], FileUploaderService);
exports.FileUploaderService = FileUploaderService;
//# sourceMappingURL=file_uploader.service.js.map