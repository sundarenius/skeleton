import {
  WebStorageKeys,
} from 'types/globals';
import type {
  ISessionStorageData,
} from 'types/globals';

export const isAuth = async () => {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 700);
  });

  const sessionData = getWebStorage(WebStorageKeys.SESSION_DATA) || {};
  console.log('sessionData');
  console.log(sessionData);

  if (sessionData) {
    // Make a check against API later to validate token
    const isValidToken = sessionData.USER_TOKEN && true;
    return {
      ...sessionData,
      isAuthenticated: isValidToken,
    };
  }

  return {
    isAuthenticated: false,
  };
};

export const setWebStorage = (key, v) => {
  const value = JSON.stringify(v);
  window.sessionStorage.setItem(key, value);
  window.localStorage.setItem(key, value);
};

export const getWebStorage = (key) => {
  const storage = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
  return storage && JSON.parse(storage);
};

export const clearWebStorage = () => {
  sessionStorage.clear();
  localStorage.clear();
};

export const updateSessionStorageData = (newKeys: Partial<ISessionStorageData>) => {
  const currentStorage = getWebStorage(WebStorageKeys.SESSION_DATA);
  setWebStorage(
    WebStorageKeys.SESSION_DATA,
    {
      ...currentStorage,
      ...newKeys,
    } as ISessionStorageData,
  );
};
