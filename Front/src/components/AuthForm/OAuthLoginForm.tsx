import { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';


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
      loginButton: { color: "green", type: 1, height: "40" },
    });
    naverLogin.init();
  };

  useEffect(() => {
    loginFormWithNaver();
  }, []);

  // 카카오 로그인

  

  return (
    <>
      <h1>OAuth로그인</h1>
      <NaverLoginImage id='naverIdLogin' />
      <div id="g_id_onload"
         data-client_id="1054906647598-q9ths8aaoid5kbdaoi336gb1sooh0fbo.apps.googleusercontent.com"
         data-login_uri="http://127.0.0.1:5173/"
         data-auto_prompt="false">
      </div>
      <div className="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
      </div>
    </>
  );
};

export default OAuthLoginForm;

const NaverLoginImage = styled.div`
  img{
    height: 50px;
  }
`