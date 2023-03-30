import { OwnerLoginAuthForm } from '../../../components/OwnerForm/OwnerAuthForm/OwnerAuthForm';
import OAuthLoginForm from "../../../components/AuthForm/OAuthLoginForm";
import styled from 'styled-components';



const OwnerloginPage = () => {

  return (
    <OwnerLoginContainer>
      <OwnerLoginAuthForm />
      <OAuthLoginForm />
    </OwnerLoginContainer>
  );
};

export default OwnerloginPage;

const OwnerLoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
