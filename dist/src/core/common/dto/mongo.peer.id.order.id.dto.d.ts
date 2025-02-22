import { MongoPeerIdDto } from "./mongo.peer.id.dto";
export declare class CreateOrderRoomDto extends MongoPeerIdDto {
    orderId: string;
    orderImage?: string;
    orderTitle?: string;
    orderData?: any;
}
