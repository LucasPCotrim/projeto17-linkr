import axios from "axios";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:5000/"
    : process.env.REACT_APP_API_BASE_URL;

function getToken() {
  const auth = JSON.parse(localStorage.getItem("linkr"));
  if (!auth) {
    return false
  }
  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  };

  return config;
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

function logout() {
  const config = getToken();
  const promise = axios.get(`${BASE_URL}logout`, config);
  return promise;
}


export { getToken, login, publishPost, logout };
