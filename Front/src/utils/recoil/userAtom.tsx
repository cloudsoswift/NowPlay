import { atom, AtomEffect } from "recoil";

export type TRecoilUserInfo = {
  userIdx: number;
  userName: string;
  userNickname: string;
  userAddress: string;
  userDistance: string;
};

export type TRecoilOwnerInfo = {
  storeIdx: number;
  userName: string;
  userNickname: string;
  userAddress: string;
  userDistance: string;
};

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userInfoAtom = atom<TRecoilUserInfo>({
  key: "userInfo",
  default: {
    userIdx: 0,
    userName: "",
    userNickname: "",
    userAddress: "",
    userDistance: "",
  },
  effects: [localStorageEffect("userinfo")],
});

export const ownerInfoAtion = atom<TRecoilOwnerInfo>({
  key: "ownerInfo",
  default: {
    storeIdx: 0,
    userName: "",
    userNickname: "",
    userAddress: "",
    userDistance: "",
  },
  effects: [localStorageEffect("ownerinfo")],
});

export const selectHobbyAction = atom<string[]>({
  key: "hobbyInfo",
  default: [],
});

export const userIsLogin = atom<string>({
  key: "userIsLogin",
  default: "",
  effects: [localStorageEffect("userIsLogin")],
});

export const ownerIsLogin = atom<string>({
  key: "ownerIsLogin",
  default: "",
  effects: [localStorageEffect("ownerIsLogin")],
});