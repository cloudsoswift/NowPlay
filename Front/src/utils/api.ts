import axios from "axios";
import { Cookies } from "react-cookie";

// 쿠키 객체 생성
const cookie = new Cookies();

const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

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
              cookie.set("accessToken", accessToken, { path: "/" });
              originalRequest.headers["Authorization"] = `Bearer ${cookie.get(
                "accessToken"
              )}`;
              return await api.request(originalRequest);
            }
          } catch (error) {
            cookie.remove("accessToken");
            console.log(error);
    
            // 로그아웃 후에 메인페이지로 이동 시켜야 하나...?
            // 아니면 로그아웃됬다는 알람??
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
);

export default api;
