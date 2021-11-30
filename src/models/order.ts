import { SupplySnapshot } from './supply';
import { UserSnapshot } from './user';

export enum OrderStatus {
  CREATED,
  CONFIRMING,
  PAID,
  DELIVERED,
  DECLINED,
}

export interface Order {
  id: string;
  buyer: UserSnapshot;
  seller: UserSnapshot;
  supply: SupplySnapshot;
  demand: any;
  amount: number;
  status: OrderStatus;
  createdOn: string;
  modifiedOn: string;
}

export interface PostOrderBody {
  supplyId: string;
  chatId: string;
}

export interface PutOrderBody {
  chatId: string;
}