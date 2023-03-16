import styled from "styled-components";
import { Link } from "react-router-dom";
import { createContext, useContext } from "react";
import useForm from "../../utils/hooks/useForm";
import { TuseFormParams, TuseFormReturn } from "../../utils/hooks/useForm";

export { authInputDescription, Form }

interface IFormParams extends TuseFormParams {
  children: React.ReactNode;
}

const labelText: {[key: string]: string} = {
  userId: "아이디",
  password: "비밀번호",
  phoneNumber: "휴대전화 번호",
  email: "이메일",
  nickname: "닉네임",
  passwordcheck: "비밀번호 확인"
}

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

const authInputDescription = (formType: string) => {
  if (formType === "login") {
    return (
      <>
        <Field type='text' name='userId' />
        <Field type='password' name='password' />
        <SubmitButton type='submit'>로그인</SubmitButton>
        <span>
          아직 회원이 아니신가요? <Link to='/signup'>회원가입</Link>
        </span>
        <span>
          <Link to='/signup'>아이디 찾기</Link> /{" "}
          <Link to='/signup'>비밀번호 찾기</Link>
        </span>
      </>
    );
  }
  if (formType === "registration") {
    return (
      <>
        <Field type='text' name='userId' />
        <Field type='password' name='password' />
        <Field type='password' name='passwordcheck' />
        <Field type='text' name='nickname' />
        <Field type='text' name='phoneNumber' />
        <Field type='text' name='email' />
        <SubmitButton type='submit'>회원가입</SubmitButton>
      </>
    );
  }
};

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
      <FormBox onSubmit={formValue.handleSubmit}>{children}</FormBox>
    </FormContext.Provider>
  );
};

const Field = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);
  return (
    <InputBox>
      <label htmlFor={name}>{labelText[name]}</label>
      <input type={type} id={name} {...getFieldProps(name)} />
      <div className='bar'></div>
      {!touched[name] || !errors[name] ? null : <span>{errors[name]}</span>}
    </InputBox>
  );
};


// ===== styled-components =====

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: auto;
  padding: 40px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px var(--gray-color-light);

  a {
    color: var(--primary-color);
    font-family: "SpoqaHanSansNeoBold";
  }
`;

const InputBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: auto;
  padding-bottom: 30px;

  > label {
    margin-bottom: 10px;
  }

  > input {
    padding: 6px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--gray-color);
  }

  > span {
    position: absolute;
    color: red;
    top: 70px;
    font-size: var(--caption);
  }

  > input:focus {
    outline: none;
  }

  /* Underline */

  .bar {
    position: relative;
    display: block;
    width: 100%;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: var(--primary-color-light);
    transition: all 0.2s ease;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  /* active */

  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  border-radius: 20px;
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  color: var(--body-color);
  transition: var(--trans-02);
  font-family: "SpoqaHanSansNeoBold";

  &:active {
    background-color: var(--primary-color-light);
  }
`;
