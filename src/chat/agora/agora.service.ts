/**
 * Copyright 2023, the hatemragab project author.
 * All rights reserved. Use of this source code is governed by a
 * MIT license that can be found in the LICENSE file.
 */

import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import * as newAgora from "agora-token" ;
import {RtcTokenBuilder} from "agora-token";

@Injectable()
export class AgoraService {
    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    getAgoraAccessNew(channelName: string, create: boolean) {
        let role = newAgora.RtcRole.PUBLISHER;
        let expireTime = 3600
        let currentTime = Math.floor(Date.now() / 1000);
        let privilegeExpireTime = currentTime + expireTime;
        let token = RtcTokenBuilder.buildTokenWithUid(
            "ca89167169aa4ba293aaa4c669fd25c4",
            "461a128969dc432e9f1afdf02d0a079c",
            channelName,
            0,
            role,
            expireTime,
            privilegeExpireTime,
        );
        return ({
            'channelName': channelName,
            'uid': 0,
            'rtcToken': token,
            'joinedAt': new Date()
        });
    }

    getAgoraAccess(channelName: string, userId: string, create: boolean) {
        return this.getAgoraAccessNew(channelName, create)
    }
}
