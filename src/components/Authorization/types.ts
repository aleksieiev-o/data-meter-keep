import {ZodRawShape, ZodString} from 'zod';

export interface IAuthUserCredentialsShape extends ZodRawShape {
  email: ZodString;
  password: ZodString;
}
