import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoAtom, userIsLogin } from "../recoil/userAtom";
import { logoutAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";

import { axiosCookie } from '../PrivateRouter';

export const useLogout = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(userIsLogin)

  return useMutation(() => logoutAPI(), {
    onError: async () => {
      axiosCookie.remove("accessToken", {path: "/mobile"});
      setIsLogin(false)
      setUserInfo({
        userIdx: 0,
        userNickname: "",
        userAddress: "",
        userName: "",
        userDistance: "",
      });
      navigation("/mobile/mypage/login");
    },
  });
};
