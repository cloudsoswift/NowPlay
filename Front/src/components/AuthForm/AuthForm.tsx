import { createContext, useContext } from "react";

import useForm from "../../utils/hooks/useForm";
import { useFormParams, useFormReturn } from "../../utils/hooks/useForm";

interface Props {
  formType: "Login" | "Registration";
}

interface FormParams extends useFormParams {
  children: React.ReactNode;
}

const FormContext = createContext<useFormReturn>({
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

const Form = ({ children, initialValues, validate, onSubmit }: FormParams) => {
  const formValue = useForm({ initialValues, validate, onSubmit });

  return (
    <FormContext.Provider value={formValue}>
      <form onSubmit={formValue.handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

const Field = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps } = useContext(FormContext);
  return <input type={type} {...getFieldProps(name)} />;
};

const ErrorMessage = ({ name }: { name: string }) => {
  const { touched, errors } = useContext(FormContext);
  if (!touched[name] || !errors[name]) {
    return null;
  }
  return <span>{errors[name]}</span>;
};

const AuthForm = ({ formType }: Props) => {
  const initialValues = { email: "", password: "" };

  const validate = (values: { [key: string]: string }) => {
    const errors = {
      email: "",
      password: "",
    };

    if (!values.email) {
      errors.email = "이메일을 입력하세요";
    }
    if (!values.password) {
      errors.password = "비밀번호를 입력하세요";
    }

    return errors;
  };
  const handleSubmit = (values: { [key: string]: string }) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        <Field type="email" name="email" />
        <ErrorMessage name="email" />
        <Field type="password" name="password" />
        <ErrorMessage name="password" />
        <button type="submit">로그인</button>
      </Form>
    </>
  );
};

export default AuthForm;
