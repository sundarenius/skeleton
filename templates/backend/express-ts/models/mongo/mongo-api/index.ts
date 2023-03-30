import clc from 'cli-color';
import { MongoGetAPI } from './get';
import { MongoUpdateAPI } from './update';
import { MongoCreateAPI } from './create';
import { MongoDeleteAPI } from './delete';

export const logMongoEvent = (msg: string) => {
  console.log(clc.greenBright(msg));
};

export const MongoAPI = {
  ...MongoGetAPI,
  ...MongoUpdateAPI,
  ...MongoCreateAPI,
  ...MongoDeleteAPI,
};
