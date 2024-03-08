import {ZodRawShape, ZodString} from 'zod';

export interface IAuthUserCredentialsShape extends ZodRawShape {
  email: ZodString;
  password: ZodString;
}

export interface IUser {
  uid: string;
  displayName: string | null
  email: string | null
}
