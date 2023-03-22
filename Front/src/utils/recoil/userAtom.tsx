import { atom, AtomEffect } from "recoil";

export type TRecoilUserInfo = {
  userName: string;
  userNickname: string;
  userAddress: string;
  userDistance: string;
};

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
    ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue))
  }
  onSet((newValue, _, isReset) => {
    isReset
      ? localStorage.removeItem(key)
      : localStorage.setItem(key,JSON.stringify(newValue))
  })
}

export const userInfoAtom = atom<TRecoilUserInfo>({
  key: "userInfo",
  default: { userName: "", userNickname: "", userAddress: "", userDistance: "" },
  effects: [
    localStorageEffect('userinfo')
  ]
});

export const ownerInfoAtion = atom({
  key: "ownerInfo",
  default: { userName: "", userNickname: ""},
  effects: [
    localStorageEffect('ownerinfo')
  ]
})

