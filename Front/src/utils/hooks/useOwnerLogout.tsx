import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { ownerInfoAtion } from "../recoil/userAtom";
import { logoutAPI } from "../api/authApiFunctions";
import { TAxoisUserInfo } from "../api/authApiFunctions";

export const useOwnerLogout = () => {
  const setOwnerInfo = useSetRecoilState(ownerInfoAtion);
  const [cookies, setCookies, removeCookie] = useCookies(["accessToken"]);
  const navigation = useNavigate();

  return useMutation(() => logoutAPI(), {
    onSuccess: () => {
      removeCookie("accessToken", { path: "/owner" });
      setOwnerInfo({ userName: "", userNickname: "" });
      navigation("/owner");
    },
  });
};
