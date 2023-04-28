import type { Request } from 'express';

export enum HttpStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  OK = 200
}

export interface IPayload<I> {
  payload: I;
  method: Request['method']
};

export enum Templates {
  STANDARD_WHITE = 'standard-white'
}

export type TSetHttpStatus = (status: HttpStatusCodes) => void;

export enum Currencies {
  SEK = 'SEK'
}

export interface IFilter {
  from?: number
  end?: number,
}
