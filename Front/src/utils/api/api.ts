import axios from "axios";
import { Cookies } from "react-cookie";


// 쿠키 객체 생성



const api = axios.create({
  baseURL: "https://j8d110.p.ssafy.io/spring/",
  // baseURL: "https://j8d110.p.ssafy.io/testspring/",
  // withCredentials: true,
});

// // timeout 설정 4초
// // api.defaults.timeout = 4000;

// // axios interceptor로 헤더에 Authorization 설정
api.interceptors.request.use(function (config) {
  
  const userAccessToken = localStorage.getItem("userIsLogin");

  if (userAccessToken && JSON.parse(userAccessToken) === "") {
    config.headers["Authorization"] = null;
    return config;
  }

  console.log(userAccessToken && userAccessToken !== "")
  config.headers["Authorization"] = userAccessToken && JSON.parse(userAccessToken) !== "" ? `Bearer ${JSON.parse(userAccessToken)}` : null;
  return config;
});

// 401에러 반환시 refresh로 요청 후 기존 요청 다시 보냄
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {

      try {
        const originalRequest = error.config;
        const data = await api.get("accounts/access/");
        if (data) {
          const accessToken = data.data.access_token;
          localStorage.removeItem("userIsLogin");
          localStorage.setItem("userIsLogin", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${data.data.access_token
          }`;
          return await api.request(originalRequest);
        }
      } catch (error) {
        localStorage.setItem("userIsLogin", "");
        console.log(error);
        localStorage.removeItem("userInfo");
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;

const ownerapi = axios.create({
  baseURL: "https://j8d110.p.ssafy.io/spring/",
  // baseURL: "http://192.168.100.92:8085/spring/",
  withCredentials: true,
});

// timeout 설정 4초
// ownerapi.defaults.timeout = 4000;

// // axios interceptor로 헤더에 Authorization 설정
ownerapi.interceptors.request.use(function (config) {

  const ownerAccessToken = localStorage.getItem("ownerIsLogin");

  if (ownerAccessToken && JSON.parse(ownerAccessToken) === "") {
    config.headers["Authorization"] = null;
    return config;
  }

  config.headers["Authorization"] = ownerAccessToken && JSON.parse(ownerAccessToken) !== "" ? `Bearer ${JSON.parse(ownerAccessToken)}` : null;
  return config;
});

// 401에러 반환시 refresh로 요청 후 기존 요청 다시 보냄
ownerapi.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      try {
        const originalRequest = error.config;
        const data = await api.get("accounts/access/");
        if (data) {
          const accessToken = data.data.access_token;
          localStorage.removeItem("ownerIsLogin");
          localStorage.setItem("ownerIsLogin", accessToken);
          originalRequest.headers["Authorization"] = `Bearer ${data.data.access_token
          }`;
          return await api.request(originalRequest);
        }
      } catch (error) {
        localStorage.setItem("ownerIsLogin", "");
        console.log(error);
        localStorage.removeItem("userInfo");
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { ownerapi };
