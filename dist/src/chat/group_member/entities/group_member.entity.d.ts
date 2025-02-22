import { Document, Schema } from 'mongoose';
import { BaseUser } from "../../../core/utils/interfaceces";
import { GroupRoleType } from "../../../core/utils/enums";
export interface IGroupMember extends Document {
    uId: string;
    rId: string;
    userData: BaseUser;
    gR: GroupRoleType;
    createdAt: Date;
}
export declare const GroupMemberSchema: Schema;
