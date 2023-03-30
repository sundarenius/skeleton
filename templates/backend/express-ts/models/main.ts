import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import apiRouter from '../controllers/routes/api-router';

// eslint-disable-next-line no-underscore-dangle

const app = express();

const whiteListedOrigins: string[] = [
  'http://localhost:5000',
  'http://localhost:8080',
];

const corsOptionsDelegate = (req: any, callback: any) => {
  let corsOptions;
  if (whiteListedOrigins.includes(req.header('Origin'))) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Custom middlewares
app.use((res: any, req: any, next: any) => {
  console.log('Custom middleware triggered, doing nothing');
  next();
});

app.use('/api/v1', apiRouter);

app.use((req: any, res: any, next: any) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
