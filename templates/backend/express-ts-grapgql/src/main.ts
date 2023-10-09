import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import apiRouter from './routes/api-router';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/types/typeDefs';
import { resolvers } from './graphql/resolvers/resolvers';

// eslint-disable-next-line no-underscore-dangle

const app: any = express();

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

const initExpressConfig = async () => {
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

  await initApolloServer();

  // error handlers
  app.use((req: any, res: any, next: any) => {
    next(createError(404));
  });
  app.use((err: any, req: any, res: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
}

const initApolloServer = async () => {
  // graphql route not working
  interface ApolloContext {
    token?: String;
  }
  const server = new ApolloServer<ApolloContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );
}

export default initExpressConfig;
