/**
 * Copyright 2023, the hatemragab project author.
 * All rights reserved. Use of this source code is governed by a
 * MIT license that can be found in the LICENSE file.
 */

import mongoose from "mongoose";
import {Platform} from "../../../core/utils/enums";
import pM from "mongoose-paginate-v2";

export interface IUserNotification {
    content: string,
    title: string,
    receiver_id: string,
    sender_id: string,
    imageUrl?: string,
}


export const UserNotificationSchema = new mongoose.Schema(
    {
        content: {type: String, required: true},
        title: {type: String, required: true},
        receiver_id: {type: String, required: true},
        sender_id: {type: String, required: true},
        imageUrl: {type: String,}
    },
    {
        timestamps: true
    }
);
UserNotificationSchema.plugin(pM)






