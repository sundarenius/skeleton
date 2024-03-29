import type { Response } from 'express';
import type { IPayload } from '../types/globals';
import { HttpStatusCodes } from '../types/globals';

export const formatResponse = (
  body: IPayload<Record<any, any>>['payload'],
  statusCode: number,
  res: Response,
) => {
  if (Object.keys(body).length > 0) {
    deleteSensitive(body);
  }

  const options = {
    statusCode,
    body: JSON.stringify({
      success: statusCode === 200 ? 'true' : 'false',
      statusCode,
      data: body,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'content-type': 'application/json',
    },
  };
  res.status(statusCode);
  res.header(options.headers);
  res.send(options.body);
};

export const deleteSensitive = (data: any) => {
  if (Array.isArray(data)) {
    data.forEach((d) => {
      // eslint-disable-next-line no-underscore-dangle
      delete d._id;
      delete d.TID;
      delete d.pwd;
      delete d.blockedUsers;
    })
  } else {
    // eslint-disable-next-line no-underscore-dangle
    delete data._id;
    delete data.TID;
    delete data.pwd;
    delete data.blockedUsers;
  }
};

export const getModelData = <IEntity>(allRequired: boolean, data: Record<any, any>) => {
  // Remove properties with undefined values
  Object.keys(data).forEach((key) => {
    if (allRequired && data[key] === undefined) {
      throw new Error(`This method requires all fields ${HttpStatusCodes.BAD_REQUEST}`);
    }
    if (typeof data[key] === 'string') {
      data[key] = data[key].trim();
    }
    return data[key] === undefined && delete data[key];
  });

  return data as Partial<IEntity>;
};
