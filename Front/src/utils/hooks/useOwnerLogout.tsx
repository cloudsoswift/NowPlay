import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ownerInfoAtion, userIsLogin } from "../recoil/userAtom";
import { logoutAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";

import { axiosCookie } from '../PrivateRouter';

export const useOwnerLogout = () => {
  const setOwnerInfo = useSetRecoilState(ownerInfoAtion);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(userIsLogin);

  return useMutation(() => logoutAPI(), {
    onError: () => {
      navigation("/owner/login");
      axiosCookie.remove("accessToken", {path: "/owner"});
      setIsLogin(false);
      setOwnerInfo({
        storeIdx: 0,
        userName: "",
        userNickname: "",
        userAddress: "",
        userDistance: "",
      });
    },
  });
};
