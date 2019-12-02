const headers = {
  'Content-Type': 'application/json'
};

const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

const json = response => response.json();

export const get = async url => {
  return await fetch(url, {
    method: 'GET',
    headers
  })
    .then(status)
    .then(json);
};

export const post = async (url, body) => {
  return await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  })
    .then(status)
    .then(json);
};

export const setAuthToken = token => {
  if (token) {
    headers['Authorization'] = token;
  } else {
    delete headers['Authorization'];
  }
};
