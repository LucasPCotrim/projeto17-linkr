import axios from 'axios';
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:5000/'
    : process.env.REACT_APP_API_BASE_URL;

function getToken() {
  const auth = JSON.parse(localStorage.getItem('linkr'));
  return auth?.token;
}

function login(body) {
  const promise = axios.post(`${BASE_URL}sign-in`, body);
  return promise;
}

const publishPost = (data, token) => {
  return axios.post(`${BASE_URL}posts`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

function getPosts(limit = 20) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}posts?limit=${limit}`, config);
  return promise;
}

export { getToken, login, publishPost, getPosts };
