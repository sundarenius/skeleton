import type { Response } from 'express';

export const formatResponse = (body: Record<any, any>, statusCode: number, res: Response) => {
  const options = {
    statusCode,
    body: JSON.stringify({
      success: statusCode === 200 ? 'true' : 'false',
      statusCode,
      data: body
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