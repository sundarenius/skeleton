import config from '@/config';
import { WebStorageKeys } from '@/types/globals';
import { getWebStorage } from '@/utils/helpers';
import { Environments } from '@/types/globals';

const getUserToken = () => {
  const authToken = getWebStorage(WebStorageKeys.SESSION_DATA) || {};
  const authAsBase64 = window.btoa(authToken.USER_TOKEN);
  return authAsBase64;
};

enum MethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

type TRevalidate = number;

const baseUrl = `${config[process.env.NODE_ENV as Environments].apiEndpoint}/api`;

const buildUrl = (path: string) => `${baseUrl}${path}`;

const fetchMethod = async (path: string, method: MethodTypes, payload: any, revalidate: TRevalidate = 3600) => {
  try {
    const res = await fetch(buildUrl(path), {
      next: {
        revalidate,
      },
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${getUserToken()}`,
      },
      ...payload && { body: JSON.stringify(payload) },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log('failed');
    console.log(err);
    return false;
  }
};

export const API = {
  login: async (revalidate: TRevalidate) => {
    const path = '/login';
    const data = await fetchMethod(path, MethodTypes.GET, null, revalidate);
    return data;
  },
};
