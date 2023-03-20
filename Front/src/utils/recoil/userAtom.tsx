import { atom } from "recoil";

export type TRecoilUserInfo = {
  userName: string;
  userNickname: string;
  userAddress: string;
  userDistance: string;
};

export const userInfoAtom = atom<TRecoilUserInfo>({
  key: "userInfo",
  default: { userName: "", userNickname: "", userAddress: "", userDistance: "" },
});
