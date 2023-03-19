import api from "./api";

export type TAxoisUserInfo = {
  access_token: string;
  userName: string;
  userNickname: string;
  userAddress: string;
  userDistance: string;
}

export const loginAPI = async (values: { [key: string]: string }) => {
  const { data } = await api<TAxoisUserInfo>({
    url: "api/users/login",
    method: "POST",
    data: {
      userId: values.userId,
      userPassword: values.password,
    },
  });
  return data;
};

export const signupAPI = async (values: { [key: string]: string }) => {
  const { data } = await api<TAxoisUserInfo>({
    url: "api/users/login",
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
