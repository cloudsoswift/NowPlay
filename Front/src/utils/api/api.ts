import axios from "axios";
import { Cookies } from "react-cookie";

// 쿠키 객체 생성
const cookie = new Cookies();

const api = axios.create({
  baseURL: "https://j8d110.p.ssafy.io/spring/",
  // baseURL: "http://192.168.99.231:8085/spring/",
  withCredentials: true,
});

// timeout 설정 4초
api.defaults.timeout = 4000;

// axios interceptor로 헤더에 Authorization 설정
api.interceptors.request.use(function (config) {
  const cookieAccessToken = cookie.get("accessToken");

  if (!cookieAccessToken) {
    config.headers["Authorization"] = null;
    return config;
  }

  config.headers["Authorization"] = `Bearer ${cookieAccessToken}`;
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
              cookie.remove("accessToken");
              cookie.set("accessToken", accessToken, { path: "/mobile" });
              originalRequest.headers["Authorization"] = `Bearer ${cookie.get(
                "accessToken"
              )}`;
              return await api.request(originalRequest);
            }
          } catch (error) {
            cookie.remove("accessToken");
            console.log(error);
    
            localStorage.removeItem("userInfo")
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
);

export default api;


const ownerapi = axios.create({
  baseURL: "https://j8d110.p.ssafy.io/spring/",
  // baseURL: "http://192.168.99.231:8085/spring/",
  withCredentials: true,
});

// timeout 설정 4초
ownerapi.defaults.timeout = 4000;

// axios interceptor로 헤더에 Authorization 설정
ownerapi.interceptors.request.use(function (config) {
  const cookieAccessToken = cookie.get("accessToken");

  if (!cookieAccessToken) {
    config.headers["Authorization"] = null;
    return config;
  }

  config.headers["Authorization"] = `Bearer ${cookieAccessToken}`;
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
              cookie.remove("accessToken");
              cookie.set("accessToken", accessToken, { path: "/owner" });
              originalRequest.headers["Authorization"] = `Bearer ${cookie.get(
                "accessToken"
              )}`;
              return await api.request(originalRequest);
            }
          } catch (error) {
            cookie.remove("accessToken");
            console.log(error);
    
            localStorage.removeItem("userInfo")
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
);

export {ownerapi}