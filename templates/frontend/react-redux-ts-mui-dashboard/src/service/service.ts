import config from 'config';
import { store } from 'redux/store';
import { contextActions } from 'redux/actions';
import { WebStorageKeys } from 'types/globals';
import { getWebStorage } from 'utils/helpers';

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

const baseUrl = `${config[process.env.NODE_ENV].apiEndpoint}/api`;

const buildUrl = (path) => `${baseUrl}${path}`;

const fetchMethod = async (path, method, payload) => {
  try {
    const res = await fetch(buildUrl(path), {
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

const setIsFetching = (what: boolean) => store.dispatch(contextActions.setIsFetchingData(what));

export const API = {
  login: async () => {
    const path = '/login';
    const data = await fetchMethod(path, MethodTypes.GET, null);
    return data;
  },
  getMerchantData: async () => {
    setIsFetching(true);
    const path = '/merchant-data';
    const data = await fetchMethod(path, MethodTypes.GET, null);
    setIsFetching(false);
    return data;
  },
};
