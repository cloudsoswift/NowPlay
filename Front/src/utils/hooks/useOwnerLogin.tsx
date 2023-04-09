import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ownerInfoAtion, userIsLogin } from "../recoil/userAtom";
import { ownerloginAPI, } from "../api/authApiFunctions";
import { TAxoisOwnerInfo } from "../api/authApiFunctions";
import { TinitialValues } from "./useForm";
import { axiosCookie } from '../PrivateRouter';


export const useOwnerLogin = () => {
  const setOwnerInfo = useSetRecoilState(ownerInfoAtion);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(userIsLogin)

  return useMutation((values: TinitialValues) => ownerloginAPI(values), {
    onSuccess: (data: TAxoisOwnerInfo) => {
      if (data.accessToken) {
        axiosCookie.set("accessToken", data.accessToken, { path: "/owner" });
      }
      setIsLogin(true)
      console.log(data)
      setOwnerInfo({
        storeIdx: data.storeIdx,
        userName: data.userName,
        userNickname: data.userNickname,
        userAddress: data.userAddress,
        userDistance: data.userDistance
      });
      navigation("/owner/");
    },
  });
};
