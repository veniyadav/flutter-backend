<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).














/**
 * Copyright 2023, the hatemragab project author.
 * All rights reserved. Use of this source code is governed by a
 * MIT license that can be found in the LICENSE file.
 */

import {Injectable} from "@nestjs/common";
import {EventEmitter2} from "@nestjs/event-emitter";
import {UserService} from "../../api/user_modules/user/user.service";
import {UserDeviceService} from "../../api/user_modules/user_device/user_device.service";
import {NotificationType, PushTopics} from "../../core/utils/enums";
import {IMessage} from "../../chat/message/entities/message.entity";
import {RoomMemberService} from "../../chat/room_member/room_member.service";
import {RoomMiddlewareService} from "../../chat/room_middleware/room_middleware.service";
import {GroupMemberService} from "../../chat/group_member/group_member.service";
import {BroadcastMemberService} from "../../chat/broadcast_member/broadcast_member.service";
import {PushKeyAndProvider} from "../../core/utils/interfaceces";
import {IRoomMember} from "../../chat/room_member/entities/room_member.entity";
import {NotificationData} from "./notification.event";

export  const rExp: RegExp = new RegExp("\\[(@[^:]+):([^\\]]+)\]", "g");

@Injectable()
export class NotificationEmitterService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
    ) {
    }

    async adminNotification(title: string, body: string) {
        this.eventEmitter.emit("send.all.active", title, body);
    }

    async subscribeOnesignalTopic(token: string, topic: PushTopics) {
        this.eventEmitter.emit("topic.onesignal", {
            token,
            topic
        });
    }

    async subscribeFcmTopic(token: string, topic: PushTopics) {
        this.eventEmitter.emit("topic.fcm", {
            token,
            topic
        });
    }

    async unSubscribeFcmTopic(token: string, topic: PushTopics) {
        this.eventEmitter.emit("un.sub", {
            token,
            topic
        });
    }

    fcmSend(notificationData: NotificationData) {
        this.eventEmitter.emit("send.fcm", notificationData);
    }

    oneSignalSend(notificationData: NotificationData) {
        this.eventEmitter.emit("send.onesignal", notificationData);
    }

}