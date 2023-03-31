export enum MongoDbTransactionTypes {
  INSERT_MANY = 'insertMany',
  INSERT_ONE = 'insertOne',
  FIND = 'find',
  DELETE_MANY = 'deleteMany',
  DELETE_ONE = 'deleteOne',
  UPDATE_ONE = 'updateOne',
  REPLACE_ONE = 'replaceOne',
}

// Make it const to set environment as prefix from process.env.NODE_ENV
export const Dbs = {
  TEST: `${process.env.NODE_ENV}_${process.env.APP_NAME}_test`,
  DUMMY: `${process.env.NODE_ENV}_${process.env.APP_NAME}_dummy`,
  USERS: `${process.env.NODE_ENV}_${process.env.APP_NAME}_users`,
};

export enum Collections {
  TEST = 'test',
  DUMMY = 'dummy',
  ALL_USERS = 'allUsers'
};