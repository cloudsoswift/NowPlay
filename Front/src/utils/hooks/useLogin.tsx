import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoAtom } from "../recoil/userAtom";
import { loginAPI } from "../api/apiFunctions";
import { TAxoisUserInfo } from "../api/apiFunctions";
import { TinitialValues } from "./useForm";

export const useLogin = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [cookies, setCookies, removeCooke] = useCookies(["accessToken"]);
  const navigation = useNavigate();
  const location = useLocation();

  return useMutation((values: TinitialValues) => loginAPI(values), {
    onSuccess: (data: TAxoisUserInfo) => {
      if (data.accessToken) {
        setCookies("accessToken", data.accessToken);
      }
      setUserInfo({
        userNickname: data.userNickname,
        userAddress: data.userAddress,
        userName: data.userName,
        userDistance: data.userDistance,
      });
      location.pathname.includes("owner") ? navigation("/owner") : navigation("/mypage");
    },
  });
};
