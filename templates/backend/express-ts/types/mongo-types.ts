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
  TEST: `${process.env.NODE_ENV}-${process.env.APP_NAME}-test`,
  CUSTOMERS: `${process.env.NODE_ENV}-${process.env.APP_NAME}-customers`,
  BOOKINGS: `${process.env.NODE_ENV}-${process.env.APP_NAME}-bookings`,
};

export enum Collections {
  TEST = 'test',
  STAFF = 'staff',
  USERS = 'users',
  CUSTOMER_INFO = 'customer-info',
  TEXTS = 'texts',
  APPOINTMENTS = 'appointments',
  FEEDBACK = 'feedback'
};
