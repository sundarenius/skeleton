export enum HttpStatusCodes {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  OK = 200
}

export type TPayload = Record<any, any>;
export type TSetHttpStatus = (status: HttpStatusCodes) => void;
