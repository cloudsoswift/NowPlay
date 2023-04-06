import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoAtom, userIsLogin } from "../recoil/userAtom";
import { signupAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";
import { TinitialValues } from "./useForm";

export const useSignup = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [cookies, setCookies, removeCooke] = useCookies(["accessToken"]);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(userIsLogin)

  return useMutation((values: TinitialValues) => signupAPI(values), {
    onSuccess: (data: TAxoisUserInfo) => {
      setCookies("accessToken", data.accessToken, { path: "/mobile" });
      setIsLogin(true)
      setUserInfo({
        userIdx: data.userIdx,
        userNickname: data.userNickname,
        userAddress: data.userAddress,
        userName: data.userName,
        userDistance: data.userDistance,
      });
      navigation("/mobile/hobby");
    },
  });
};
