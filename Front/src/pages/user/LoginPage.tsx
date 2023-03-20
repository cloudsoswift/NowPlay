import AuthForm from "../../components/AuthForm/AuthForm";
import OAuthLoginForm from '../../components/AuthForm/OAuthLoginForm';

const LoginPage = () => {
  return (
    <>
      <AuthForm formType="login" />
      <OAuthLoginForm />
    </>
  );
};

export default LoginPage;
