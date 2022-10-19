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
  const promise = axios.post(`${URL_BASE}/sign-in`, body);
  return promise;
}
export { getToken, login };
