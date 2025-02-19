"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStoryService = void 0;
const common_1 = require("@nestjs/common");
const story_service_1 = require("../story/story.service");
const create_s3_uploader_dto_1 = require("../../../common/file_uploader/create-s3_uploader.dto");
const file_uploader_service_1 = require("../../../common/file_uploader/file_uploader.service");
const app_validator_1 = require("../../../core/utils/app.validator");
const utils_1 = require("../../../core/utils/utils");
const user_ban_service_1 = require("../../user_modules/user_ban/user_ban.service");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const user_service_1 = require("../../user_modules/user/user.service");
const story_attachment_service_1 = require("../story_attachment/story_attachment.service");
let UserStoryService = class UserStoryService {
    constructor(storyService, s3, userBanService, userService, storyAttachmentService) {
        this.storyService = storyService;
        this.s3 = s3;
        this.userBanService = userBanService;
        this.userService = userService;
        this.storyAttachmentService = storyAttachmentService;
    }
    async create(dto) {
        let exceptPeople = [];
        if (!dto.isText() && !dto._mediaFile)
            throw new common_1.BadRequestException("file data required");
        if (dto._mediaFile) {
            let thumbFile = null;
            let mainFileKey = await this._uploadFile(dto._mediaFile, dto.myUser);
            if (dto._secondMediaFile) {
                thumbFile = await this._uploadFile(dto._secondMediaFile, dto.myUser);
            }
            dto.att = {
                ...(0, app_validator_1.jsonDecoder)(dto.attachment),
                fileSize: dto._mediaFile.size,
                mimeType: dto._mediaFile.mimetype,
                name: dto._mediaFile.originalname,
                url: mainFileKey,
                thumbUrl: thumbFile
            };
        }
        exceptPeople = await this.userBanService.getMyBlockTheyAndMe(dto.myUser._id);
        exceptPeople.push(dto.myUser._id);
        dto.somePeople.push(...(await this.userService.findAll({
            _id: { $nin: exceptPeople },
        })));
        let story = await this.storyService.create(dto.toJson());
        delete story['somePeople'];
        let att = await this.storyAttachmentService.create({
            likes: [],
            reply: [],
            shares: [],
        });
        return {
            ...story,
            storyAttachment: {
                ...att,
                likes: 0,
                reply: 0,
                shares: 0,
            },
        };
    }
    async getMyStories(myId) {
        let myStories = await this.storyService.findAll({
            expireAt: { $gte: new Date() },
            userId: myId
        });
    }
    async findAll(myId, dto) {
        let blocked = [];
        let myIdObj = (0, utils_1.newMongoObjId)(myId);
        blocked.push(myIdObj);
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 30,
                page: 1,
                sort: "-_id",
                ...dto,
            },
        }).get();
        return this.storyService.aggregateV2(this.storyStages(myIdObj, {
            expireAt: { $gte: new Date() },
            userId: { $nin: blocked },
            somePeople: myIdObj,
        }), paginationParameters[1].page, paginationParameters[1].limit);
    }
    storyStages(myIdObj, match) {
        return [
            {
                $match: match
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $group: {
                    _id: "$userId",
                    stories: { $push: "$$ROOT" }
                }
            },
            {
                $sort: {
                    'stories._id': -1
                }
            },
            {
                $addFields: {
                    stories: {
                        $map: {
                            input: "$stories",
                            as: "story",
                            in: {
                                _id: "$$story._id",
                                userId: "$$story.userId",
                                content: "$$story.content",
                                backgroundColor: "$$story.backgroundColor",
                                caption: "$$story.caption",
                                storyType: "$$story.storyType",
                                att: "$$story.att",
                                fontType: "$$story.fontType",
                                expireAt: "$$story.expireAt",
                                createdAt: "$$story.createdAt",
                                updatedAt: "$$story.updatedAt",
                                viewedByMe: {
                                    $in: [myIdObj, "$$story.views.viewerId"]
                                }
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userData"
                }
            },
            {
                $project: {
                    _id: 0,
                    stories: 1,
                    userData: { $arrayElemAt: ["$userData", 0] }
                }
            },
            {
                $project: {
                    stories: 1,
                    userData: {
                        fullName: 1,
                        _id: 1,
                        userImage: 1
                    }
                }
            }
        ];
    }
    async remove(dto) {
        let story = await this.storyService.findByIdOrThrow(dto.id);
        if (story.userId != dto.myUser._id)
            throw new common_1.ForbiddenException("You dont have access to delete story not belong to you");
        await this.storyService.findByIdAndDelete(dto.id);
        return "Deleted";
    }
    async addView(dto) {
        await this.storyService.findOneAndUpdate({
            _id: dto.id,
            "views.viewerId": { $ne: (0, utils_1.newMongoObjId)(dto.myUser._id) },
            userId: { $ne: dto.myUser._id },
        }, {
            $addToSet: {
                views: {
                    viewerId: (0, utils_1.newMongoObjId)(dto.myUser._id),
                    viewedAt: new Date(),
                },
            },
        }, null);
        return "added";
    }
    async getView(dto, query) {
        let story = await this.storyService.findByIdOrThrow(dto.id);
        if (story.userId != dto.myUser._id)
            throw new common_1.BadRequestException("This not your story!");
        let storyId = (0, utils_1.newMongoObjId)(dto.id);
        let page = 1;
        let limit = 30;
        if (query["page"]) {
            page = query["page"];
        }
        if (query["limit"]) {
            limit = query["limit"];
        }
        let skip = (page - 1) * limit;
        return this.storyService.aggregate([
            {
                $match: {
                    _id: storyId,
                },
            },
            {
                $unwind: "$views",
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "views.viewerId",
                    foreignField: "_id",
                    as: "views.viewerInfo",
                },
            },
            {
                $unwind: "$views.viewerInfo",
            },
            {
                $group: {
                    _id: "$_id",
                    views: {
                        $push: {
                            viewerId: "$views.viewerId",
                            viewedAt: "$views.viewedAt",
                            viewerInfo: "$views.viewerInfo",
                        },
                    },
                },
            },
            {
                $project: {
                    "views.viewerInfo._id": 1,
                    "views.viewedAt": 1,
                    "views.viewerInfo.fullName": 1,
                    "views.viewerInfo.bio": 1,
                    "views.viewerInfo.userImages": 1,
                },
            },
        ]);
    }
    async myStories(myId) {
        let myIdObj = (0, utils_1.newMongoObjId)(myId);
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 30,
                page: 1,
                sort: "-_id",
            },
        }).get();
        return await this.storyService.aggregateV2(this.storyStages(myIdObj, {
            expireAt: { $gte: new Date() },
            userId: myIdObj,
        }), paginationParameters[1].page, paginationParameters[1].limit);
    }
    async _uploadFile(_mediaFile, myUser) {
        let uploaderDto = new create_s3_uploader_dto_1.CreateS3UploaderDto();
        uploaderDto.mediaBuffer = _mediaFile.buffer;
        uploaderDto.myUser = myUser;
        uploaderDto.fileName = _mediaFile.originalname;
        return await this.s3.uploadChatMedia(uploaderDto);
    }
};
UserStoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [story_service_1.StoryService,
        file_uploader_service_1.FileUploaderService,
        user_ban_service_1.UserBanService,
        user_service_1.UserService,
        story_attachment_service_1.StoryAttachmentService])
], UserStoryService);
exports.UserStoryService = UserStoryService;
//# sourceMappingURL=user_story.service.js.map