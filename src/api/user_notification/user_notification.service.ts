/**
 * Copyright 2023, the hatemragab project author.
 * All rights reserved. Use of this source code is governed by a
 * MIT license that can be found in the LICENSE file.
 */

import { Injectable, NotFoundException } from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, PaginateModel, QueryOptions, UpdateQuery  } from "mongoose";
import { IUserNotification } from "./entities/user_notification.entity";
import { BaseService } from "../../core/common/base.service";


@Injectable()
export class UserNotificationService extends BaseService<IUserNotification> {
  constructor(
    @InjectModel("user_notification") private readonly model: PaginateModel<IUserNotification>
  ) {
    super();
  }
  
  
  // create(obj: Partial<IUserNotification>, session?): Promise<any> {
  //   return Promise.resolve(this.model.create([obj], { session }));
  // }

  async create(obj: Partial<IUserNotification>, session?: any): Promise<IUserNotification> {
    const createdNotification = await this.model.create([obj], session ? { session } : {});
    return createdNotification[0]; // Ensure returning the first element from array
  }

  deleteMany(filter: FilterQuery<IUserNotification>): Promise<any> {
    return Promise.resolve(this.model.deleteMany(filter));
  }

  deleteOne(filter: FilterQuery<IUserNotification>): Promise<any> {
    return Promise.resolve(this.model.deleteOne(filter));
  }

  // findAll(
  //   filter?: FilterQuery<IUserNotification> | undefined,
  //   select?: string | null | undefined,
  //   options?: QueryOptions<IUserNotification> | null | undefined
  // ) {
  //   return Promise.resolve(this.model.find(filter, select, options));
  // }


  // get all notifications with optional receiver_id and sender_id filters
  async findAll(
    filter: FilterQuery<IUserNotification> = {}, // Default to an empty object if no filter is provided
    select?: string | null,
    options?: QueryOptions<IUserNotification> | null,
    receiver_id?: string,
    sender_id?: string
  ) {
    // Only apply receiver_id to filter if it's provided
    if (receiver_id) {
      filter = { ...filter, receiver_id }; // Apply receiver_id filter
    }
  
    // Only apply sender_id to filter if it's provided
    if (sender_id) {
      filter = { ...filter, sender_id }; // Apply sender_id filter
    }
  
    return this.model.find(filter, select, options); // Execute the query with the final filter
  }
  
  findById(
    id: string,
    select?: string
  ): Promise<IUserNotification | null> {
    return Promise.resolve(this.model.findById(id, select));
  }

  findByIdAndDelete(id: string): Promise<any> {
    return Promise.resolve(this.model.findByIdAndDelete(id));
  }

  findByIdAndUpdate(
    id: string,
    update: UpdateQuery<IUserNotification>
  ): Promise<any> {
    return Promise.resolve(this.model.findByIdAndUpdate(id, update));
  }

  updateMany(
    filter: FilterQuery<IUserNotification>,
    update: UpdateQuery<IUserNotification>,
    options?: QueryOptions<IUserNotification> | null | undefined
  ): Promise<any> {
    return Promise.resolve(this.model.updateMany(filter, update, options));
  }

  async findByIdOrThrow(
    id: string,
    select?: string | null | undefined
  ): Promise<IUserNotification> {
    let m = await this.findById(id, select);
    if (!m)
      throw new NotFoundException(
        "country with id " + id + " not found in db"
      );
    return m;
  }

  // findByRoomId(
  //   roomId: string,
  //   select?: string | null | undefined,
  //   options?: QueryOptions<IUserNotification> | null | undefined
  // ) {
  //   return Promise.resolve(this.findAll({ rId: roomId }, select, options));
  // }

  // find notifications by roomId with optional receiver_id and sender_id filters
  findByRoomId(
    roomId: string,
    select?: string | null,
    options?: QueryOptions<IUserNotification> | null,
    receiver_id?: string,
    sender_id?: string
  ) {
    // Start with the basic filter for roomId
    let filter: FilterQuery<IUserNotification> = { rId: roomId };
  
    // Only apply receiver_id to filter if it's provided
    if (receiver_id) {
      filter.receiver_id = receiver_id;
    }
  
    // Only apply sender_id to filter if it's provided
    if (sender_id) {
      filter.sender_id = sender_id;
    }
  
    return this.findAll(filter, select, options); // Use the modified filter
  }
  

  findByRoomIdAndDelete(
    roomId: string,
    filter: FilterQuery<IUserNotification>
  ): Promise<any> {
    return Promise.resolve(this.deleteMany({ rId: roomId }));
  }


  // findOne(
  //   filter: FilterQuery<IUserNotification>,
  //   select?: string,
  //   options?: QueryOptions<IUserNotification>
  // ): Promise<IUserNotification | null> {
  //   return Promise.resolve(this.model.findOne(filter, select, options));
  // }


   // find a single notification with filters and optional receiver_id and sender_id
   findOne(
    filter: FilterQuery<IUserNotification>,
    select?: string,
    options?: QueryOptions<IUserNotification>,
    receiver_id?: string,   // receiver_id ko optional parameter bana diya
    sender_id?: string      // sender_id ko optional parameter bana diya
  ): Promise<IUserNotification | null> {
    if (receiver_id) {
      filter = { ...filter, receiver_id };
    }
    if (sender_id) {
      filter = { ...filter, sender_id };
    }

    return Promise.resolve(this.model.findOne(filter, select, options));
  }

  createMany(obj: Array<Partial<IUserNotification>>, session): Promise<any> {
    return Promise.resolve(this.model.create(obj, { session }));
  }

  findOneAndUpdate(
    filter: FilterQuery<IUserNotification>,
    update: UpdateQuery<IUserNotification>,
    session?,
    options?: QueryOptions<IUserNotification>
  ): Promise<IUserNotification | null> {
    return Promise.resolve(
      this.model.findOneAndUpdate(filter, update, options).session(session)
    );
  }

  findCount(filter: FilterQuery<IUserNotification>, session?): Promise<any> {
    return Promise.resolve(this.model.estimatedDocumentCount(filter).session(session));
  }

  aggregate(stages: any[]): Promise<any> {
    return Promise.resolve(this.model.aggregate(stages));
  }

  paginate(paginationParameters: any[]) {
    return Promise.resolve(this.model.paginate(...paginationParameters));
  }

}
