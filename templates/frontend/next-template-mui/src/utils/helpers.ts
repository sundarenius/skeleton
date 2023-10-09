import { WebStorageKeys } from "@/types/globals";

const browserOnlyCode = (callback: any) => {
  if (typeof window !== 'undefined') {
    // Access window object here
    return callback();
  }
}

export const setWebStorage = (key: string, v: any) => browserOnlyCode(() => {
  const value = JSON.stringify(v);
  window.sessionStorage.setItem(key, value);
  window.localStorage.setItem(key, value);
});

export const getWebStorage = (key: string) => browserOnlyCode(() => {
  const storage = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
  try {
    return storage && JSON.parse(storage);
  } catch {
    return storage;
  }
});

export const clearWebStorage = () => browserOnlyCode(() => {
  sessionStorage.clear();
  localStorage.clear();
});

export const initAuth = async (setIsAuth: (b: boolean) => void) => browserOnlyCode(async () => {
  const userSession = getWebStorage(WebStorageKeys.SESSION_DATA);
  if (userSession) {
    // make redirect to either /session or startpage depending on auth status, if already on correct path, keep going.
    const shouldRedirect = false;
    if (shouldRedirect) {
      return null;
    }
  } else if (window.location.pathname.includes('/session')) {
    // no session data found and should be on start path
    window.location.replace('/');
    return null;
  }

  await new Promise(res => setTimeout(() => {
    res('null');
  }, 500));

  setIsAuth(true);
})