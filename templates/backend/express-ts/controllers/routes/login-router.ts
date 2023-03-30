import express from 'express';
import type { Response, Request } from 'express';
import { formatResponse } from '../../models/utils/helpers';
import { domains } from '../../models/domains';

const apiRouter = express.Router();

apiRouter.post('/', async (req: Request, res: Response) => {
  const { body, statusCode } = await domains.login(req.body);
  formatResponse(body, statusCode, res);
});

apiRouter.get('/', async (req: Request, res: Response) => {
  const { body, statusCode } = await domains.login(req.query);
  formatResponse(body, statusCode, res);
});

export default apiRouter;
