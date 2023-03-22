import AuthForm from "../../../components/AuthForm/AuthForm";
import OAuthLoginForm from "../../../components/AuthForm/OAuthLoginForm";


const OwnerloginPage = () => {

  return (
    <>
      <AuthForm formType="login" />
      <OAuthLoginForm />
    </>
  );
};

export default OwnerloginPage;
