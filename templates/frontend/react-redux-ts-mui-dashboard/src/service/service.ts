import config from 'config';

enum MethodTypes {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

const baseUrl = `${config[process.env.NODE_ENV].apiEndpoint}/api`;

const buildUrl = (path) => {
  const token = () => window.localStorage.token || null;
  const getToken = token();
  if (getToken) {
    return `${baseUrl}${path}${path.includes('&') ? '&' : '?'}token=${token()}`;
  }
  return `${baseUrl}${path}`;
};

const fetchMethod = async (path, method, payload) => {
  try {
    const res = await fetch(buildUrl(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
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

export const getSomething = async (x, y) => {
  const path = `/meetings?month=${x}&year=${y}`;
  const data = await fetchMethod(path, MethodTypes.GET, null);
  return data;
};
