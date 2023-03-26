import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoAtom } from "../recoil/userAtom";
import { loginAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";
import { TinitialValues } from "./useForm";

export const useLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [cookies, setCookies, removeCooke] = useCookies(["accessToken"]);
  const navigation = useNavigate();

  return useMutation((values: TinitialValues) => {
    return loginAPI(values)}, {
    onSuccess: (data: TAxoisUserInfo) => {
      if (data.accessToken) {
        setCookies("accessToken", data.accessToken, { path: "/mobile" });
      }
      setUserInfo({
        userNickname: data.userNickname,
        userAddress: data.userAddress,
        userName: data.userName,
        userDistance: data.userDistance,
      });
      navigation("/mobile/mypage");
    },
  });
};
