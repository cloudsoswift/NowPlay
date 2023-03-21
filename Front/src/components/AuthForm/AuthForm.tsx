// 새로운 폼 제작
import { authDescriptions } from "./AuthDescription";
import { Form, Field, FileField, CheckBoxField, BusinessHourField, SubmitButton } from "./AuthInputDescription";
import { Link, useLocation } from "react-router-dom";
import { useLogin } from "../../utils/hooks/useLogin";
import { useSignup } from "../../utils/hooks/useSignup";
import { TinitialValues } from "../../utils/hooks/useForm";

interface IAuthFomrProps {
  formType: "login" | "signup" | "ownerSignup";
}

const AuthForm = ({ formType }: IAuthFomrProps) => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    // handleSubmit,
  } = authDescriptions[formType];

  const location = useLocation();

  const loginMutation = useLogin();

  const signupMutation = useSignup();

  // 뮤테이션 서브밋 할 때
  const loginHandleSubmit = (values: TinitialValues) => {
    loginMutation.mutate(values);
  };

  const signupHandleSubmit = (values: TinitialValues) => {
    console.log(values)
    signupMutation.mutate(values);
  };

  if (formType === "login") {
    return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={loginHandleSubmit}
      >
        <Field type="text" name="userId" />
        <Field type="password" name="password" />
        <SubmitButton type="submit">
          {loginMutation.isLoading ? <div id="spinner"></div> : "로그인"}
        </SubmitButton>
        <span>
          아직 회원이 아니신가요?{" "}
          <Link
            to={
              location.pathname.includes("owner")
                ? "/owner/signup"
                : "/mypage/signup"
            }
          >
            회원가입
          </Link>
        </span>
        <span>
          <Link
            to={
              location.pathname.includes("owner")
                ? "/owner/signup"
                : "/mypage/signup"
            }
          >
            아이디 찾기
          </Link>{" "}
          /{" "}
          <Link
            to={
              location.pathname.includes("owner")
                ? "/owner/signup"
                : "/mypage/signup"
            }
          >
            비밀번호 찾기
          </Link>
        </span>
      </Form>
    );
  } else if (formType === "signup") {
    return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={signupHandleSubmit}
      >
        <Field type="text" name="userId" />
        <Field type="password" name="password" />
        <Field type="password" name="passwordcheck" />
        <Field type="text" name="nickname" />
        <Field type="text" name="phoneNumber" />
        <Field type="text" name="email" />
        <CheckBoxField type="checkbox" name="agree" />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    );
  } else {
    return (
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={signupHandleSubmit}
      >
        <Field type="text" name="userId" />
        <Field type="password" name="password" />
        <Field type="password" name="passwordcheck" />
        <Field type="text" name="nickname" />
        <Field type="text" name="phoneNumber" />
        <Field type="text" name="email" />
        <FileField type="file" name="brcImage" />
        
        <BusinessHourField />
        <CheckBoxField type="checkbox" name="agree" />
        <SubmitButton type="submit">회원가입</SubmitButton>
      </Form>
    );
  }
};

export default AuthForm;
