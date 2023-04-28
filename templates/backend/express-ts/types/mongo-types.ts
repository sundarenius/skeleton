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
  TEST: `${process.env.APP_NAME}-${process.env.NODE_ENV}-test`,
  CUSTOMERS: `${process.env.APP_NAME}-${process.env.NODE_ENV}-customers`,
  BOOKINGS: `${process.env.APP_NAME}-${process.env.NODE_ENV}-bookings`,
  INVOICING: `${process.env.APP_NAME}-${process.env.NODE_ENV}-invoicing`,
};

export enum Collections {
  TEST = 'test',
  STAFF = 'staff',
  USERS = 'users',
  CUSTOMER = 'customer',
  TEXTS = 'texts',
  APPOINTMENTS = 'appointments',
  FEEDBACK = 'feedback',
  INVOICES = 'invoices'
};
