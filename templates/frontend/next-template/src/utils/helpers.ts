export const setWebStorage = (key: string, v: any) => {
  const value = JSON.stringify(v);
  window.sessionStorage.setItem(key, value);
  window.localStorage.setItem(key, value);
};

export const getWebStorage = (key: string) => {
  const storage = window.sessionStorage.getItem(key) || window.localStorage.getItem(key);
  return storage && JSON.parse(storage);
};

export const clearWebStorage = () => {
  sessionStorage.clear();
  localStorage.clear();
};