// 새로운 폼 제작
import { authDescriptions } from "./AuthDescription";
import {
  Form,
  Field,
  CheckBoxField,
  SubmitButton,
} from "./AuthFields";
import { Link } from "react-router-dom";
import { useLogin } from "../../utils/hooks/useLogin";
import { useSignup } from "../../utils/hooks/useSignup";
import { TinitialValues } from "../../utils/hooks/useForm";

const LoginAuthForm = () => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    // handleSubmit,
  } = authDescriptions["login"];

  const loginMutation = useLogin();

  const loginHandleSubmit = (values: TinitialValues) => {
    loginMutation.mutate(values);
  };

  return (
    <Form
      initialValues={initialValues}
      formMaxLength={formMaxLength}
      formPlaceHolder={formPlaceHolder}
      validate={validate}
      onSubmit={loginHandleSubmit}
    >
      <Field type='text' name='userId' />
      <Field type='password' name='password' />
      <SubmitButton type='submit'>
        {loginMutation.isLoading ? <div id='spinner'></div> : "로그인"}
      </SubmitButton>
      <span>
        아직 회원이 아니신가요?{" "}
        <Link to={"/mobile/mypage/signup"}>회원가입</Link>
      </span>
      <span>
        <Link to={"/mobile/mypage/signup"}>아이디 찾기</Link> /{" "}
        <Link to={"/mobile/mypage/signup"}>비밀번호 찾기</Link>
      </span>
    </Form>
  );
};

const SignupAuthForm = () => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    // handleSubmit,
  } = authDescriptions["signup"];

  const signupMutation = useSignup();

  const signupHandleSubmit = (values: TinitialValues) => {
    signupMutation.mutate(values);
  };

  return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={signupHandleSubmit}
      >
        <Field type='text' name='userId' />
        <Field type='password' name='password' />
        <Field type='password' name='passwordcheck' />
        <Field type='text' name='name' />
        <Field type='text' name='nickname' />
        <Field type='text' name='phoneNumber' />
        <Field type='text' name='email' />
        <CheckBoxField type='checkbox' name='agree' />
        <SubmitButton type='submit'>회원가입</SubmitButton>
      </Form>
    );
};

export {LoginAuthForm, SignupAuthForm}