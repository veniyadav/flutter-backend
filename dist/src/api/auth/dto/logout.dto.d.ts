import CommonDto from "../../../core/common/dto/common.dto";
export default class LogoutDto extends CommonDto {
    password: string;
    logoutFromAll: boolean;
}
