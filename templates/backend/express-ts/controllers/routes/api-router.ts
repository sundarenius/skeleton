import express from 'express';
import loginRouter from './login-router';

const apiRouter = express.Router();

apiRouter.use('/auth/login', loginRouter);

apiRouter.get('/', (req: any, res: any) => {
  res.send({ success: true });
});

export default apiRouter;
