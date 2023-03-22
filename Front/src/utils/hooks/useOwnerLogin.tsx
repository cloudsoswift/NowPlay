import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ownerInfoAtion } from "../recoil/userAtom";
import { ownerloginAPI } from "../api/apiFunctions";
import { TAxoisOwnerInfo } from "../api/apiFunctions";
import { TinitialValues } from "./useForm";

export const useLogin = () => {
  const setOwnerInfo = useSetRecoilState(ownerInfoAtion);
  const [cookies, setCookies, removeCooke] = useCookies(["accessToken"]);
  const navigation = useNavigate();


  return useMutation((values: TinitialValues) => ownerloginAPI(values), {
    onSuccess: (data: TAxoisOwnerInfo) => {
      if (data.access_token) {
        setCookies("accessToken", data.access_token, {path: "/owner"});
      }
      setOwnerInfo(
        { userName: data.user_name, userNickname: data.user_nickname}
      )
      navigation("/mypage");
    },
  });
};