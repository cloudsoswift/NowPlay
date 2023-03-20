import { useMutation } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userInfoAtom } from '../recoil/userAtom'
import { signupAPI } from '../api/apiFunctions'
import { TAxoisUserInfo } from '../api/apiFunctions'

export const useSignup = () => {
  const setUserInfo = useSetRecoilState(userInfoAtom)
  const [cookies, setCookies, removeCooke] = useCookies(["accessToken"])
  const navigation = useNavigate()

  return useMutation(
    (values: { [key: string]: string }) => signupAPI(values),
    {
      onSuccess: (data: TAxoisUserInfo) => {
        setCookies("accessToken", data.accessToken);
        setUserInfo({
          userNickname: data.userNickname,
          userAddress: data.userAddress,
          userName: data.userName,
          userDistance: data.userDistance,
        });
        navigation("/mypage")
      },
    }
  );
}