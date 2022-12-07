import { Environments } from 'types/globals';

const config = {
  [Environments.PRODUCTION]: {
    apiEndpoint: 'https://someapp-rajraj-heroku.com',
  },
  [Environments.DEVELOPMENT]: {
    apiEndpoint: 'http://localhost:3030',
  },
};

export default config;
