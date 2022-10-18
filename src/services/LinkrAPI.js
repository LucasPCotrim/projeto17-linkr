import axios from 'axios';
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:5000/'
    : process.env.REACT_APP_API_BASE_URL;

function getToken() {
  const auth = JSON.parse(localStorage.getItem('shortly'));
  return auth?.token;
}

export { getToken };
