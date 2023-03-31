import express from 'express';
import type { Response, Request } from 'express';
import { domains } from '../../models/domains/index';
import { IPayload } from '../../types/globals';

const apiRouter = express.Router();

const formatResponse = (body: IPayload['payload'], statusCode: number, res: Response) => {
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

const middleware = (domain: (body: IPayload) => Promise<any>) => async (req: Request, res: Response) => {
  const method: Request['method'] = req.method;
  console.log(`method: ${method}`);
  const payload = Object.keys(req.body).length > 0 ? req.body : req.query;
  const { body, statusCode } = await domain(<IPayload>{
    payload,
    method
  });
  formatResponse(body, statusCode, res);
}


// ***************** ROUTES *****************

// main route (nothing should be implemented here)
apiRouter.post('/', middleware(domains.main));
apiRouter.get('/', middleware(domains.main));

// login route
apiRouter.post('/login', middleware(domains.login));
apiRouter.get('/login', middleware(domains.login));

// dummy route
apiRouter.post('/dummy', middleware(domains.dummy));
apiRouter.get('/dummy', middleware(domains.dummy));

// ***************** ROUTES *****************

export default apiRouter;
