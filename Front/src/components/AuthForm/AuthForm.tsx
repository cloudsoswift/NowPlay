// 새로운 폼 제작
import { authDescriptions } from "./AuthDescription";
import { Form, Field, SubmitButton } from "./AuthInputDescription";
import { Link } from "react-router-dom";

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
      {formType === "login" ? (
        <>
          <Field type="text" name="userId" />
          <Field type="password" name="password" />
          <SubmitButton type="submit">로그인</SubmitButton>
          <span>
            아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
          </span>
          <span>
            <Link to="/signup">아이디 찾기</Link> /{" "}
            <Link to="/signup">비밀번호 찾기</Link>
          </span>
        </>
      ) : (
        <>
          <Field type="text" name="userId" />
          <Field type="password" name="password" />
          <Field type="password" name="passwordcheck" />
          <Field type="text" name="nickname" />
          <Field type="text" name="phoneNumber" />
          <Field type="text" name="email" />
          <Field type="checkbox" name="agree" />
          <SubmitButton type="submit">회원가입</SubmitButton>
        </>
      )}
    </Form>
  );
};

export default AuthForm;

