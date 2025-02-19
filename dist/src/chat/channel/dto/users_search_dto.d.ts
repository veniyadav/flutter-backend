import CommonDto from "../../../core/common/dto/common.dto";
export declare class UsersSearchDto extends CommonDto {
    limit?: number;
    page?: number;
    fullName?: string;
    isAsc?: boolean;
    getFilter(filterKey: string): {};
}
