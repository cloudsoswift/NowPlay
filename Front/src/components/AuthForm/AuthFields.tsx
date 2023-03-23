import styled, { keyframes } from "styled-components";
import { createContext, useContext, useState } from "react";
import useForm, { TinitialValues } from "../../utils/hooks/useForm";
import { TuseFormParams, TuseFormReturn } from "../../utils/hooks/useForm";

import { labelText } from "./AuthDescription";

export {
  FormContext,
  Form,
  Field,
  CheckBoxField,
  SubmitButton,
  InputBox
};

export interface IFormParams extends TuseFormParams {
  children: React.ReactNode;
}

const FormContext = createContext<TuseFormReturn>({
  values: {},
  errors: {},
  touched: {},
  handleChange: () => {},
  handleBusinessHour: () => {},
  handleBlur: () => {},
  handleSubmit: () => {},
  getFieldProps: () => {
    return { name: "", value: "", onBlur: () => {}, onChange: () => {}, };
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

const CheckBoxField = ({ type, name }: { type: string; name: string }) => {
  const { getFieldProps, touched, errors } = useContext(FormContext);
  return (
    <InputBox>
      <div className='check-box'>
        <label htmlFor={name}>{labelText[name]}</label>
        <input type={type} id={name} {...getFieldProps(name)} />
      </div>
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
  width: 90vw;
  max-width: 700px;
  padding: 40px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 10px var(--gray-color-light);

  a {
    color: var(--primary-color);
    font-family: "LINESeedKRBd";
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

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 1px solid var(--gray-color);
    appearance: none;
    transition: background 0.2s;
    content: "";
  }

  input[type="checkbox"]:checked {
    background: var(--primary-color);
    border: 2px solid var(--gray-color-light);
    border-radius: 100%;
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
    position: absolute;
    background: var(--primary-color);
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

  /* check-box */
  > .check-box {
    display: flex;
    justify-content: space-between;
  }

  > .check-box ~ span {
    top: 25px;
    color: red;
    font-size: var(--caption);
  }

  /* file */

  #FileError {
    top: 80px;
  }

  /* businesshour */

  > .businesssheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
`;



const spinAnimation = keyframes`
  0% {transform: rotate(0deg);}
  100% {transform: rotate(365deg);}
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  border-radius: 20px;
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  color: var(--body-color);
  transition: var(--trans-02);
  font-family: "LINESeedKRBd";

  &:active {
    background-color: var(--primary-color-light);
  }

  #spinner {
    position: relative;
    width: 30px;
    height: 30px;
    border: 4px solid var(--gray-color-light);
    border-radius: 50%;
    border-top-color: var(--primary-color-light);
    animation: ${spinAnimation} 1s ease-out infinite;
  }
`;
