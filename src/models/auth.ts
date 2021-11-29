import { User } from './user';

export interface RegisterationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthRequest {
  username: string;
  password: string;
  remember: boolean;
}

export interface AuthResponse {
  identifier: User;
  token: string;
}

export interface StepTwoForm {
  phoneNumber: string;
  province: string;
  ward: string;
  block: string;
  address: string;
}