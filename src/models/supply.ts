import { Category } from './category';
import { Location, LocationSnapshot } from './location';
import { Spec } from './spec';
import { User } from './user';

export enum ProductStatus {
  '99%',
  '90%',
  '80%',
  '<80%',
}

export enum SupplyStatus {
  WAITING,
  DECLINED,
  ACTIVE,
  SOLD,
}

export enum SupplyStatusText {
  'Chờ kiểm duyệt',
  'Không hợp lệ',
  'Đang bán',
  'Đã bán',
}

export interface Supply {
  _id?: string;
  id: string;
  owner: User;
  name: string;
  price: number;
  description: string;
  services: any[];
  specs: Spec[];
  images: string[];
  thumbnail: string;
  categories: Category[];
  locations: Location[];
  address: string;
  productStatus: ProductStatus;
  status: SupplyStatus;
  createdOn: string;
  modifiedOn: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostSupply {
  images: string[];
  thumbnail: string;
  name: string;
  price: number;
  description: string;
  specs: Record<string, string>[];
  categories: string[];
  locations: string[];
  address: string;
  productStatus: number;
}

export interface PostSupplyStep<T = Record<string, any>> {
  title: string;
  content: T;
  finished: boolean;
}

export interface SupplyQueryParams {
  page: number;
  categorySlug?: string;
  queryText?: string;
}

export type SupplyWithSelected = Supply & {
  selected: boolean;
};

export type SupplySnapshot = Pick<
  Supply,
  'id' | 'name' | 'price' | 'thumbnail'
> & {
  locations: LocationSnapshot[];
};
