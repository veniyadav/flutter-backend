import { IUser } from "../../../api/user_modules/user/entities/user.entity";
export default class CommonDto {
    myUser: IUser;
}
export declare class DateRangeDto {
    constructor(args: {
        startDate: Date;
        endDate: Date;
    });
    startDate: string;
    endDate: string;
}
