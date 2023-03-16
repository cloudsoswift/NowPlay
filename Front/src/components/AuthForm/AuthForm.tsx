import { createContext, useContext } from "react";
import styled from "styled-components";

import useForm from "../../utils/hooks/useForm";
import { TuseFormParams, TuseFormReturn } from "../../utils/hooks/useForm";
import api from "../../utils/api";

interface IAuthFomrProps {
  formType: "login" | "registration";
}

interface IFormParams extends TuseFormParams {
  children: React.ReactNode;
}

// 새로운 폼 타입을 추가 시키려면
// {key: {initialValues 폼 값, formPlaceHolder 플레이스 홀더,
//        formMaxLength 인풋 최대길이, validate 인증함수,
//        handleSubmit 제출 함수}}
const authDescriptions = {
  login: {
    initialValues: { id: "", password: "" },
    formPlaceHolder: {
      id: "아이디를 입력해주세요",
      password: "비밀번호를 입력해주세요",
    },
    formMaxLength: {
      id: 20,
      password: 20,
    },
    validate: (values: { [key: string]: string }) => {
      const errors = {
        id: "",
        password: "",
      };

      if (!values.id) {
        errors.id = "아이디를 입력하세요";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      }

      return errors;
    },
    handleSubmit: (values: { [key: string]: string }) => {
      console.log(values.id)
      console.log(values.password)
      api({
        url: "api/users/login",
        method: "POST",
        data: {userId: values.id, userPassword: values.password},
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(error => console.log(error))
    },
  },
  registration: {
    initialValues: {
      id: "",
      password: "",
      nickname: "",
      phoneNumber: "",
      email: "",
    },
    formPlaceHolder: {
      phoneNumber: "'-'을 제외하고 입력해주세요",
      id: "5~20자 사이로 입력해주세요",
      password: "대문자/소문자/숫자/특수문자 포함 8~20자",
      email: "example@ssafy.com",
    },
    formMaxLength: {
      phoneNumber: 13,
      id: 20,
      password: 20,
    },
    validate: (values: { [key: string]: string }) => {
      const errors = {
        id: "",
        password: "",
        passwordcheck: "",
        nickname: "",
        phoneNumber: "",
        email: "",
      };

      if (!values.id) {
        errors.id = "아이디를 입력하세요";
      }
      if (!values.password) {
        errors.password = "비밀번호를 입력하세요";
      } else if (
        !RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
        ).test(values.password)
      ) {
        errors.password = "소/대문자, 숫자, 특수문자가 포함되어야합니다.";
      }
      if (values.password !== values.passwordcheck) {
        errors.passwordcheck = "동일한 비밀번호를 입력하세요";
      }
      if (!values.nickname) {
        errors.nickname = "닉네임을 입력하세요";
      }
      if (!values.phoneNumber) {
        errors.phoneNumber = "전화번호를 입력하세요";
      }
      if (!values.email) {
        errors.email = "이메일을 입력하세요";
      }

      return errors;
    },
    handleSubmit: (values: { [key: string]: string }) => {
      alert(JSON.stringify(values));
    },
  },
};

const FormContext = createContext<TuseFormReturn>({
  values: {},
  errors: {},
  touched: {},
  handleChange: () => {},
  handleBlur: () => {},
  handleSubmit: () => {},
  getFieldProps: () => {
    return { name: "", value: "", onBlur: () => {}, onChange: () => {} };
  },
});
FormContext.displayName = "FormContext";

const Form = ({
  children,
  initialValues,
  formPlaceHolder,
  formMaxLength,
  validate,
  onSubmit,
}: IFormParams) => {
  const formValue = useForm({
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    onSubmit,
  });

  return (
    <FormContext.Provider value={formValue}>
      <form onSubmit={formValue.handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

const Field = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);
  return (
    <InputBox>
      <label htmlFor={name}>{name}</label>
      <input type={type} id={name} {...getFieldProps(name)} />
      {!touched[name] || !errors[name] ? <span /> : <span>{errors[name]}</span>}
    </InputBox>
  );
};

// const ErrorMessage = ({ name }: { name: string }) => {
//   const { touched, errors } = useContext(FormContext);
//   if (!touched[name] || !errors[name]) {
//     return null;
//   }
//   return <span>{errors[name]}</span>;
// };

const AuthForm = ({ formType }: IAuthFomrProps) => {
  const {
    initialValues,
    formPlaceHolder,
    formMaxLength,
    validate,
    handleSubmit,
  } = authDescriptions[formType];

  return (
    <FormBox>
      <Form
        initialValues={initialValues}
        formMaxLength={formMaxLength}
        formPlaceHolder={formPlaceHolder}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {formType === "login" ? (
          <>
            <Field type="text" name="id" />
            <Field type="password" name="password" />
            <SubmitButton type="submit">로그인</SubmitButton>
          </>
        ) : (
          <>
            <Field type="text" name="id" />
            <Field type="password" name="password" />
            <Field type="password" name="passwordcheck" />
            <Field type="text" name="nickname" />
            <Field type="text" name="phoneNumber" />
            <Field type="text" name="email" />
            <SubmitButton type="submit">회원가입</SubmitButton>
          </>
        )}
      </Form>
    </FormBox>
  );
};

export default AuthForm;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 50px 0px 50px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 130px;

  > span {
    color: red;
    font-size: small;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  border-radius: 20px;
  height: 50px;
  width: 100%;
  color: var(--body-color);
  transition: var(--trans-02);

  &:active {
    background-color: var(--primary-color-light);
  }
`;
