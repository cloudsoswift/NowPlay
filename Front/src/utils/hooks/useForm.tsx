import React, { useState, useEffect, useCallback } from "react";
import useBusinessHour from "./useBusinessHour";

interface TbusinessDayHour {
  open: string;
  close: string;
  reservationInterval: string;
  storeHoliday: boolean;
}

interface TbusinessDay {
  [key: string]: TbusinessDayHour;
  monday: TbusinessDayHour;
  tuesday: TbusinessDayHour;
  wendesday: TbusinessDayHour;
  thursday: TbusinessDayHour;
  friday: TbusinessDayHour;
  saturday: TbusinessDayHour;
  sunday: TbusinessDayHour;
}

export interface TinitialValues {
  [key: string]: string | undefined | boolean | File | string[] | TbusinessDay;
  userId?: string;
  password?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
  nickname?: string;
  passwordcheck?: string;
  brcImage?: File;
  hobbyMainCategory?: string;
  hobbyMajorCategory?: string;
  businessHour?: TbusinessDay;
  isHoliday?: boolean;
  agree?: boolean;

  storeName?: string;
  storeAddress?: string;
  storeContactNumber?: string;
  storeHompageUrl?: string;
  storeBrcImages?: string[];
  storeExplanation?: string;
}

export type TuseFormParams = {
  initialValues: TinitialValues;
  formPlaceHolder: { [key: string]: string };
  formMaxLength: { [key: string]: number };
  validate(values: object): object;
  onSubmit(values: object): void;
};

export type TuseFormReturn = {
  values: TinitialValues;
  errors: {
    [key: string]: string;
  };
  touched: {
    [key: string]: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBusinessHour: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  getFieldProps: (name: string) => {
    name: string;
    // value: string;
    onBlur: (
      e:
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLSelectElement>
    ) => void;
    onChange: (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => void;
  };
};

function useForm({
  initialValues,
  formPlaceHolder,
  formMaxLength,
  validate,
  onSubmit,
}: TuseFormParams) {
  const [values, setValues] = useState<TinitialValues>(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const updateHour = useBusinessHour();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    {
      if (
        e.target instanceof HTMLInputElement &&
        e.target.type === "checkbox"
      ) {
        setValues({
          ...values,
          [e.target.name]: e.target.checked,
        });
        return;
      }
      if (
        e.target instanceof HTMLInputElement &&
        e.target.type === "file" &&
        e.target.files
      ) {
        setValues({
          ...values,
          [e.target.name]: e.target.files[0],
        });
        return;
      }
    }
    setValues({
      ...values,
      [e.target.name]: e.target.value.trim(),
    });
  };

  // 영업시간 업데이트
  const handleBusinessHour = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const newBus = updateHour({ e, values });

    setValues({
      ...values,
      businessHour: newBus,
    });
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>
  ) => {
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 필드에 방문했다고 표시한다
    setTouched(
      Object.keys(values).reduce(
        (new_touched: { [key: string]: boolean }, field) => {
          new_touched[field] = true;
          return new_touched;
        },
        {}
      )
    );

    const new_errors = validate(values);
    setErrors(new_errors);
    if (Object.values(errors).some((v) => v)) {
      return;
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

  // 전화번호 자동 하이픈 생성
  useEffect(() => {
    if (!values.phoneNumber) return;
    if (typeof values.phoneNumber === "string") {
      const pNumber = values.phoneNumber;
      if (pNumber.length === 11) {
        setValues((prev) => {
          return {
            ...prev,
            phoneNumber: pNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          };
        });
      } else if (pNumber.length === 13) {
        setValues((prev) => {
          return {
            ...prev,
            phoneNumber: pNumber
              //하이픈이 입력되면 공백으로 변경되고 하이픈이 다시 생성됨
              .replace(/-/g, "")
              .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          };
        });
      }
    }
  }, [values.phoneNumber]);

  useEffect(() => {
    setValues({
      ...values,
      hobbyMajorCategory: "",
    });
  }, [values.hobbyMainCategory]);

  // 필드 속성으로 사용할 값을 조회한다
  const getFieldProps = (name: string) => {
    // password값이 DOM에 보여서...제외, HTMLInput에서 File이 values로 존재할 수 없어서 제외
    const value = values[name];

    const maxLength = formMaxLength[name];
    const placeholder = formPlaceHolder[name];

    const onBlur = handleBlur;
    const onChange = handleChange;
    if (name === "passwordcheck" || name ===  "brcImage" ||name ===  "storeBrcImages" ||name ===  "password") {
      return {
        name,
        maxLength,
        placeholder,
        onBlur,
        onChange,
      };
    } else {
      return {
        name,
        value,
        maxLength,
        placeholder,
        onBlur,
        onChange,
      };
    }
  };

  // 훅을 사용하는 쪽에 제공하는 api다
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBusinessHour,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
}

export default useForm;
