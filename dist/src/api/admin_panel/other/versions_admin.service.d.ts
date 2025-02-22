/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { VersionsService } from "../../versions/versions.service";
import { CreateNewVersionDto, GetVersionDto } from "../dto/admin_dto";
import { MongoIdDto } from "../../../core/common/dto/mongo.id.dto";
export declare class VersionsAdminService {
    readonly versionsService: VersionsService;
    constructor(versionsService: VersionsService);
    setNewVersion(dto: CreateNewVersionDto): Promise<string>;
    getVersions(platform: GetVersionDto): Promise<(import("mongoose").Document<unknown, {}, import("../../versions/versions.entity").IVersion> & import("../../versions/versions.entity").IVersion & Required<{
        _id: string;
    }>)[]>;
    deleteVersion(id: MongoIdDto): Promise<string>;
}
