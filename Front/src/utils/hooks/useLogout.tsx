import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoAtom } from "../recoil/userAtom";
import { logoutAPI } from "../api/apiFunctions";
import { TAxoisUserInfo } from "../api/apiFunctions";

export const useLogout = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const navigation = useNavigate();

  return useMutation((values: { [key: string]: string }) => logoutAPI(values), {
    onSuccess: () => {
      removeCookie("accessToken");
      setUserInfo({
        userNickname: "",
        userAddress: "",
        userName: "",
        userDistance: "",
      });
      navigation("/mypage");
    },
  });
};
