import clc from 'cli-color';
import express from 'express';
import type { Response, Request } from 'express';
import { domains } from '../../models/domains/index';
import { IPayload, IFilter } from '../../types/globals';

const apiRouter = express.Router();

const getPath = () => `http://localhost:${process.env.PORT || '3030'}/api/v1`;

const formatResponse = (body: IPayload<Record<any, any>>['payload'], statusCode: number, res: Response) => {
  if (Object.keys(body).length > 0) delete body._id;
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

const middleware = (domain: (body: IPayload<unknown>) => Promise<any>) => async (req: Request, res: Response) => {
  const method: Request['method'] = req.method;
  console.log(`method: ${method}`);
  const payload = Object.keys(req.body).length > 0 ? req.body : req.query;
  console.log('payload:');
  console.log(payload);
  payload.filter = {} as IFilter;
  if (payload['filter.from']) { payload.filter.from = Number(payload['filter.from']) };
  if (payload['filter.end']) { payload.filter.end = Number(payload['filter.end']) };
  const { body, statusCode } = await domain(<IPayload<unknown>>{
    payload,
    method
  });
  formatResponse(body, statusCode, res);
}


// ***************** ROUTES *****************

const methods = {
  GET: 'get',
  POST: 'post'
}

const routes = [
  {
    path: '/',
    domain: domains.main,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/staff',
    domain: domains.staff,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/users',
    domain: domains.users,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/customer',
    domain: domains.customer,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/texts',
    domain: domains.texts,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/appointments',
    domain: domains.appointments,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/feedback',
    domain: domains.feedback,
    methods: [methods.GET, methods.POST]
  },
  {
    path: '/set-paid',
    domain: domains.paid,
    methods: [methods.POST]
  },
];

console.log(clc.white(`
*********** ROUTES ***********`,
  ));
routes.forEach(route => {
  if (route.methods.includes(methods.GET)) {
    apiRouter.get(route.path, middleware(route.domain));
    console.log(`GET: ${clc.green(getPath())}${clc.blueBright(route.path)}`);
  }
  if (route.methods.includes(methods.POST)) {
    apiRouter.post(route.path, middleware(route.domain));
    console.log(`POST: ${clc.green(getPath())}${clc.blueBright(route.path)}`);
  }
});
console.log(clc.white('*********** ROUTES ***********'));

// ***************** ROUTES *****************

export default apiRouter;
