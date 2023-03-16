// 새로운 폼 제작
import { authDescriptions } from "./AuthDescription";
import { Form, authInputDescription } from "./AuthInputDescription";

interface IAuthFomrProps {
  formType: "login" | "registration";
}

const AuthForm = ({ formType }: IAuthFomrProps) => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    handleSubmit,
  } = authDescriptions[formType];

  return (
    <Form
      initialValues={initialValues}
      formMaxLength={formMaxLength}
      formPlaceHolder={formPlaceHolder}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {authInputDescription(formType)}
    </Form>
  );
};

export default AuthForm;
