import axios from "axios";

const BASE_URL = "https://projeto-linkr-backend.herokuapp.com/";
//const BASE_URL = "http://localhost:5000/";

function getToken() {
  const dateNow = new Date();
  const auth = JSON.parse(localStorage.getItem("linkr"));
  if (dateNow - auth.dateLogin > 7200000) {
    localStorage.removeItem("linkr");
    return;
  }
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

function getPosts({ limit = 10, offset = 0 }) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(
    `${BASE_URL}posts?limit=${limit}&offset=${offset}`,
    config
  );
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

function getPageUser(id, limit = 20) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}user/${id}?limit=${limit}`, config);
  return promise;
}

function getUsersList(string, limit = 20) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(
    `${BASE_URL}searchName/${string}?limit=${limit}`,
    config
  );
  return promise;
}

function checkFollow(user, follower) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(
    `${BASE_URL}follow/${user}?followerId=${follower}`,
    config
  );
  return promise;
}

function followUser(body) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(`${BASE_URL}follow`, body, config);
  return promise;
}

function unfollowUser(user, follower) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.delete(
    `${BASE_URL}follow/${user}?followerId=${follower}`,
    config
  );
  return promise;
}

function repost(id) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.post(`${BASE_URL}reposts/${id}`, [], config);
  return promise;
}

function getRepostsQnt(id) {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}reposts/${id}`, config);
  return promise;
}

const insertComment = (data, id) => {
  const token = getToken();
  return axios.post(`${BASE_URL}posts/comments/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getComments = (id) => {
  const token = getToken();
  return axios.get(`${BASE_URL}posts/comments/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

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
  getPageUser,
  getHashtagList,
  getHashtag,
  getUsersList,
  checkFollow,
  followUser,
  unfollowUser,
  repost,
  getRepostsQnt,
  insertComment,
  getComments,
};
