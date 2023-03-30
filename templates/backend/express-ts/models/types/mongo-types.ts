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
  TEST_DB: `${process.env.NODE_ENV}_test_db`
};

export enum Collections {
  TEST_COLLECTION = 'testCollection'
};