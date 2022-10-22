import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : process.env.REACT_APP_API_BASE_URL;

function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
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

const deletePost = (id, token) => {
  return axios.delete(`${BASE_URL}posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

function logout() {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}logout`, config);
  return promise;
}

function getPosts(limit = 20) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}posts?limit=${limit}`, config);
  return promise;
}

const logOn = (body) => {
  return axios.post(`${BASE_URL}sign-up`, body);
};

const getHashtagList = () => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}hashtag`, config);
  return promise;
};

const getHashtag = (hashtag) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}hashtag/${hashtag}`, config);
  return promise;
};

function updatePost(body) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.put(`${BASE_URL}posts/update`, body, config);
  return promise;
}

function toggleLikePost(postId) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(
    `${BASE_URL}posts/${postId}/like/toggle`,
    {},
    config
  );
  return promise;
}

function getUser() {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}user`, config);
  return promise;
}

export {
  getToken,
  login,
  publishPost,
  getPosts,
  logOn,
  logout,
  updatePost,
  toggleLikePost,
  getUser,
  deletePost,
  getHashtagList,
  getHashtag,
};
