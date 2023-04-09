import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ownerInfoAtion, userIsLogin, ownerIsLogin } from "../recoil/userAtom";
import { ownerloginAPI, } from "../api/authApiFunctions";
import { TAxoisOwnerInfo } from "../api/authApiFunctions";
import { TinitialValues } from "./useForm";



export const useOwnerLogin = () => {
  const setOwnerInfo = useSetRecoilState(ownerInfoAtion);
  const navigation = useNavigate();

  const [isLogin, setIsLogin] = useRecoilState(ownerIsLogin)

  return useMutation((values: TinitialValues) => ownerloginAPI(values), {
    onSuccess: (data: TAxoisOwnerInfo) => {
      setIsLogin(data.accessToken)
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
