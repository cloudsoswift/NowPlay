import React, { useState, useEffect, useCallback } from "react";

export type useFormParams = {
  initialValues: { [key: string]: string };
  validate(values: object): object;
  onSubmit(values: object): void;
};

export type useFormReturn = {
  values: {
    [key: string]: string;
  };
  errors: {
    [key: string]: string;
  };
  touched: {
    [key: string]: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldProps: (name: string) => {
    name: string;
    value: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
};

function useForm({ initialValues, validate, onSubmit }: useFormParams) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    // 모든 필드에 방문했다고 표시한다
    setTouched(
      Object.keys(values).reduce((new_touched:{[key: string]: boolean}, field) => {
        new_touched[field] = true;
        return new_touched;
      }, {})
    );

    console.log(touched)

    const new_errors = validate(values);
    setErrors(new_errors);
    if (Object.values(errors).some((v) => v)) {
      return alert(JSON.stringify(errors))
    }

    // useForm의 폼 제출을 완료하고 사용하는 쪽으로 알린다
    onSubmit(values);
  };

  // 입력값에 따라 검증 함수를 실행하는 함수를 정의한다
  const runValidator = useCallback(() => validate(values), [values]);

  useEffect(() => {
    const errors = runValidator();
    setErrors(errors);
  }, [runValidator]);

  // 필드 속성으로 사용할 값을 조회한다
  const getFieldProps = (name: string) => {
    const value = values[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  // 훅을 사용하는 쪽에 제공하는 api다
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
}

export default useForm;
