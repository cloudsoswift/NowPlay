import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

declare global {
  interface Window {
    Kakao: any;
    naver: any;
    google: any;
  }
}

const OAuthLoginForm = () => {
  const oAuthPath = useLocation()
  
  useEffect(() => {
    if (oAuthPath.search.split("?")[1] === "naver") {
      console.log(oAuthPath.hash.split("#")[1])
    }
  }, [oAuthPath.search])
  
  // 네이버 로그인

  const loginFormWithNaver = () => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "FL_dHs6b8BOH36DPExe3",
      callbackUrl: "http://127.0.0.1:5173/?naver",
      isPopup: false,
      loginButton: { color: "green", type: 2 },
    });
    naverLogin.init();
  };

  useEffect(() => {
    loginFormWithNaver();
  }, []);

  // 카카오 로그인

  

  return (
    <>
      <NaverLoginImage id='naverIdLogin' />
    </>
  );
};

export default OAuthLoginForm;

const NaverLoginImage = styled.div`
  img{
    height: 50px;
  }
`