import { Environments } from '@/types/globals';

const config: Record<Environments, any> = {
  [Environments.PRODUCTION]: {
    apiEndpoint: 'https://someapp-rajraj-heroku.com/api',
  },
  [Environments.TEST]: {
    apiEndpoint: 'https://someapp-rajraj-heroku.com/api',
  },
  [Environments.STAGING]: {
    apiEndpoint: 'https://someapp-rajraj-heroku.com/api',
  },
  [Environments.DEVELOPMENT]: {
    apiEndpoint: 'http://localhost:3030/api',
  },
};

export default config;
