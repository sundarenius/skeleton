export enum OperationTypes {
  INSERT_MANY = 'insertMany',
  INSERT_ONE = 'insertOne',
  FIND = 'find',
  DELETE_MANY = 'deleteMany',
  DELETE_ONE = 'deleteOne',
  UPDATE_ONE = 'updateOne',
  REPLACE_ONE = 'replaceOne',
}

export enum Dbs {
  ORDERS = 'orders',
  CLOTHES = 'clothes', // samt structure as CLOTHES_TO_REVIEW
  CLOTHES_TO_REVIEW = 'clothesToReview',
  ADDED_ITEMS_ID = 'addedItemsId',
}

export enum DbCollections {
  MEN = 'men',
  WOMEN = 'women'
}
