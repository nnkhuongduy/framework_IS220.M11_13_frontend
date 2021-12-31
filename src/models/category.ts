import { Spec } from './spec';

export enum CategoryLevel {
  PRIMARY,
  SECONDARY,
}

export enum CategoryStatus {
  NEW,
  ACTIVE,
  ARCHIVED,
}

export interface Category {
  _id?: string;
  id: string;
  name: string;
  image: string;
  categoryLevel: CategoryLevel;
  status: CategoryStatus;
  specs: Spec[];
  subCategories: string[];
  slug: string;
}
