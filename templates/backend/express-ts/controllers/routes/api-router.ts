import express from 'express';
import type { Response, Request } from 'express';
import loginRouter from './login-router';
import { formatResponse } from '../../models/utils/helpers';
import { domains } from '../../models/domains/index';

const apiRouter = express.Router();

// Set up routes here
apiRouter.use('/login', loginRouter);


// main (nothing should be implemented here)
apiRouter.post('/', async (req: Request, res: Response) => {
  const { body, statusCode } = await domains.main(req.body);
  formatResponse(body, statusCode, res);
});
apiRouter.get('/', async (req: Request, res: Response) => {
  const { body, statusCode } = await domains.main(req.query);
  formatResponse(body, statusCode, res);
});

export default apiRouter;
