"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStoryModule = void 0;
const common_1 = require("@nestjs/common");
const user_story_service_1 = require("./user_story.service");
const user_story_controller_1 = require("./user_story.controller");
const story_module_1 = require("../story/story.module");
const auth_module_1 = require("../../auth/auth.module");
const user_module_1 = require("../../user_modules/user/user.module");
const file_uploader_module_1 = require("../../../common/file_uploader/file_uploader.module");
const ban_module_1 = require("../../ban/ban.module");
const user_ban_module_1 = require("../../user_modules/user_ban/user_ban.module");
const story_attachment_module_1 = require("../story_attachment/story_attachment.module");
let UserStoryModule = class UserStoryModule {
};
UserStoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_story_controller_1.UserStoryController],
        providers: [user_story_service_1.UserStoryService],
        imports: [
            story_module_1.StoryModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            file_uploader_module_1.FileUploaderModule,
            ban_module_1.BanModule,
            user_ban_module_1.UserBanModule,
            story_attachment_module_1.StoryAttachmentModule
        ]
    })
], UserStoryModule);
exports.UserStoryModule = UserStoryModule;
//# sourceMappingURL=user_story.module.js.map