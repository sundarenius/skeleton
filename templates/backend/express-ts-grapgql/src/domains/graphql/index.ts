import { IPayload } from '../../types/globals';

interface IPayloadData {}

const main = async (payload: IPayload<IPayloadData>) => {
  console.log('main triggered');
  console.log(payload);
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  })
  
  return {
    body: {
      test: 'hej från graphql.js',
    },
    statusCode: 200
  }
}

export default main;
