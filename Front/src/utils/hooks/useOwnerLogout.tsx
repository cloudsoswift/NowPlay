import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ownerInfoAtion, userIsLogin, ownerIsLogin } from "../recoil/userAtom";
import { logoutAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";



export const useOwnerLogout = () => {
  const setOwnerInfo = useSetRecoilState(ownerInfoAtion);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(ownerIsLogin);

  return useMutation(() => logoutAPI(), {
    onError: () => {
      navigation("/owner/login");

      setIsLogin("");
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
