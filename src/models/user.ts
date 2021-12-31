import { Role } from './role';

export enum OauthProvider {
  Facebook,
  Google,
}

export enum UserStatus {
  PENDING,
  VERIFIED,
  ARCHIVED,
}

export enum Gender {
  'Nam',
  'Nữ',
  'Khác',
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  locationBlockRef: { id: string };
  locationBlock?: string;
  locationProvinceRef: { id: string };
  locationProvince?: string;
  locationWardRef: { id: string };
  locationWard?: string;
  sex: Gender;
  address?: string;
  phoneNumber?: string;
  avatar?: string;
  oauth: boolean;
  oauthProvider?: OauthProvider;
  role: Role;
  status: UserStatus;
  createdOn: string;
  modifiedOn: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type UserSnapshot = Pick<
  User,
  'id' | 'email' | 'firstName' | 'lastName' | 'avatar'
>;
