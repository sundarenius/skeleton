import { HttpStatusCodes, TPayload } from '../types/globals';
import { formatRes } from './index';
// import { MongoAPI } from '../mongo/mongo-api';

const login = async (payload: TPayload) => {
  const body = {
    msg: 'Login route not implemented',
  };
  
  return formatRes(body, HttpStatusCodes.OK);
}

export default login;
