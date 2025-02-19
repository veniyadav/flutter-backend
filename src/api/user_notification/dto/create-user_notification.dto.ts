/**
 * Copyright 2023, the hatemragab project author.
 * All rights reserved. Use of this source code is governed by a
 * MIT license that can be found in the LICENSE file.
 */

import CommonDto from "../../../core/common/dto/common.dto";
import { IsEnum, IsString } from "class-validator";

export class CreateUserNotificationDto extends CommonDto {
  imageBuffer?: Buffer;
  @IsString()
  content: string;

  @IsString()
  title: string;

  @IsString()
  receiver_id: string;

  @IsString()
  sender_id: string;

  imageUrl?:string

}
