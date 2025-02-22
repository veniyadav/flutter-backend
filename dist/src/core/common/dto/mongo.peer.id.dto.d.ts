import CommonDto from "./common.dto";
import { IUser } from "../../../api/user_modules/user/entities/user.entity";
export declare class MongoPeerIdDto extends CommonDto {
    constructor(peerId: string, myUser: IUser);
    peerId: string;
}
