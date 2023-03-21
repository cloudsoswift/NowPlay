import { TinitialValues } from "../hooks/useForm";
import api from "./api";

export type TAxoisUserInfo = {
  accessToken: string;
  userName: string;
  userNickname: string;
  userAddress: string;
  userDistance: string;
}

export const loginAPI = async (values: TinitialValues) => {
  const { data } = await api<TAxoisUserInfo>({
    url: "accounts/login",
    method: "POST",
    data: {
      userId: values.userId,
      userPassword: values.password,
    },
  });
  console.log(data)
  return data;
};

export const signupAPI = async (values: TinitialValues) => {
  const { data } = await api<TAxoisUserInfo>({
    url: "accounts",
    method: "POST",
    data: {
      userId: values.userId,
      userPassword: values.password,
      userNickname: values.nickname,
      userPhoneNumber: values.phoneNumber,
      userEmail: values.email,
    },
  });
  return data;
};

export const logoutAPI = async () => {
  const { data } = await api({
    url: "accounts/logout",
    method: "POST",
  });
  return data;
};

export const ownerSignupAPI = async (values: TinitialValues) => {
  const formData = new FormData()

  

  const { data } = await api<TAxoisUserInfo>({
    url: "accounts",
    method: "POST",
    data: {
      userId: values.userId,
      userPassword: values.password,
      userNickname: values.nickname,
      userPhoneNumber: values.phoneNumber,
      userEmail: values.email,
    },
  });
  return data;
};