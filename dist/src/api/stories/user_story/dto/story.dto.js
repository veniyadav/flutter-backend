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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStoryDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../core/utils/enums");
const common_dto_1 = __importDefault(require("../../../../core/common/dto/common.dto"));
class CreateStoryDto extends common_dto_1.default {
    toJson() {
        return {
            storyType: this.storyType,
            caption: this.caption,
            textAlign: this.textAlign,
            textColor: this.textColor,
            backgroundColor: this.backgroundColor,
            att: this.att,
            userId: this.myUser._id,
            fontType: this.fontType,
            content: this.content,
            somePeople: this.somePeople,
            storyPrivacy: this.storyPrivacy,
            expireAt: this.getExpireAt(),
        };
    }
    getExpireAt() {
        let currentDate = new Date();
        return new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
    }
    isImage() {
        if (this.storyType == enums_1.StoryType.Image) {
            return true;
        }
    }
    isVideo() {
        if (this.storyType == enums_1.StoryType.Video) {
            return true;
        }
    }
    isText() {
        if (this.storyType == enums_1.StoryType.Text) {
            return true;
        }
    }
    isVoice() {
        if (this.storyType == enums_1.StoryType.Voice) {
            return true;
        }
    }
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.StoryType),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "storyType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.StoryPrivacy),
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object["storyPrivacy"]),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "storyPrivacy", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object["storyPrivacy"] == enums_1.StoryPrivacy.SomePeople),
    __metadata("design:type", Object)
], CreateStoryDto.prototype, "somePeople", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(attachmentValidationStory),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "attachment", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "textColor", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.IsEnum)(enums_1.StoryTextAlign),
    (0, class_validator_1.ValidateIf)(object => object["textAlign"]),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "textAlign", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "caption", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.StoryFontType),
    (0, class_validator_1.ValidateIf)(object => object["storyType"] == enums_1.StoryType.Text),
    __metadata("design:type", String)
], CreateStoryDto.prototype, "fontType", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], CreateStoryDto.prototype, "exceptPeople", void 0);
exports.CreateStoryDto = CreateStoryDto;
function attachmentValidationStory(object) {
    let mT = object["storyType"];
    return mT != enums_1.StoryType.Text;
}
//# sourceMappingURL=story.dto.js.map