"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryAttachmentModule = void 0;
const common_1 = require("@nestjs/common");
const story_attachment_service_1 = require("./story_attachment.service");
const mongoose_1 = require("@nestjs/mongoose");
const story_attachment_entity_1 = require("./entities/story_attachment.entity");
let StoryAttachmentModule = class StoryAttachmentModule {
};
StoryAttachmentModule = __decorate([
    (0, common_1.Module)({
        providers: [story_attachment_service_1.StoryAttachmentService],
        exports: [story_attachment_service_1.StoryAttachmentService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "story_attachment",
                    schema: story_attachment_entity_1.StoryAttachment
                }]),
        ]
    })
], StoryAttachmentModule);
exports.StoryAttachmentModule = StoryAttachmentModule;
//# sourceMappingURL=story_attachment.module.js.map