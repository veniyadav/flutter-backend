import CommonDto from "./common.dto";
export declare class DefaultPaginateParams extends CommonDto {
    limit?: string;
    page?: string;
    getLimit(): number;
    getPage(): number;
}
