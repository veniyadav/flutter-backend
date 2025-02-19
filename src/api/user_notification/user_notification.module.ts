/**
 * Copyright 2023, the hatemragab project author.
 * All rights reserved. Use of this source code is governed by a
 * MIT license that can be found in the LICENSE file.
 */

import { Module } from "@nestjs/common";
import { UserNotificationService } from "./user_notification.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserNotificationSchema } from "./entities/user_notification.entity";

@Module({
  providers: [UserNotificationService],
  exports: [UserNotificationService],
  imports: [
    MongooseModule.forFeature([{
      name: "user_notification",
      schema: UserNotificationSchema
    }])
  ]
})
export class UserNotificationModule {
}

