import "reflect-metadata";
import CommonDto from "../../../core/common/dto/common.dto";
export default class UpdatePasswordDto extends CommonDto {
    oldPassword?: string;
    newPassword?: string;
    logoutFromAll: boolean;
}
