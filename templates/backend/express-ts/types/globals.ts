import type { Request } from 'express';

export enum HttpStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  OK = 200
}

export interface IPayload {
  payload: Record<string, any>;
  method: Request['method']
};

export type TSetHttpStatus = (status: HttpStatusCodes) => void;
