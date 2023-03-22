import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userInfoAtom } from "../recoil/userAtom";
import { signupAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";
import { TinitialValues } from "./useForm";

export const useOwnerSignup = () => {
  const navigation = useNavigate();

  return useMutation((values: TinitialValues) => signupAPI(values), {
    onSuccess: (data: TAxoisUserInfo) => {
      alert(
        "신청이 정상적으로 완료 되었습니다!\n완료까지 대기해주세요!\n심사완료까지 영업일 기준 2~3일 소요됩니다!"
      );
      navigation("/owner");
    },
  });
};
